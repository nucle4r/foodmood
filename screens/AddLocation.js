import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  FlatList,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { useRecoilState } from "recoil";
import { locationState } from "../global/state";

export default function AddLocation({ navigation, route }) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useRecoilState(locationState);
  const googleMapsApiKey = Constants.expoConfig.extra.googleMapsApiKey;

  useEffect(() => {
    if (input.length > 3) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${googleMapsApiKey}&language=en&components=country:in`
          );
          const filteredResults = response.data.predictions.filter((item) =>
            item.types.some(
              (type) =>
                type === "restaurant" || type === "cafe" || type === "bar"
            )
          );
          setResults(filteredResults);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [input]);

  const handleSelect = async (item) => {
    setIsLoading(true);
    try {
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&fields=geometry&key=${googleMapsApiKey}`;
      const response = await axios.get(detailsUrl);
      const { lat, lng } = response.data.result.geometry.location;
      setLocation({ description: item.description, latitude: lat, longitude: lng });
      navigation.goBack();
    } catch (error) {
      console.error("Error fetching place details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Enter Location"
        style={styles.input}
      />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loading}
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelect(item)}
            >
              <Text>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <Text style={styles.poweredBy}>Powered by Google</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  loading: {
    marginTop: 20,
  },
  poweredBy: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
    color: "#aaa",
  },
});
