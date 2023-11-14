import { HStack, Icon, Input, InputField, InputIcon, InputSlot, Pressable } from "@gluestack-ui/themed";
import { ArrowLeft, SearchIcon } from "lucide-react-native";
import React, { Component } from "react";
import { View, StyleSheet, Text, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackNavigationProps } from "../../components/RouteTypes/Stack";

export default class SearchScreen extends Component<RootStackNavigationProps> {
  state = {
    count: 0,
    openTheKeyboard: false
  };
  componentDidMount() {
    this.setState({ openTheKeyboard: true });
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <HStack h="$16" alignItems="center">
            <Pressable onPress={()=>this.props.navigation.goBack()}>
              <Icon as={ArrowLeft} size="xl" style={{ margin: 10 }} />
            </Pressable>
            <View style={{ width: "90%" }}>
              <Input variant="rounded" size="md" w="95%" isFocused={this.state.openTheKeyboard} focusable={true}>
                <InputField placeholder="Orders • Recipes • Restaurants" />
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
        </View>
      </SafeAreaView >
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});