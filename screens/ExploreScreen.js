import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import {
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Pressable,
  Spinner
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import { userDataAtom, userExploreState } from "../global/state";
import postServices from "../services/postServices";
import recipeServices from "../services/recipeServices";
import feedServices from "../services/feedServices";
import { SearchIcon } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [exploreState, setExploreState] = useRecoilState(userExploreState);
  const [posts, setPosts] = useState([]);
  const [isFetchingExplore, setIsFetchingExplore] = useState(true);

  useEffect(() => {
    const initializeAll = async () => {
      try {
        await initializeExplore(userData._id);
      } catch (error) {
        console.error("Error Fetching Explore:", error);
      } finally {
        setIsFetchingExplore(false);
      }
    };

    initializeAll();
  }, [userData._id]); // Correct dependency

  const initializeExplore = async (userId) => {
    try {
      const content = await feedServices.fetchUserExplore(userId);
      if (content) {
        setExploreState(content);
        await fetchContent(content.explore); // Pass explore directly
      } else {
        setExploreState({ explore: ["none"] }); // Ensure structure
      }
    } catch (error) {
      console.error("Failed to fetch user feeds:", error);
    }
  };

  const fetchContent = async (exploreArray) => {
    if (!exploreArray || exploreArray.length === 0) return; // Check for valid array
    const content = await Promise.all(
      exploreArray.map(async (obj) => {
        let post;
        if (obj.type === "post") {
          post = await postServices.getPostById(obj.id);
        } else {
          post = await recipeServices.getRecipeById(obj.id);
        }
        return { post, type: obj.type };
      })
    );
    setPosts(content);
  };
  const transformImageUrl = (url) => {
    const parts = url.split("/upload/");
    return `${parts[0]}/upload/f_jpg,c_thumb,h_200,w_200/${parts[1]}`;
  };

  const handlePress = (id, type) => {
    if (type === "post") {
      let postId = id;
      navigation.navigate("ViewPost", { postId });
    } else {
      let recipeId = id;
      navigation.navigate("ViewRecipe", { recipeId });
    }
  };

  const renderPost = ({ item }) => (
    <Pressable
      style={styles.pressable}
      onPress={() => handlePress(item.post._id, item.type)} // Use handlePress to navigate
    >
      {item.post.mediaUrls && item.post.mediaUrls.length > 0 && (
        <Image
          source={{ uri: transformImageUrl(item.post.mediaUrls[0]) }}
          style={styles.image}
        />
      )}
    </Pressable>
  );
  return (
    <SafeAreaView>
      <View style={styles.container}></View>
      <Pressable onPress={() => navigation.navigate("SearchScreen")}>
        <HStack h="$16" alignItems="center">
          <View style={{ width: "100%", alignItems: "center" }}>
            <Input variant="rounded" size="md" w="95%" isReadOnly={true}>
              <InputField
                placeholder="Orders • Recipes • Restaurants"
                onPressIn={() => navigation.navigate("SearchScreen")}
              />
              <InputSlot
                bg="$primary500"
                borderRadius="$full"
                h="$6"
                w="$6"
                m="$1.5"
              >
                <InputIcon as={SearchIcon} color="white" size="sm" />
              </InputSlot>
            </Input>
          </View>
        </HStack>
      </Pressable>

      {isFetchingExplore ? (
        <View style={styles.loadingContainer}>
          <Spinner size="large" />
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.post._id}
          numColumns={3}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pressable: {
    flex: 1 / 3,
    aspectRatio: 1,
    padding: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
