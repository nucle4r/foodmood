import { Pressable } from "@gluestack-ui/themed";
import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";


export default class RecipeScreen extends Component {
  state = {
    count: 0,
  };

  render() {
    return (
      <View style={styles.container}>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 18, fontStyle: "italic" }}
          >
            List Screen
          </Text>
        </View>
      </View >
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