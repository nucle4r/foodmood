import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet, Dimensions } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userDataAtom, userLikesState, userFeedState, userFollowsState } from "./global/state";
import { authServices } from "./services/authServices";
import likeServices from "./services/likeServices";
import followServices from "./services/followServices";
import feedServices from "./services/feedServices";
import * as SecureStore from "expo-secure-store";
import {
  GluestackUIProvider,
  Icon,
  Menu,
  MenuItem,
  MenuItemLabel,
  Text,
} from "@gluestack-ui/themed";
import {
  EllipsisVertical,
  LogOut,
  Home,
  UserRound,
  Compass,
  CirclePlus,
} from "lucide-react-native";
import { config } from "@gluestack-ui/config";

import FeedScreen from "./screens/FeedScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import ExploreScreen from "./screens/ExploreScreen";
import ExperienceScreen from "./screens/ExperienceScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AddOptionsScreen from "./screens/AddOptionsScreen";
import AddLocation from "./screens/AddLocation";
import RecipeScreen from "./screens/RecipeScreen";
import AddIngredients from "./screens/AddIngredients";
import AddInstructions from "./screens/AddInstructions";
import ViewPostScreen from "./screens/ViewPostScreen";
import ViewRecipeScreen from "./screens/ViewRecipeScreen";
import CommentsScreen from "./screens/CommentsScreen";
import { Video } from "expo-av";
import AuthLoad from "./assets/authload.mp4";
import SearchScreen from "./screens/SearchScreen";
import VisitProfileScreen from "./screens/VisitProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

