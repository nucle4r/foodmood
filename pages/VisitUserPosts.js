import React, { useEffect, useState } from "react";
import { View, FlatList, Image, StyleSheet, Pressable } from "react-native";
import { useRecoilValue } from "recoil";
import { visitUserDataAtom } from "../global/state";
import postServices from "../services/postServices";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const VisitUserPosts = () => {
  const [posts, setPosts] = useState([]);
  const visitUserData = useRecoilValue(visitUserDataAtom);
  const navigation = useNavigation(); // Hook for navigation

  useEffect(() => {
    if (visitUserData._id) {
      postServices.getPostsByUserId(visitUserData._id)
        .then(setPosts)
        .catch(err => console.error("Error fetching posts:", err));
    }
  }, [visitUserData._id]);

  const transformImageUrl = (url) => {
    const parts = url.split('/upload/');
    return `${parts[0]}/upload/f_jpg,c_thumb,h_200,w_200/${parts[1]}`;
  };

  const handlePress = (postId) => {
    navigation.navigate('ViewPost', { postId }); // Navigate to ViewPost screen with postId
  };

  const renderPost = ({ item }) => (
    <Pressable
      style={styles.pressable}
      onPress={() => handlePress(item._id)} // Use handlePress to navigate
    >
      {item.mediaUrls && item.mediaUrls.length > 0 && (
        <Image source={{ uri: transformImageUrl(item.mediaUrls[0]) }} style={styles.image} />
      )}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default VisitUserPosts;
