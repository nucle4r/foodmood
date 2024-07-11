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
  ScrollView,
} from "react-native";
import { Video } from "expo-av";
import Carousel from "react-native-reanimated-carousel";
import { useRecoilValue, useRecoilState } from "recoil";
import { userDataAtom } from "../global/state";
import { userLikesState } from "../global/state";
import recipeServices from "../services/recipeServices";
import likeServices from "../services/likeServices";
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
} from "@gluestack-ui/themed";
import * as SecureStore from "expo-secure-store";

const screenWidth = Dimensions.get("window").width;

const ViewRecipeScreen = ({ route }) => {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likedRecipes, setLikedRecipes] = useRecoilState(userLikesState);
  const [mute, setMute] = useState(true);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRecipeAndUser = async () => {
      try {
        const fetchedRecipe = await recipeServices.getRecipeById(recipeId);
        const fetchedUser = await userServices.getUserById(
          fetchedRecipe.userId
        );
        setRecipe(fetchedRecipe);
        setUser(fetchedUser);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeAndUser();
  }, [recipeId]);

  const handleToggleLike = async () => {
    const token = await SecureStore.getItemAsync("userToken");
    const isCurrentlyLiked = likedRecipes.includes(recipeId); // Check if currently liked

    // Optimistically update the UI first
    setLikedRecipes((prevLikedRecipes) => {
      return isCurrentlyLiked
        ? prevLikedRecipes.filter((id) => id !== recipeId) // Remove like if it was liked
        : [...prevLikedRecipes, recipeId]; // Add like if it wasn't liked
    });

    setRecipe((prev) => ({
      ...prev,
      likesCount: isCurrentlyLiked ? prev.likesCount - 1 : prev.likesCount + 1,
    }));

    try {
      // Perform the toggle like API call
      const data = await likeServices.toggleLike(recipeId, token, "Recipe");
      // Update with actual data from the server
      setRecipe((prev) => ({ ...prev, likesCount: data.likesCount }));
    } catch (error) {
      console.error("Error toggling like:", error);

      // If error, revert the optimistic update to maintain data integrity
      setLikedRecipes((prevLikedRecipes) => {
        return isCurrentlyLiked
          ? [...prevLikedRecipes, recipeId] // Re-add like if it was previously liked
          : prevLikedRecipes.filter((id) => id !== recipeId); // Remove like if it was added optimistically
      });

      setRecipe((prev) => ({
        ...prev,
        likesCount: isCurrentlyLiked
          ? prev.likesCount + 1
          : prev.likesCount - 1,
      }));
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
        <Text>Unable to fetch recipe right now! Try again later!</Text>
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
      {recipe.mediaUrls.map((_, index) => (
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
      <FlatList
        data={recipe.ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text style={{ flex: 1 }}>{`${item.qty} ${
              item.unit === "none" ? "" : item.unit
            } of ${item.name}`}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <React.Fragment>
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
                  <Text style={styles.userName}>{user?.username}</Text>
                </HStack>
              </TouchableOpacity>
              <Divider />

              <Text style={styles.title}>{recipe.title}</Text>
              <HStack
                justifyContent="space-between"
                paddingHorizontal={20}
                paddingVertical={10}
              >
                <Text>
                  <Text style={{ fontWeight: "bold" }}>CookTime: </Text>{" "}
                  {recipe.cookTime} minutes
                </Text>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Serves: </Text>{" "}
                  {recipe.servings} people
                </Text>
              </HStack>
              <Divider />
              <Carousel
                width={screenWidth}
                height={300}
                data={recipe.mediaUrls}
                renderItem={renderMedia}
                onSnapToItem={(index) => setActiveIndex(index)}
                loop={false}
              />
              {renderPagination()}
              <VStack space="$4">
                <HStack padding="$4" space="lg" justifyContent="flex-start">
                  <VStack alignItems="center">
                    <TouchableOpacity onPress={handleToggleLike}>
                      {likedRecipes.includes(recipeId) ? (
                        <MaterialCommunityIcons
                          name="heart"
                          size={26}
                          color="red"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="heart-outline"
                          size={26}
                          color="black"
                        />
                      )}
                    </TouchableOpacity>
                    <Text style={styles.likes}>{recipe.likesCount} Likes</Text>
                  </VStack>
                  <VStack alignItems="center">
                    <TouchableOpacity onPress={() => console.log("Comment")}>
                      <Icon as={MessageCircle} size="26" color="black" />
                    </TouchableOpacity>
                    <Text style={styles.likes}>
                      {recipe.commentsCount} Comments
                    </Text>
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
                  {recipe.description}
                </Text>

                <Text style={styles.ingredients}>Ingredients:</Text>
              </VStack>
            </View>
          </React.Fragment>
        )}
        ListFooterComponent={() => (
          <View style={styles.container}>
            <VStack>
              <Text style={styles.ingredients}>Cooking Instructions:</Text>
              <Text style={styles.description}>{recipe.instructions}</Text>
              <Text style={styles.timestamp}>
                {new Date(recipe.createdAt).toLocaleDateString()}
              </Text>
              <Divider />
            </VStack>
          </View>
        )}
      />
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
  title: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    padding: 10,
  },
  ingredients: {
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  error: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 4,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  timestamp: {
    color: "gray",
    padding: 10,
    fontSize: 12,
  },
});

export default ViewRecipeScreen;
