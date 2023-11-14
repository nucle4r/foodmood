import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ForYouFeed from '../components/ForYou';
import FollowingFeed from '../components/Following';
import { Center, HStack, Icon, Input, InputField, InputIcon, InputSlot, Pressable, Text, VStack, Image } from "@gluestack-ui/themed";
import { SearchIcon } from "lucide-react-native";
import { useNavigation, NavigationState, NavigationContainerProps, NavigationProp } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();
const navigation = useNavigation();

export default class ExploreScreen extends Component{

  navigateToScreen = () => {
    // Use this.props.navigation.navigate to navigate to another screen
    this.props.navigation.navigate("Search");
  };
  render() {

    return (
      <View style={styles.container}>
        <Pressable onPress={() => this.navigateToScreen}>
          <HStack h="$16" alignItems="center">
            <Input variant="rounded" size="md" w="90%">
              <InputField placeholder="Food • Recipies • Restaurants" />
              <InputSlot
                bg="$primary500"
                borderRadius="$full"
                h="$6"
                w="$6"
                m="$1.5"
              >
                <InputIcon as={SearchIcon} color="white" size="sm" />
              </InputSlot>
            </Input>
          </HStack>
        </Pressable>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <VStack space="xs" reversed={false}>
            <HStack space="xs" reversed={true}>
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",

                }}
                alt="ddd"
              />
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",
                }}
                alt="ddd"
              />
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",
                }}
                alt="ddd"
              />
            </HStack>
            <HStack space="xs" reversed={false}>
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",

                }}
                alt="ddd"
              />
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",
                }}
                alt="ddd"
              />
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",
                }}
                alt="ddd"
              />
            </HStack>
            <HStack space="xs" reversed={false}>
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",

                }}
                alt="ddd"
              />
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",
                }}
                alt="ddd"
              />
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",
                }}
                alt="ddd"
              />
            </HStack>
            <HStack space="xs" reversed={false}>
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",

                }}
                alt="ddd"
              />
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",
                }}
                alt="ddd"
              />
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",
                }}
                alt="ddd"
              />
            </HStack>
            <HStack space="xs" reversed={false}>
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",

                }}
                alt="ddd"
              />
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",
                }}
                alt="ddd"
              />
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",
                }}
                alt="ddd"
              />
            </HStack>
            <HStack space="xs" reversed={false}>
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",

                }}
                alt="ddd"
              />
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",
                }}
                alt="ddd"
              />
              <Image
                size="xl"
                source={{
                  uri: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275",
                }}
                alt="ddd"
              />
            </HStack>
          </VStack>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center"
  }

});