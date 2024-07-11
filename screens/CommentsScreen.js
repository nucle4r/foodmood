import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetBackdrop,
  Button,
  ButtonText,
  HStack,
  Input,
  InputField,
  VStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Divider,
  Spinner
} from "@gluestack-ui/themed";
import commentServices from "../services/commentServices";
import userServices from "../services/userServices";
import * as SecureStore from "expo-secure-store";

const screenHeight = Dimensions.get("window").height;

const CommentsScreen = ({ route, navigation }) => {
  const { itemId, onModel } = route.params;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const token = await SecureStore.getItemAsync("userToken");
        const fetchedComments = await commentServices.getComments(
          itemId,
          token
        );
        const commentsWithUser = await Promise.all(
          fetchedComments.map(async (comment) => {
            const user = await userServices.getUserById(comment.createdBy._id);
            return { ...comment, user };
          })
        );
        setComments(commentsWithUser);
      } catch (err) {
        setError("Failed to load comments.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [itemId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync("userToken");
      const addedComment = await commentServices.addComment(
        itemId,
        onModel,
        newComment,
        token
      );
      const user = await userServices.getUserById(addedComment.createdBy);
      setComments((prev) => [...prev, { ...addedComment, user }]);
      setNewComment("");
    } catch (err) {
      setError("Failed to add comment.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Actionsheet isOpen={true} onClose={() => navigation.goBack()}>
        <ActionsheetBackdrop />
        <ActionsheetContent style={{ minHeight: screenHeight * 0.75 }}>
          {loading ? (
            <View>
              <Text style={{ padding: 20 }}>Loading...</Text>
              <Spinner size="large" />
            </View>
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            <FlatList
              data={comments}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => (
                <VStack flex={1} width="100%">
                  <HStack
                    flex={1}
                    width="100%"
                    space="sm"
                    alignItems="center"
                    justifyContent="flex-start"
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
                </VStack>
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

export default CommentsScreen;
