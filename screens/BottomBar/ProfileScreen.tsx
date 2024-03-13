import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { HStack, Box, Center, Heading, VStack, Text, Button, ButtonText, ButtonIcon, EditIcon, ShareIcon, Icon } from "@gluestack-ui/themed";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from '@gluestack-ui/themed';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserPosts from "../../components/Page/UserPosts";
import { Grid3X3, Tags } from "lucide-react-native";
import UserTaggedPosts from "../../components/Page/UserTaggedPosts";
import { useRecoilState } from "recoil";
import { userData } from "../../utils/State";

const Tab = createMaterialTopTabNavigator();



export default function ProfileScreen() {

  const [profile, setProfile] = useRecoilState(userData)

    const tabMenu = (
      <HStack>

        <Tab.Navigator
          initialRouteName="For You"
          screenOptions={{
            tabBarActiveTintColor: '#e91e63',
            tabBarShowLabel: false,
            tabBarLabelStyle: { fontSize: 12 },
            swipeEnabled: true,
            lazy: true
          }}
          style={{ height: 1000 }}
        >
          <Tab.Screen
            name="For You"
            component={UserPosts}
            options={{ tabBarIcon: () => (<Icon as={Grid3X3} size="xl" />) }}
          />
          <Tab.Screen
            name="Following"
            component={UserTaggedPosts}
            options={{ tabBarIcon: () => (<Icon as={Tags} size="xl" />) }}
          />
        </Tab.Navigator>

      </HStack>
    );
    return (
      <ScrollView>
        <View style={styles.container}>
          <HStack space="2xl" reversed={false}>
            <VStack style={{ alignItems: "center" }}>
              <Avatar bgColor="$amber600" size="xl" borderRadius="$full">
                <AvatarFallbackText>{profile.fullName}</AvatarFallbackText>
              </Avatar>
              <Text size="sm">{profile.fullName}</Text>
            </VStack>
            <HStack space="xl" style={{ alignSelf: "center" }}>
              <VStack style={{ alignItems: "center" }}>
                <Heading>{profile.no_of_posts}</Heading>
                <Text size="sm">Posts</Text>
              </VStack>
              <VStack style={{ alignItems: "center" }}>
                <Heading>{profile.followersCount}</Heading>
                <Text size="sm">Followers</Text>
              </VStack>
              <VStack style={{ alignItems: "center" }}>
                <Heading>{profile.followingCount}</Heading>
                <Text size="sm">Following</Text>
              </VStack>
            </HStack>
          </HStack>
          <View style={styles.buttons}>
            <HStack space="xs" reversed={false}>
              <Button size="xs" variant="solid" bg="#d3d3d3" isDisabled={false} isFocusVisible={false} borderRadius="$lg">
                <ButtonIcon as={EditIcon} size="sm" />
                <ButtonText size="sm">   Edit profile   </ButtonText>
              </Button>
              <Button size="xs" variant="solid" bg="#d3d3d3" isDisabled={false} isFocusVisible={false} borderRadius="$lg">
                <ButtonIcon as={ShareIcon} size="sm" />
                <ButtonText size="sm">   Share profile   </ButtonText>
              </Button>
              <Button size="xs" variant="solid" bg="#d3d3d3" isDisabled={false} isFocusVisible={false} borderRadius="$lg">
                <ButtonIcon as={EditIcon} size="md" />
              </Button>
            </HStack>
          </View>
          {tabMenu}
        </View >
      </ScrollView>

    );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor:"#fff"
  },
  buttons: {
    alignItems: "center",
    paddingTop: 20,
    marginBottom: 20
  }
});