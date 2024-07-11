import React, { useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import {
  VStack,
  Text,
  Button,
  ButtonText,
  Input,
  InputField,
  Center,
  HStack,
  Icon,
  ScrollView,
} from "@gluestack-ui/themed";
import * as ImagePicker from "expo-image-picker";
import { useRecoilState } from "recoil";
import { userDataAtom } from "../global/state";
import defaultAvatar from "../assets/avatar.jpg";
import assetsServices from "../services/assetsServices";
import { userServices }  from "../services/userServices";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "@gluestack-ui/themed";
import { ArrowLeft } from "lucide-react-native";

export default function EditProfileScreen() {
  const [user, setUser] = useRecoilState(userDataAtom);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [assetPP, setAssetPP] = useState("");

  const navigation = useNavigation();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: "photo",
      allowsEditing: true,
      height: 100,
      width: 100,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setProfilePicture(result.assets[0].uri);
      setAssetPP(result.assets);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setError("");

    try {
      let imageUrl = profilePicture;
      if (profilePicture && profilePicture.startsWith("file")) {
        const uploadResult = await assetsServices.uploadAssets(assetPP);
        imageUrl = uploadResult[0];
      }

      const updatedUser = {
        ...user,
        name,
        username,
        bio,
        location,
        profilePicture: imageUrl,
      };

      // Assume you have a method in userServices to update the user profile
      const result = await userServices.updateUser(user._id, updatedUser);
      setUser(result);
      setLoading(false);
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.toString());
      setLoading(false);
    }
  };
  return (
    <ScrollView>
      <VStack mt="$6">
        <Center>
          <VStack space="4xl" alignItems="center">
            {error ? <Text color="red">{error}</Text> : null}

            <TouchableOpacity onPress={pickImage}>
              <Center>
                <Image
                  source={
                    profilePicture ? { uri: profilePicture } : defaultAvatar
                  }
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <Text size="sm">Edit Profile Picture</Text>
              </Center>
            </TouchableOpacity>
            <Input variant="underlined" size="md" style={{ width: 300 }}>
              <InputField
                placeholder="name"
                onChangeText={setName}
                value={name}
              />
            </Input>
            <Input variant="underlined" size="md" style={{ width: 300 }}>
              <InputField
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
              />
            </Input>

            <Input variant="underlined" size="md" style={{ width: 300 }}>
              <InputField placeholder="Bio" onChangeText={setBio} value={bio} />
            </Input>

            <Input variant="underlined" size="md" style={{ width: 300 }}>
              <InputField
                placeholder="Location"
                onChangeText={setLocation}
                value={location}
              />
            </Input>

            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Button
                size="md"
                variant="solid"
                action="positive"
                onPress={handleSaveProfile}
                style={{ width: 150 }}
              >
                <ButtonText>Save Profile</ButtonText>
              </Button>
            )}
          </VStack>
        </Center>
      </VStack>
    </ScrollView>
  );
}
