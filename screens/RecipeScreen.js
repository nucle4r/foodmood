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
  Icon,
  Text,
  Input,
  InputField,
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
import { useRoute } from "@react-navigation/native";
import {
  ChevronRight,
  X,
  MapPin,
  Tag,
  ShoppingBasket,
  BookOpenText,
  Timer,
  Users2,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import recipeServices from "../services/recipeServices";
import assetsServices from "../services/assetsServices";
import * as SecureStore from "expo-secure-store";
import { ingredientsState, instructionsState } from "../global/state";

export default function RecipeScreen() {
  const route = useRoute();
  const assets = route.params?.assets || [];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useRecoilState(ingredientsState);
  const [instructions, setInstructions] = useRecoilState(instructionsState);
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [tags, setTags] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTagModal, setShowTagModal] = useState(false);
  const [showCookTimeModal, setShowCookTimeModal] = useState(false);
  const [showServingsModal, setShowServingsModal] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const ref = React.useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const userToken = await SecureStore.getItemAsync("userToken");

    if (!title) {
      setLoading(false);
      setError("Title is required.");
      setShowAlertDialog(true);
      return;
    }
    if (!ingredients[0]) {
      setLoading(false);
      setError("Ingredients are required.");
      setShowAlertDialog(true);
      return;
    }
    if (!instructions.trim()) {
      setLoading(false);
      setError("Instructions are required.");
      setShowAlertDialog(true);
      return;
    }
    if (!cookTime.trim()) {
      setLoading(false);
      setError("Cook time is required.");
      setShowAlertDialog(true);
      return;
    }
    if (!servings.trim()) {
      setLoading(false);
      setError("Servings are required.");
      setShowAlertDialog(true);
      return;
    }

    let assetUrls = [];
    if (assets.length > 0) {
      try {
        assetUrls = await assetsServices.uploadAssets(assets);
        console.log("Upload results:", assetUrls);
      } catch (uploadErr) {
        setLoading(false);
        setError("Failed to upload assets. Error: " + uploadErr.message);
        setShowAlertDialog(true);
        return;
      }
    }

    const recipeData = {
      title,
      description,
      ingredients: ingredients,
      instructions,
      cookTime: parseInt(cookTime),
      servings: parseInt(servings),
      mediaUrls: assetUrls,
    };

    try {
      const createdRecipe = await recipeServices.createRecipe(
        recipeData,
        userToken
      );
      setLoading(false);
      alert("Recipe created successfully!");
      navigation.goBack();
    } catch (recipeErr) {
      setLoading(false);
      setError("Failed to create recipe. Error: " + recipeErr);
      setShowAlertDialog(true);
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
          <Input
            variant="underlined"
            size="lg"
            style={{ marginHorizontal: 20 }}
          >
            <InputField
              placeholder="Enter Title here..."
              value={title}
              onChangeText={setTitle}
            />
          </Input>
          <View
            style={{
              borderBottomColor: "#222222",
              borderBottomWidth: 0.5,
            }}
          >
            <TextInput
              editable
              multiline
              placeholder="Write a short description of your recipe here..."
              numberOfLines={3}
              maxLength={2200}
              value={description}
              onChangeText={setDescription}
              style={{ padding: 20 }}
            />
          </View>
          <VStack>
            <Pressable onPress={() => navigation.navigate("AddIngredients")}>
              <View style={styles.addBtns}>
                <Icon as={ShoppingBasket} size="xl" marginHorizontal="$4" />
                <Text fontWeight="$medium">Add Ingredients*</Text>
                <Text
                  fontWeight="$bold"
                  color="$primary400"
                  marginHorizontal="$4"
                >
                  {ingredients[0]
                    ? `${ingredients[0].name.slice(0, 10)}...`
                    : null}
                </Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Icon as={ChevronRight} size="xl" marginHorizontal="$4" />
                </View>
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("AddInstructions")}>
              <View style={styles.addBtns}>
                <Icon as={BookOpenText} size="xl" marginHorizontal="$4" />
                <Text fontWeight="$medium">Add Instructions*</Text>
                <Text
                  fontWeight="$bold"
                  color="$primary400"
                  marginHorizontal="$4"
                >
                  {instructions
                    ? `${instructions.slice(0, 10)} ...`
                    : instructions}
                </Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Icon as={ChevronRight} size="xl" marginHorizontal="$4" />
                </View>
              </View>
            </Pressable>
            <Pressable onPress={() => setShowCookTimeModal(true)} ref={ref}>
              <View style={styles.addBtns}>
                <Icon as={Timer} size="xl" marginHorizontal="$4" />
                <Text fontWeight="$medium">Add Cook Time*</Text>
                <Text
                  fontWeight="$bold"
                  color="$primary400"
                  marginHorizontal="$6"
                >
                  {cookTime ? `${cookTime} minutes...` : null}
                </Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Icon as={ChevronRight} size="xl" marginHorizontal="$4" />
                </View>
              </View>
            </Pressable>
            <Pressable onPress={() => setShowServingsModal(true)} ref={ref}>
              <View style={styles.addBtns}>
                <Icon as={Users2} size="xl" marginHorizontal="$4" />
                <Text fontWeight="$medium">Add Servings*</Text>
                <Text
                  fontWeight="$bold"
                  color="$primary400"
                  marginHorizontal="$6"
                >
                  {servings ? `${servings} People...` : null}
                </Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Icon as={ChevronRight} size="xl" marginHorizontal="$4" />
                </View>
              </View>
            </Pressable>
            <Pressable onPress={() => setShowTagModal(true)} ref={ref}>
              <View style={styles.addBtns}>
                <Icon as={Tag} size="xl" marginHorizontal="$4" />
                <Text fontWeight="$medium">Add Tags</Text>
                <Text
                  fontWeight="$light"
                  color="$primary400"
                  marginHorizontal="$4"
                >
                  {tags.length > 20 ? `${tags.slice(0, 20)} ...` : tags}
                </Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Icon as={ChevronRight} size="xl" marginHorizontal="$4" />
                </View>
              </View>
            </Pressable>
          </VStack>
          <Modal
            isOpen={showTagModal}
            onClose={() => {
              setTags("");
              setShowTagModal(false);
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
                    setShowTagModal(false);
                  }}
                >
                  <ButtonText>Cancel</ButtonText>
                </Button>
                <Button
                  size="sm"
                  action="positive"
                  borderWidth="$0"
                  onPress={() => {
                    setShowTagModal(false);
                  }}
                >
                  <ButtonText>Save</ButtonText>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal
            isOpen={showCookTimeModal}
            onClose={() => {
              setCookTime("");
              setShowCookTimeModal(false);
            }}
            finalFocusRef={ref}
          >
            <ModalBackdrop />
            <ModalContent>
              <ModalHeader>
                <Heading size="lg">Add CookTime</Heading>
                <ModalCloseButton>
                  <Icon as={X} size="lg" />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <Text>
                  Write number of minutes it takes to cook this recipe...
                </Text>
                <Input
                  variant="outline"
                  size="md"
                  style={{ flex: 1, marginVertical: 10 }}
                >
                  <InputField
                    placeholder="Time in Minutes"
                    value={cookTime}
                    onChangeText={setCookTime}
                    keyboardType="numeric"
                  />
                </Input>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="outline"
                  size="sm"
                  action="secondary"
                  mr="$3"
                  onPress={() => {
                    setCookTime("");
                    setShowCookTimeModal(false);
                  }}
                >
                  <ButtonText>Cancel</ButtonText>
                </Button>
                <Button
                  size="sm"
                  action="positive"
                  borderWidth="$0"
                  onPress={() => {
                    setShowCookTimeModal(false);
                  }}
                >
                  <ButtonText>Save</ButtonText>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal
            isOpen={showServingsModal}
            onClose={() => {
              setServings("");
              setShowServingsModal(false);
            }}
            finalFocusRef={ref}
          >
            <ModalBackdrop />
            <ModalContent>
              <ModalHeader>
                <Heading size="lg">Add Servings</Heading>
                <ModalCloseButton>
                  <Icon as={X} size="lg" />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <Text>
                  Write the number this recipe could serve, based on ingredients
                  used...
                </Text>
                <Input
                  variant="outline"
                  size="md"
                  style={{ flex: 1, marginVertical: 10 }}
                >
                  <InputField
                    placeholder="Number of People"
                    value={servings}
                    onChangeText={setServings}
                    keyboardType="numeric"
                  />
                </Input>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="outline"
                  size="sm"
                  action="secondary"
                  mr="$3"
                  onPress={() => {
                    setServings("");
                    setShowServingsModal(false);
                  }}
                >
                  <ButtonText>Cancel</ButtonText>
                </Button>
                <Button
                  size="sm"
                  action="positive"
                  borderWidth="$0"
                  onPress={() => {
                    setShowServingsModal(false);
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
                  navigation.navigate("AddLocation", {
                    onLocationSelect: handleLocationSelect,
                  });
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
    height: 200,
  },
  media: {
    width: 200,
    height: 200,
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
    height: 5,
    width: 5,
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
    backgroundColor: "#007bff", // Example color
  },
});
