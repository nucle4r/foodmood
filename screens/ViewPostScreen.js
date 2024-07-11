import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import { Video } from "expo-av";
import Carousel from "react-native-reanimated-carousel";
import { useRecoilValue, useRecoilState } from "recoil";
import { userDataAtom } from "../global/state";
import { userLikesState } from "../global/state";
import postServices from "../services/postServices";
import likeServices from "../services/likeServices";
import commentServices from "../services/commentServices";
import userServices from "../services/userServices";
import { Heart, MessageCircle, Share } from "lucide-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Icon,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  VStack,
  HStack,
  Divider,
  Spinner,
  Actionsheet,
  ActionsheetContent,
  ActionsheetBackdrop,
  Button,
  ButtonText,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import * as SecureStore from "expo-secure-store";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ViewPostScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useRecoilState(userLikesState);
  const [mute, setMute] = useState(true);
  const [error, setError] = useState("");
  const [commentsError, setCommentsError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchPostAndUser = async () => {
      try {
        const fetchedPost = await postServices.getPostById(postId);
        const fetchedUser = await userServices.getUserById(fetchedPost.userId);
        setPost(fetchedPost);
        setUser(fetchedUser);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndUser();
  }, [postId]);

  const handleToggleLike = async () => {
    const token = await SecureStore.getItemAsync("userToken");
    const isCurrentlyLiked = likedPosts.includes(postId); // Check if currently liked

    // Optimistically update the UI first
    setLikedPosts((prevLikedPosts) => {
      return isCurrentlyLiked
        ? prevLikedPosts.filter((id) => id !== postId) // Remove like if it was liked
        : [...prevLikedPosts, postId]; // Add like if it wasn't liked
    });

    setPost((prev) => ({
      ...prev,
      likesCount: isCurrentlyLiked ? prev.likesCount - 1 : prev.likesCount + 1,
    }));

    try {
      // Perform the toggle like API call
      const data = await likeServices.toggleLike(postId, token, "Post");
      // Update with actual data from the server
      setPost((prev) => ({ ...prev, likesCount: data.likesCount }));
    } catch (error) {
      console.error("Error toggling like:", error);

      // If error, revert the optimistic update to maintain data integrity
      setLikedPosts((prevLikedPosts) => {
        return isCurrentlyLiked
          ? [...prevLikedPosts, postId] // Re-add like if it was previously liked
          : prevLikedPosts.filter((id) => id !== postId); // Remove like if it was added optimistically
      });

      setPost((prev) => ({
        ...prev,
        likesCount: isCurrentlyLiked
          ? prev.likesCount + 1
          : prev.likesCount - 1,
      }));
    }
  };
  const fetchComments = async () => {
    setCommentsLoading(true);
    setCommentsOpen(true);
    try {
      const token = await SecureStore.getItemAsync("userToken");
      const fetchedComments = await commentServices.getComments(postId, token);
      const commentsWithUser = await Promise.all(
        fetchedComments.map(async (comment) => {
          const user = await userServices.getUserById(comment.createdBy._id);
          return { ...comment, user };
        })
      );
      setComments(commentsWithUser);
    } catch (err) {
      setCommentsError("Failed to load comments.");
      console.error(err);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setCommentsLoading(true);
    try {
      const token = await SecureStore.getItemAsync("userToken");
      const addedComment = await commentServices.addComment(
        postId,
        "Post",
        newComment,
        token
      );
      const user = await userServices.getUserById(
        addedComment.newComment.createdBy
      );
      setPost((prev) => ({
        ...prev,
        commentsCount: addedComment.commentsCount,
      }));
      setComments((prev) => [...prev, { ...addedComment.newComment, user }]);
      setNewComment("");
    } catch (err) {
      setError("Failed to add comment.");
      console.error(err);
    } finally {
      setCommentsLoading(false);
    }
  };
  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <Spinner size="large" />
      </View>
    );
  if (error)
    return (
      <View style={styles.loadingContainer}>
        <Text>Unable to fetch post right now! Try again later!</Text>
      </View>
    );
  const handleMute = () => {
    setMute(!mute);
  };

  const handleProfileVisit = (id) => {
    navigation.navigate("VisitProfileScreen", { id });
  };

  const isVideo = (url) => /\.(mp4|mov|wmv|avi|mkv|flv|webm)$/i.test(url);

  const renderMedia = ({ item }) =>
    isVideo(item) ? (
      <Pressable onPress={() => handleMute()}>
        <Video
          source={{ uri: item }}
          rate={1.0}
          volume={1.0}
          isMuted={mute}
          resizeMode="cover"
          shouldPlay={true}
          isLooping
          useNativeControls={false}
          style={styles.media}
        />
      </Pressable>
    ) : (
      <Image source={{ uri: item }} style={styles.media} />
    );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {post.mediaUrls.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            index === activeIndex ? styles.paginationActiveDot : null,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleProfileVisit(user?._id)}>
        <HStack alignItems="center" space="md" padding="$2">
          <Avatar bgColor="$amber600" size="sm" borderRadius="$full">
            <AvatarFallbackText>{user?.name}</AvatarFallbackText>
            <AvatarImage
              source={user?.profilePicture}
              alt="Profile Picture"
              borderRadius="$full"
            />
          </Avatar>
          <VStack>
            <Text style={styles.userName}>{user?.username}</Text>
            <Text style={styles.location}>
              {post?.location.description.slice(0, 15)}...
            </Text>
          </VStack>
        </HStack>
      </TouchableOpacity>
      <Divider />
      <Carousel
        width={screenWidth}
        height={300}
        data={post.mediaUrls}
        renderItem={renderMedia}
        onSnapToItem={(index) => setActiveIndex(index)}
        loop={false}
      />
      {renderPagination()}
      <VStack space="$4">
        <HStack padding="$4" space="lg" justifyContent="flex-start">
          <VStack alignItems="center">
            <TouchableOpacity onPress={handleToggleLike}>
              {likedPosts.includes(postId) ? (
                <MaterialCommunityIcons name="heart" size={26} color="red" />
              ) : (
                <MaterialCommunityIcons
                  name="heart-outline"
                  size={26}
                  color="black"
                />
              )}
            </TouchableOpacity>
            <Text style={styles.likes}>{post.likesCount} Likes</Text>
          </VStack>
          <VStack alignItems="center">
            <TouchableOpacity onPress={fetchComments}>
              <Icon as={MessageCircle} size="26" color="black" />
            </TouchableOpacity>
            <Text style={styles.likes}>{post.commentsCount} Comments</Text>
          </VStack>
          <VStack alignItems="center">
            <TouchableOpacity onPress={() => console.log("Share")}>
              <Icon as={Share} size="26" color="black" />
            </TouchableOpacity>
            <Text style={styles.likes}>Share</Text>
          </VStack>
        </HStack>

        <Divider />

        <Text style={styles.description}>
          <Text style={{ fontWeight: "bold" }}>{user?.username}: </Text>
          {post.description}
        </Text>
        <Text style={styles.btmlocation}>
          Location: {post.location.description}
        </Text>

        <Text style={styles.timestamp}>
          {new Date(post.timestamp).toLocaleDateString()}
        </Text>
      </VStack>
      <Divider />
      <Actionsheet isOpen={commentsOpen} onClose={() => setCommentsOpen(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent style={{ minHeight: screenHeight * 0.75 }}>
          {commentsLoading ? (
            <View>
              <Text style={{ padding: 20 }}>Loading Comments...</Text>
              <Spinner size="large" />
            </View>
          ) : error ? (
            <Text>{commentsError}</Text>
          ) : (
            <FlatList
              data={comments}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <HStack
                    flex={1}
                    width="100%"
                    space="sm"
                    alignItems="center"
                    justifyContent="flex-start"
                    padding={10}
                  >
                    <Avatar bgColor="$amber600" size="sm" borderRadius="$full">
                      <AvatarFallbackText>{item.user.name}</AvatarFallbackText>
                      <AvatarImage
                        source={item.user.profilePicture}
                        alt="Profile Picture"
                        borderRadius="$full"
                      />
                    </Avatar>
                    <Text>{item.user.username}: </Text>
                    <Text>{item.content}</Text>
                  </HStack>
                  <Divider />
                </View>
              )}
              ListEmptyComponent={<Text>No comments yet...</Text>}
            />
          )}
          <HStack
            space="sm"
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Input variant="rounded" size="md" style={{ width: 300 }}>
              <InputField
                placeholder="Enter comment here"
                onChangeText={setNewComment}
                value={newComment}
              />
            </Input>
            <Button variant="link" onPress={handleAddComment}>
              <ButtonText>Submit</ButtonText>
            </Button>
          </HStack>
        </ActionsheetContent>
      </Actionsheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  media: {
    width: screenWidth,
    height: 300,
    resizeMode: "cover",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
  },
  paginationActiveDot: {
    backgroundColor: "#007bff",
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  likes: {
    fontWeight: "bold",
    padding: 4,
  },
  description: {
    fontSize: 14,
    padding: 10,
  },
  error: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  location: {
    fontSize: 14,
  },
  btmlocation: {
    fontSize: 14,
    padding: 10,
    textAlign: "center",
  },
  timestamp: {
    color: "gray",
    padding: 10,
    fontSize: 12,
  },
  listItem: {
    minWidth: "100%",
    backgroundColor: "#f9f9f9",
  },
});

export default ViewPostScreen;
