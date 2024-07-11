import React, { useState } from "react";
import { StyleSheet, TextInput, Button, ScrollView } from "react-native";
import { useRecoilState } from "recoil";
import { instructionsState } from "../global/state";
import { useNavigation } from "@react-navigation/native";

const AddInstructions = () => {
  const [instructions, setInstructions] = useRecoilState(instructionsState);
  const navigation = useNavigation();

  const handleSubmit = () => {
    setInstructions(instructions); // This might seem redundant, ensure you handle it based on actual use case
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        editable
        multiline
        placeholder="Write cooking instructions for your recipe here..."
        numberOfLines={15}
        maxLength={2200}
        value={instructions}
        onChangeText={setInstructions}
        style={styles.input}
      />
      <Button
        title="Save Instructions"
        onPress={handleSubmit}
        color="#4A934A" // Example color, adjust based on your app theme
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  input: {
    color: "#000000",
    padding: 15,
    borderBottomColor: "#222222",
    borderBottomWidth: 0.5,
    marginBottom: 20,
    textAlignVertical: "top",
    fontSize: 16,
  },
});

export default AddInstructions;
