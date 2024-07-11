import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { Video } from "expo-av";
import {
  Button,
  VStack,
  Card,
  Text,
  Icon,
  ButtonText,
  Pressable,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Heading,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogBackdrop,
} from "@gluestack-ui/themed";
import { useRecoilState } from "recoil";
import { locationState, userDataAtom } from "../global/state";
import { useRoute } from "@react-navigation/native";
import { ChevronRight, Cross, MapPin, Tag, X } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import postServices from "../services/postServices";
import assetsServices from "../services/assetsServices";
import * as SecureStore from "expo-secure-store";

export default function ExperienceScreen() {
  const route = useRoute();
  const assets = route.params?.assets || [];
  const [location, setLocation] = useRecoilState(locationState);
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const ref = React.useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const validateContent = async () => {
    try {
      const response = await postServices.checkProfanity(
        `${description} ${tags}`
      );
      if (response.isProfane) {
        setLoading(false);
        setError(`You cannot use these words: ${response.profaneWords}`);
        setShowAlertDialog(true);
        return false;
      }
      return true;
    } catch (err) {
      setError(err.toString());
      setShowAlertDialog(true);
      return false;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const userToken = await SecureStore.getItemAsync("userToken");

    if (description.split(" ").length < 15) {
      setLoading(false);
      setError("Description must be at least 15 words.");
      setShowAlertDialog(true);
    } else if (!location.description) {
      setLoading(false);
      setError("Location is required.");
      setShowAlertDialog(true);
    } else {
      const isValid = await validateContent();
      if (isValid) {
        let assetUrls = [];
        try {
          assetUrls = await assetsServices.uploadAssets(assets);
          console.log("Upload results:", assetUrls);
        } catch (uploadErr) {
          setLoading(false);
          setError("Failed to upload assets. Error: " + uploadErr.message);
          setShowAlertDialog(true);
          return;
        }

        const postData = {
          description,
          location,
          tags,
          mediaUrls: assetUrls,
        };

        try {
          const createdPost = await postServices.createPost(
            postData,
            userToken
          );
          navigation.navigate("Profile");
          setLoading(false);
          setLocation({});
          alert("Your experience was posted successfully!");
        } catch (postErr) {
          setLoading(false);
          setError("Failed to create post. Error: " + postErr);
          setShowAlertDialog(true);
        }
      }
    }
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / styles.media.width);
    setActiveIndex(currentIndex);
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 80}
      >
        <ScrollView style={styles.container}>
          <Card p="$5" borderRadius="$lg" m="$3">
            <ScrollView
              horizontal
              pagingEnabled
              style={styles.mediaContainer}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
            >
              {assets.map((asset, index) =>
                asset.type === "image" ? (
                  <Image
                    key={index}
                    source={{ uri: asset.uri }}
                    style={styles.media}
                  />
                ) : (
                  <Video
                    key={index}
                    source={{ uri: asset.uri }}
                    style={styles.media}
                    useNativeControls
                    resizeMode="cover"
                    isLooping
                  />
                )
              )}
            </ScrollView>
            <View style={styles.dotContainer}>
              {assets.map((_, idx) => (
                <Text
                  key={idx}
                  style={[
                    styles.dot,
                    idx === activeIndex ? styles.activeDot : null,
                  ]}
                />
              ))}
            </View>
          </Card>
          <View
            style={{
              borderBottomColor: "#222222",
              borderBottomWidth: 0.5,
            }}
          >
            <TextInput
              editable
              multiline
              placeholder="Write a description of your experience here..."
              numberOfLines={5}
              maxLength={2200}
              value={description}
              onChangeText={setDescription}
              style={{ padding: 20 }}
            />
          </View>
          <VStack>
            <Pressable onPress={() => navigation.navigate("AddLocation")}>
              <View style={styles.addBtns}>
                <Icon as={MapPin} size="xl" marginHorizontal="$4" />
                <Text fontWeight="$medium">Add Location</Text>
                <Text fontWeight="$light" marginHorizontal="$4">
                  {location.description.length > 20
                    ? `${location.description.slice(0, 20)} ...`
                    : location.description}
                </Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Icon as={ChevronRight} size="xl" marginHorizontal="$4" />
                </View>
              </View>
            </Pressable>
            <Pressable onPress={() => setShowModal(true)} ref={ref}>
              <View style={styles.addBtns}>
                <Icon as={Tag} size="xl" marginHorizontal="$4" />
                <Text fontWeight="$medium">Add Tags</Text>
                <Text fontWeight="$light" marginHorizontal="$4">
                  {tags.length > 20 ? `${tags.slice(0, 20)} ...` : tags}
                </Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Icon as={ChevronRight} size="xl" marginHorizontal="$4" />
                </View>
              </View>
            </Pressable>
          </VStack>
          <Modal
            isOpen={showModal}
            onClose={() => {
              setTags("");
              setShowModal(false);
            }}
            finalFocusRef={ref}
          >
            <ModalBackdrop />
            <ModalContent>
              <ModalHeader>
                <Heading size="lg">Add Tags</Heading>
                <ModalCloseButton>
                  <Icon as={X} size="lg" />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <Text>eg. biryani, naan, paneer</Text>
                <TextInput
                  editable
                  multiline
                  placeholder="Write tags seperated with commas..."
                  numberOfLines={5}
                  maxLength={2200}
                  value={tags}
                  onChangeText={setTags}
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    marginVertical: 10,
                    borderRadius: 10,
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="outline"
                  size="sm"
                  action="secondary"
                  mr="$3"
                  onPress={() => {
                    setTags("");
                    setShowModal(false);
                  }}
                >
                  <ButtonText>Cancel</ButtonText>
                </Button>
                <Button
                  size="sm"
                  action="positive"
                  borderWidth="$0"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  <ButtonText>Save</ButtonText>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </ScrollView>

        {!isKeyboardVisible && (
          <View style={styles.submitButtonContainer}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Button onPress={handleSubmit} style={styles.submitButton}>
                <ButtonText>Share</ButtonText>
              </Button>
            )}
          </View>
        )}
      </KeyboardAvoidingView>
      <AlertDialog
        isOpen={showAlertDialog}
        leastDestructiveRef={ref}
        onClose={() => setShowAlertDialog(false)}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">Error</Heading>
            <AlertDialogCloseButton onPress={() => setShowAlertDialog(false)}>
              <Icon as={X} size="lg" />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>{error}</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            {error === "Location is required." ? (
              <Button
                onPress={() => {
                  navigation.navigate("AddLocation");
                  setShowAlertDialog(false);
                }}
              >
                <ButtonText>Add Location</ButtonText>
              </Button>
            ) : (
              <Button onPress={() => setShowAlertDialog(false)}>
                <ButtonText>Close</ButtonText>
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginBottom: 80,
  },
  mediaContainer: {
    height: 300,
  },
  media: {
    width: 300,
    height: 300,
    resizeMode: "cover",
    marginHorizontal: 5,
    borderRadius: 15,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#007bff",
  },
  addBtns: {
    display: "flex",
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#222222",
    borderBottomWidth: 0.5,
  },
  submitButtonContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  submitButton: {
    backgroundColor: "#007bff",
  },
});
