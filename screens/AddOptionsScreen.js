import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import {
  Card,
  Center,
  Icon,
  Text,
  VStack,
  Heading,
} from "@gluestack-ui/themed";
import { FileText, MapPin } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export default function AddOptionsScreen() {
  const navigation = useNavigation();

  const requestPermissionsAndGetMedia = async (navigateTo) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need media library permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      navigation.navigate(navigateTo, result);
    }
  };

  return (
    <View style={styles.container}>
      <Center>
        <Pressable onPress={() => requestPermissionsAndGetMedia("Experience")}>
          <Card size="lg" variant="elevated" m="$12">
            <VStack>
              <Center>
                <Icon as={MapPin} size="lg" />
                <Heading mb="$1" size="md">
                  Add Experience
                </Heading>
              </Center>
              <Text size="sm" textAlign="center">
                Share your dining stories and the flavors that delighted your
                palate.
              </Text>
            </VStack>
          </Card>
        </Pressable>
        <Pressable onPress={() => requestPermissionsAndGetMedia("Recipe")}>
          <Card size="lg" variant="elevated" m="$12">
            <VStack>
              <Center>
                <Icon as={FileText} size="lg" />
                <Heading mb="$1" size="md">
                  Add Recipe
                </Heading>
              </Center>
              <Text size="sm" textAlign="center">
                Contribute your culinary creations and inspire fellow food
                enthusiasts.
              </Text>
            </VStack>
          </Card>
        </Pressable>
      </Center>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#fff",
  },
});