function BottomTabNavigator() {
  const navigation = useNavigation();
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    await SecureStore.deleteItemAsync("userData");
    setUserData(null); // Clear user data in state
    navigation.navigate("Login");
  };
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#FA7070",
        tabBarInactiveTintColor: "#1d1d1d",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon as={Home} color={color} size="xl" />,
          headerTitle: () => (
            <Text size="xl" color="black" bold="true">
              FoodMood
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon as={Compass} color={color} size="xl" />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={AddOptionsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon as={CirclePlus} color={color} size="xl" />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={UserRound} color={color} size="xl" />
          ),
          headerTitle: (props) => (
            <Text size="xl" color="black" bold="true">
              {userData.username}
            </Text>
          ),
          headerRight: () => (
            <Menu
              placement="bottom end"
              trigger={({ ...triggerProps }) => {
                return (
                  <Icon
                    as={EllipsisVertical}
                    {...triggerProps}
                    size="lg"
                    mr="$4"
                  />
                );
              }}
            >
              <MenuItem key="LogOut" textValue="LogOut" onPress={handleLogout}>
                <Icon as={LogOut} size="sm" mr="$2" />
                <MenuItemLabel size="sm">LogOut</MenuItemLabel>
              </MenuItem>
            </Menu>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Main = () => {
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const setUserLikes = useSetRecoilState(userLikesState);
  const setUserFollows = useSetRecoilState(userFollowsState);
  const setUserFeeds = useSetRecoilState(userFeedState);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isFetchingFeed, setIsFetchingFeed] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await authServices.checkAuth();
        setUserData(user);
        await initializeLikes(user._id);
        await initializeFollows(user._id);
        await initializeFeed(user._id);
      } catch (error) {
        console.error("Authentication failed:", error);
      } finally {
        setIsAuthenticating(false);
        setIsFetchingFeed(false);
      }
    };

    initializeAuth();
  }, [setUserData, setUserLikes]);

  const initializeLikes = async (userId) => {
    const userToken = await SecureStore.getItemAsync("userToken");
    try {
      const likes = await likeServices.fetchUserLikes(userId, userToken);
      console.log(likes);
      if (likes) {
        setUserLikes(likes);
      } else {
        setUserLikes(["none"]);
      }
    } catch (error) {
      console.error("Failed to fetch user likes:", error);
    }
  };
  const initializeFollows = async (userId) => {
    const userToken = await SecureStore.getItemAsync("userToken");
    try {
      const follows = await followServices.fetchUserFollowing(userId, userToken);
      console.log(follows);
      if (follows) {
        setUserFollows(follows);
      } else {
        setUserFollows(["none"]);
      }
    } catch (error) {
      console.error("Failed to fetch user follows:", error);
    }
  };
  const initializeFeed = async (userId) => {
    try {
      const feeds = await feedServices.fetchUserFeeds(userId);
      if (feeds) {
        setUserFeeds(feeds);
      } else {
        setUserFeeds(["none"]);
      }
    } catch (error) {
      console.error("Failed to fetch user feeds:", error);
    }
  };

  if (isAuthenticating || isFetchingFeed) {
    return (
      <View style={styles.container}>
        <Video
          source={AuthLoad}
          style={styles.loading}
          resizeMode="cover"
          shouldPlay
          isLooping
        />
      </View>
    );
  }

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userData ? (
            <>
              <Stack.Screen name="Main" component={BottomTabNavigator} />
              <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                  headerShown: true,
                  headerTitle: () => (
                    <Text size="xl" color="black" bold="true">
                      Edit Profile
                    </Text>
                  ),
                }}
              />
              <Stack.Screen
                name="Experience"
                component={ExperienceScreen}
                options={{
                  headerShown: true,
                  headerTitle: () => (
                    <Text size="xl" color="black" bold="true">
                      Add Experience
                    </Text>
                  ),
                }}
              />

              <Stack.Screen
                name="Recipe"
                component={RecipeScreen}
                options={{
                  headerShown: true,
                  headerTitle: () => (
                    <Text size="xl" color="black" bold="true">
                      Add Recipe
                    </Text>
                  ),
                }}
              />

              <Stack.Screen
                name="AddLocation"
                component={AddLocation}
                options={{
                  headerShown: true,
                  headerTitle: () => (
                    <Text size="xl" color="black" bold="true">
                      Add Location
                    </Text>
                  ),
                }}
              />
              <Stack.Screen
                name="AddIngredients"
                component={AddIngredients}
                options={{
                  headerShown: true,
                  headerTitle: () => (
                    <Text size="xl" color="black" bold="true">
                      Add Ingredients
                    </Text>
                  ),
                }}
              />
              <Stack.Screen
                name="AddInstructions"
                component={AddInstructions}
                options={{
                  headerShown: true,
                  headerTitle: () => (
                    <Text size="xl" color="black" bold="true">
                      Add Instructions
                    </Text>
                  ),
                }}
              />
              <Stack.Screen
                name="ViewPost"
                component={ViewPostScreen}
                options={{
                  headerShown: true,
                  headerTitle: () => (
                    <Text size="xl" color="black" bold="true">
                      View Post
                    </Text>
                  ),
                }}
              />
              <Stack.Screen
                name="ViewRecipe"
                component={ViewRecipeScreen}
                options={{
                  headerShown: true,
                  headerTitle: () => (
                    <Text size="xl" color="black" bold="true">
                      View Recipe
                    </Text>
                  ),
                }}
              />
              <Stack.Screen
                name="CommentsScreen"
                component={CommentsScreen}
                options={{
                  headerShown: true,
                  headerTitle: () => (
                    <Text size="xl" color="black" bold="true">
                      View Comments
                    </Text>
                  ),
                }}
              />
              <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="VisitProfileScreen"
                component={VisitProfileScreen}
                options={{
                  headerShown: true,
                  headerTitle: () => (
                    <Text size="xl" color="black" bold="true">
                      View Profile
                    </Text>
                  ),
                }}
              />
            </>
          ) : (
            <Stack.Screen name="Auth" component={AuthStackNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "ffa101",
  },
  loading: {
    width: "100%",
    height: "100%",
    alignSelf: "stretch",
  },
});

export default Main;
