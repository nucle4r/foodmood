import { HStack, Icon, Text } from "@gluestack-ui/themed";
import { Ghost } from "lucide-react-native";
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";


export default class NotifyScreen extends Component {
  state = {
    count: 0,
  };

  render() {
    return (
      <View style={styles.container}>
        
        <HStack space="lg" alignItems="center">
          <Icon as={Ghost} size="xl"/>
          <Text size="lg" fontStyle="italic">
            No new notifications!
          </Text>

        </HStack>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff"
  },
});