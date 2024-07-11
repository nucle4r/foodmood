import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  HStack,
  VStack,
  Text,
  Button,
  Icon,
  Heading,
  Avatar,
  AvatarImage,
  AvatarFallbackText,
  ButtonText,
  Spinner,
} from "@gluestack-ui/themed";
import {
  EditIcon,
  ShareIcon,
  CookingPot,
  UtensilsCrossed,
} from "lucide-react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import VisitUserPosts from "../pages/VisitUserPosts";
import VisitUserRecipes from "../pages/VisitUserRecipes";
import { useRecoilState } from "recoil";
import { visitUserDataAtom, userFollowsState } from "../global/state";
import { useNavigation } from "@react-navigation/native";
import followServices from "../services/followServices";
import userServices from "../services/userServices";
import * as SecureStore from "expo-secure-store";

const Tab = createMaterialTopTabNavigator();

export default function VisitProfileScreen({ route }) {
  const [visitUserData, setVisitUserData] = useRecoilState(visitUserDataAtom);
  const [userFollows, setUserFollows] = useRecoilState(userFollowsState);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const userId = route.params.id;

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const data = await userServices.getUserById(userId);
      setVisitUserData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isFollowing = userFollows.includes(userId);

  const handleFollowUnfollow = async () => {
    const currentUserToken = await SecureStore.getItemAsync("userToken");
    const newFollows = isFollowing
      ? userFollows.filter((id) => id !== userId)
      : [...userFollows, userId];
    const newFollowerCount = isFollowing
      ? visitUserData.followers_count - 1
      : visitUserData.followers_count + 1;

    // Optimistic update
    setUserFollows(newFollows);
    setVisitUserData({
      ...visitUserData,
      followers_count: newFollowerCount,
    });

    try {
      if (isFollowing) {
        await followServices.unfollowUser(userId, currentUserToken);
      } else {
        await followServices.followUser(userId, currentUserToken);
      }
    } catch (error) {
      console.error(
        `Error ${isFollowing ? "unfollowing" : "following"} user:`,
        error
      );
      // Revert on error
      setUserFollows(userFollows);
      setVisitUserData({
        ...visitUserData,
        followers_count: visitUserData.followers_count,
      });
    }
  };

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <Spinner size="large" />
      </View>
    );

  const followUnfollowButton = (
    <Button
      size="xs"
      variant="solid"
      bg={isFollowing ? "#cc0000" : "#4a934a"}
      borderRadius="$lg"
      onPress={handleFollowUnfollow}
    >
      <ButtonText>{isFollowing ? "  Unfollow  " : "    Follow    "}</ButtonText>
    </Button>
  );

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
          component={VisitUserPosts}
          options={{
            tabBarIcon: () => <Icon as={UtensilsCrossed} size="xl" />,
          }}
        />
        <Tab.Screen
          name="User Recipes"
          component={VisitUserRecipes}
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
            {visitUserData.profilePicture ? (
              <AvatarImage
                source={{ uri: visitUserData.profilePicture }}
                alt="Profile Picture"
                borderRadius="$full"
              />
            ) : (
              <AvatarFallbackText>{visitUserData.name}</AvatarFallbackText>
            )}
          </Avatar>
          <VStack style={{ alignItems: "center" }}>
            <Heading>{visitUserData.no_of_posts}</Heading>
            <Text size="sm">Posts</Text>
          </VStack>
          <VStack style={{ alignItems: "center" }}>
            <Heading>{visitUserData.followers_count}</Heading>
            <Text size="sm">Followers</Text>
          </VStack>
          <VStack style={{ alignItems: "center" }}>
            <Heading>{visitUserData.following_count}</Heading>
            <Text size="sm">Following</Text>
          </VStack>
        </HStack>

        <Text size="sm" style={{ fontWeight: "bold" }}>
          {visitUserData.username}
        </Text>
        <Text size="sm" style={{ fontWeight: "bold" }}>
          {visitUserData.name}
        </Text>
        {visitUserData.bio && <Text size="sm">{visitUserData.bio}</Text>}
        {visitUserData.location && (
          <Text size="sm">{visitUserData.location}</Text>
        )}
      </VStack>
      <View style={styles.buttons}>
        <HStack space="xl" reversed={false}>
          {followUnfollowButton}
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
    paddingTop: 20,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
