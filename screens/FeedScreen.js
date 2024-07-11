import React, { useEffect, useState } from "react";
import { FlatList, View, Text, ActivityIndicator } from "react-native";
import { useRecoilValue } from "recoil";
import { userFeedState } from "../global/state";
import postServices from "../services/postServices";
import {
  HStack,
  VStack,
  Button,
  ButtonIcon,
  ButtonText,
  Icon,
  Heading,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";
import UserPosts from "../pages/UserPosts";
import UserRecipes from "../pages/UserRecipes";
import FeedPosts from "../pages/FeedPosts";
import FeedRecipes from "../pages/FeedRecipes";
import {
  EditIcon,
  ShareIcon,
  CookingPot,
  UtensilsCrossed,
} from "lucide-react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function FeedScreen() {
  const tabSelect = (
    <HStack>
      <Tab.Navigator
        initialRouteName="Feed Posts"
        screenOptions={{
          tabBarActiveTintColor: "#e91e63",
          tabBarShowLabel: false,
          tabBarLabelStyle: { fontSize: 12 },
          swipeEnabled: false,
        }}
        style={{ height: 1000 }}
      >
        <Tab.Screen
          name="Feed Posts"
          component={FeedPosts}
          options={{
            tabBarIcon: () => <Icon as={UtensilsCrossed} size="xl" />,
          }}
        />
        <Tab.Screen
          name="Feed Recipes"
          component={FeedRecipes}
          options={{ tabBarIcon: () => <Icon as={CookingPot} size="xl" /> }}
        />
      </Tab.Navigator>
    </HStack>
  );
  return <View>{tabSelect}</View>;
}
