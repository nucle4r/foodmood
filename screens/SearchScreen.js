import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { HStack, Icon, Pressable } from "@gluestack-ui/themed";
import { ArrowLeft, SearchIcon } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import searchService from "../services/searchService";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchService.searchItems(query);
      // Modify the results structure to include the type of each item
      const posts = data.posts.map((post) => ({ ...post, type: "Post" }));
      const recipes = data.recipes.map((recipe) => ({
        ...recipe,
        type: "Recipe",
      }));
      const users = data.users.map((user) => ({ ...user, type: "User" }));
      setResults([...posts, ...recipes, ...users]); // Combine all results into a single array
    } catch (error) {
      console.error("Search error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 2) {
        handleSearch();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const renderItem = ({ item }) => {
    let details = "";
    if (item.description) {
      details = `Description: ${item.description}\nLikes: ${item.likesCount}, Comments: ${item.commentsCount}`;
    } else if (item.username) {
      details = `Username: ${item.username}`;
    }

    // Determine the screen to navigate based on the type of item
    const navigateToDetailScreen = () => {
      if (item.type === "Post") {
        navigation.navigate("ViewPost", { postId: item._id });
      } else if (item.type === "Recipe") {
        navigation.navigate("ViewRecipe", { recipeId: item._id });
      } else if (item.type === "User") {
        navigation.navigate("VisitProfileScreen", { id: item._id });
      }
    };

    return (
      <TouchableOpacity
        onPress={navigateToDetailScreen}
        style={styles.resultItem}
      >
        <Text style={styles.itemTitle}>
          {item.name || item.username || item.title}
        </Text>
        <Text style={styles.itemDetails}>{details}</Text>
        <Text style={styles.typeLabel}>{item.type}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HStack h="$16" alignItems="center">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon as={ArrowLeft} size="xl" style={styles.iconStyle} />
        </Pressable>
        <TextInput
          style={styles.input}
          placeholder="Posts • Recipes • Users"
          autoFocus
          onChangeText={setQuery}
          value={query}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
      </HStack>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  iconStyle: {
    margin: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingLeft: 10,
  },
  listContainer: {
    padding: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDetails: {
    fontSize: 14,
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
    marginTop: 5,
  },
});
