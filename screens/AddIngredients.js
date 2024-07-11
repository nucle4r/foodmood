import React, { useState } from "react";
import { ScrollView, View, StyleSheet, FlatList, Text } from "react-native";
import { useRecoilState } from "recoil";
import { ingredientsState } from "../global/state";
import {
  Icon,
  Input,
  InputField,
  Button,
  HStack,
  VStack,
  ButtonText,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@gluestack-ui/themed";
import { ChevronDownIcon, XIcon } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const AddIngredients = () => {
  const [ingredients, setIngredients] = useRecoilState(ingredientsState);
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState("");
  const navigation = useNavigation();

  const handleAddIngredient = () => {
    const newIngredient = { name, qty: Number(qty), unit };
    setIngredients((current) => [...current, newIngredient]);
    setName("");
    setQty("");
    setUnit("");
  };

  const handleRemoveIngredient = (index) => {
    setIngredients((current) => current.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <VStack>
        <HStack style={{ flex: 1, alignItems: "center", marginVertical: 25 }}>
          <Input variant="outline" size="md" style={{ flex: 1.5 }}>
            <InputField
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          </Input>
          <Input
            variant="outline"
            size="md"
            style={{ flex: 0.5, marginHorizontal: 10 }}
          >
            <InputField
              placeholder="Qty"
              value={qty}
              onChangeText={setQty}
              keyboardType="numeric"
            />
          </Input>
          <Select
            onValueChange={setUnit}
            selectedValue={unit}
            style={{ flex: 1 }}
          >
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder="Unit" />
              <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="None" value="none" />
                <SelectItem label="Cups" value="cups" />
                <SelectItem label="Tablespoons" value="tablespoons" />
                <SelectItem label="Teaspoons" value="teaspoons" />
                <SelectItem label="Grams" value="grams" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </HStack>
        <Button onPress={handleAddIngredient} marginVertical={10}>
          <ButtonText>Add Ingredient</ButtonText>
        </Button>
      </VStack>
      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text style={{ flex: 1 }}>{`${item.qty} ${
              item.unit === "none" ? "" : item.unit
            } of ${item.name}`}</Text>
            <Button
              onPress={() => handleRemoveIngredient(index)}
              style={styles.deleteButton}
            >
              <Icon as={XIcon} color="#FF6347" size="20" />
            </Button>
          </View>
        )}
      />
      <Button bgColor="#4A934A" onPress={() => navigation.goBack()} marginVertical={10}>
          <ButtonText>Save Instructions</ButtonText>
        </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: "transparent", // Adjust as needed
  },
});

export default AddIngredients;
