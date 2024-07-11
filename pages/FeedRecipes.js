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
import recipeServices from "../services/recipeServices";
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

const screenWidth = Dimensions.get("window").width;

const FeedRecipes = () => {
  const { top_recipe_ids } = useRecoilValue(userFeedState);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndices, setActiveIndices] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRecipesAndUsers = async () => {
      const recipesWithDetails = await Promise.all(
        top_recipe_ids.map(async (id) => {
          const recipe = await recipeServices.getRecipeById(id);
          const user = await userServices.getUserById(recipe.userId);
          return { ...recipe, user };
        })
      );
      setRecipes(recipesWithDetails);
      setLoading(false);

      // Initialize active indices
      setActiveIndices(
        recipesWithDetails.reduce(
          (acc, recipe, index) => ({
            ...acc,
            [recipe._id]: 0, // Initialize each recipe's carousel index to 0
          }),
          {}
        )
      );
    };

    fetchRecipesAndUsers();
  }, [top_recipe_ids]);
  const handleSnapToItem = (index, recipeId) => {
    setActiveIndices((prev) => ({ ...prev, [recipeId]: index }));
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
  const handleNav = (recipeId) => {
    navigation.navigate("ViewRecipe", { recipeId });
  };

  const handleProfileVisit = (id) => {
    navigation.navigate("VisitProfileScreen", { id });
  };

  const renderPagination = (recipeId) => (
    <View style={styles.paginationContainer}>
      {recipes
        .find((p) => p._id === recipeId)
        .mediaUrls.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeIndices[recipeId] === index
                ? styles.paginationActiveDot
                : null,
            ]}
          />
        ))}
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ paddingBottom: 380 }}
      renderItem={({ item }) => (
        <View style={styles.recipeContainer}>
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
                View Full Recipe
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
  recipeContainer: {
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

export default FeedRecipes;
