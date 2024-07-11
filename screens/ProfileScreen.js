import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  HStack,
  VStack,
  Text,
  Button,
  ButtonIcon,
  ButtonText,
  Icon,
  Heading,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UserPosts from "../pages/UserPosts";
import UserRecipes from "../pages/UserRecipes";
import { useRecoilState } from "recoil";
import { userDataAtom } from "../global/state";
import { useNavigation } from "@react-navigation/native";
import {
  EditIcon,
  ShareIcon,
  CookingPot,
  UtensilsCrossed,
} from "lucide-react-native";


const Tab = createMaterialTopTabNavigator();

export default function ProfileScreen() {
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const navigation = useNavigation();

  const tabSelect = (
    <HStack>
      <Tab.Navigator
        initialRouteName="For You"
        screenOptions={{
          tabBarActiveTintColor: "#e91e63",
          tabBarShowLabel: false,
          tabBarLabelStyle: { fontSize: 12 },
          swipeEnabled: true,
          lazy: true,
        }}
        style={{ height: 1000 }}
      >
        <Tab.Screen
          name="User Experiences"
          component={UserPosts}
          options={{
            tabBarIcon: () => <Icon as={UtensilsCrossed} size="xl" />,
          }}
        />
        <Tab.Screen
          name="User Recipes"
          component={UserRecipes}
          options={{ tabBarIcon: () => <Icon as={CookingPot} size="xl" /> }}
        />
      </Tab.Navigator>
    </HStack>
  );

  return (
    <View style={styles.container}>
      <VStack>
        <HStack
          space="3xl"
          style={{ alignSelf: "center", alignItems: "center" }}
        >
          <Avatar bgColor="$amber600" size="lg" borderRadius="$full">
            <AvatarFallbackText>{userData.name}</AvatarFallbackText>
            <AvatarImage
              source={userData.profilePicture}
              alt="Profile Picture"
              borderRadius="$full"
            />
          </Avatar>
          <VStack style={{ alignItems: "center" }}>
            <Heading>{userData.no_of_posts}</Heading>
            <Text size="sm">Posts</Text>
          </VStack>
          <VStack style={{ alignItems: "center" }}>
            <Heading>{userData.followers_count}</Heading>
            <Text size="sm">Followers</Text>
          </VStack>
          <VStack style={{ alignItems: "center" }}>
            <Heading>{userData.following_count}</Heading>
            <Text size="sm">Following</Text>
          </VStack>
        </HStack>

        <Text size="sm" style={{ fontWeight: "bold" }}>
          {userData.name}
        </Text>
        {userData.bio && <Text size="sm">{userData.bio}</Text>}
        {userData.location && <Text size="sm">{userData.location}</Text>}
      </VStack>
      <View style={styles.buttons}>
        <HStack space="xl" reversed={false}>
          <Button
            size="xs"
            variant="solid"
            bg="#d3d3d3"
            borderRadius="$lg"
            onPress={() => navigation.navigate("EditProfile")}
          >
            <ButtonIcon as={EditIcon} size="sm" />
            <ButtonText size="sm"> Edit profile </ButtonText>
          </Button>
          <Button size="xs" variant="solid" bg="#d3d3d3" borderRadius="$lg">
            <ButtonIcon as={ShareIcon} size="sm" />
            <ButtonText size="sm"> Share profile </ButtonText>
          </Button>
          <Button
            size="xs"
            variant="solid"
            bg="#d3d3d3"
            isDisabled={false}
            isFocusVisible={false}
            borderRadius="$lg"
          >
            <ButtonIcon as={EditIcon} size="md" />
          </Button>
        </HStack>
      </View>
      {tabSelect}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  buttons: {
    alignItems: "center",
    paddingTop: 20,
    marginBottom: 20,
  },
});
