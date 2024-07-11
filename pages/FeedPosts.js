import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av";
import Carousel from "react-native-reanimated-carousel";
import { useRecoilValue } from "recoil";
import { userFeedState } from "../global/state";
import postServices from "../services/postServices";
import userServices from "../services/userServices";
import {
  Avatar,
  AvatarImage,
  AvatarFallbackText,
  HStack,
  VStack,
  Divider,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import Loading from "../assets/loading.mp4"

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const FeedPosts = () => {
  const { top_post_ids } = useRecoilValue(userFeedState);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndices, setActiveIndices] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      const postsWithDetails = await Promise.all(
        top_post_ids.map(async (id) => {
          const post = await postServices.getPostById(id);
          const user = await userServices.getUserById(post.userId);
          return { ...post, user };
        })
      );
      setPosts(postsWithDetails);
      setLoading(false);

      // Initialize active indices
      setActiveIndices(
        postsWithDetails.reduce(
          (acc, post, index) => ({
            ...acc,
            [post._id]: 0, // Initialize each post's carousel index to 0
          }),
          {}
        )
      );
    };

    fetchPostsAndUsers();
  }, [top_post_ids]);
  const handleSnapToItem = (index, postId) => {
    setActiveIndices((prev) => ({ ...prev, [postId]: index }));
  };

  const handleNav = (postId) => {
    navigation.navigate("ViewPost", { postId });
  };

  const handleProfileVisit = (id) => {
    navigation.navigate("VisitProfileScreen", { id });
  };

  const renderMedia = ({ item }) =>
    item.type === "video" ? (
      <Video
        source={{ uri: item }}
        style={styles.media}
        resizeMode="cover"
        shouldPlay
        isLooping
      />
    ) : (
      <Image source={{ uri: item }} style={styles.media} />
    );

  const renderPagination = (postId) => (
    <View style={styles.paginationContainer}>
      {posts
        .find((p) => p._id === postId)
        .mediaUrls.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeIndices[postId] === index
                ? styles.paginationActiveDot
                : null,
            ]}
          />
        ))}
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <Video
          source={Loading}
          style={styles.loading}
          resizeMode="cover"
          shouldPlay
          isLooping
        />
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ paddingBottom: 380 }}
      renderItem={({ item }) => (
        <View style={styles.postContainer}>
          <TouchableOpacity onPress={() => handleProfileVisit(item.user?._id)}>
          <HStack alignItems="center" space="md" padding="$2">
            <Avatar bgColor="$amber600" size="sm" borderRadius="$full">
              <AvatarFallbackText>{item.user?.name}</AvatarFallbackText>
              <AvatarImage
                source={item.user?.profilePicture}
                alt="Profile Picture"
                borderRadius="$full"
              />
            </Avatar>
            <Text style={styles.userName}>{item.user?.username}</Text>
          </HStack>
          </TouchableOpacity>
          <Divider />
          <Carousel
            width={screenWidth}
            height={300}
            data={item.mediaUrls}
            renderItem={renderMedia}
            onSnapToItem={(index) => handleSnapToItem(index, item._id)}
            loop={false}
          />
          {renderPagination(item._id)}
          <Text style={styles.description}>{item.description}</Text>
          <Divider />
          <Pressable onPress={() => handleNav(item._id)}>
            <HStack
              sx={{
                padding: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: 800, color: "#007bff" }}>
                View Full Post
              </Text>
            </HStack>
          </Pressable>
          <Divider />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  media: {
    width: screenWidth,
    height: 300,
    resizeMode: "cover",
  },
  loading:{
    width: screenWidth,
    height: screenHeight,
    resizeMode: "cover",
  },
  postContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    padding: 10,
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
});

export default FeedPosts;
