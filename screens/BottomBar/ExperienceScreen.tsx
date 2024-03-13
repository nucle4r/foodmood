import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { Box, HStack, Icon, Text, VStack } from "@gluestack-ui/themed";
import { Compass, Soup, UtensilsCrossed } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import imgPlaceholder from "../../utils/Placeholder";


export default function ExperienceScreen() {
  const [selectedImage, setSelectedImage] = useState(imgPlaceholder)
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  console.log(status)


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };


  const imageHolder = (
      <View>
        <Pressable onPress= {() => pickImage()}>
          <Image
            style={styles.image}
            source={{
              uri: `data:image/jpg;base64,${selectedImage}`,
            }}
          />
        </Pressable>
      </View>
    );

  return (
    <SafeAreaView style={{
      backgroundColor: "#fff", flex: 1, justifyContent: "center",
      alignItems: "center"
    }}>
      <ScrollView style={{ paddingTop: 50 }}>
        {imageHolder}
      </ScrollView >
    </SafeAreaView>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerStyle: {
    backgroundColor: "transparent",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
  image: {
    marginTop: 0,
    borderColor: "white",
    borderWidth: 8,
    borderRadius: 15,
    width: 320,
    height: 320,
  }
});