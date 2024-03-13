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
          <Pressable onPress={()=>{
            fetch('http://192.168.37.23:8800/api/auth/register', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: 'yourValue',
                email: 'yourOtherValue',
                password:'ddddddd'
              }),
            });
          }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 18, fontStyle: "italic" }}
            >
              List Screen
            </Text>
          </Pressable>
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