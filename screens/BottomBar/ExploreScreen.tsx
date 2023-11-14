import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Center, HStack, Icon, Input, InputField, InputIcon, InputSlot, Pressable, Text, VStack, Image } from "@gluestack-ui/themed";
import { SearchIcon } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProps } from "../../components/RouteTypes/Stack";
import { BottomTabNavigationProps } from "../../components/RouteTypes/BottomTab";




export default class ExploreScreen extends Component<RootStackNavigationProps>{

  render() {

    return (
      <View style={styles.container}>
        <Pressable onPress={() => this.props.navigation.navigate('Search')}>
          <HStack h="$16" alignItems="center">
            <View style={{ width: "100%", alignItems: "center" }}>
              <Input variant="rounded" size="md" w="95%" isReadOnly={true}>
                <InputField placeholder="Orders • Recipes • Restaurants" onPressIn={() => this.props.navigation.navigate('Search')} />
                <InputSlot
                  bg="$primary500"
                  borderRadius="$full"
                  h="$6"
                  w="$6"
                  m="$1.5"
                >
                  <InputIcon as={SearchIcon} color="white" size="sm" />
                </InputSlot>
              </Input></View>
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