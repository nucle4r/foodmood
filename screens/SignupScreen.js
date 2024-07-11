import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  Text,
  Button,
  Input,
  InputField,
  Center,
  ButtonText,
  HStack,
} from "@gluestack-ui/themed";
import userServices from "../services/userServices";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const data = await userServices.signup({ name, username, email, password });
      console.log("Signup successful", data);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack justifyContent="center" flex={1}>
      <Center>
        <VStack space="4xl" alignItems="center">
          <Text bold="true" size={"3xl"}>
            Join Us!
          </Text>
          <Text bold="true" size={"2xl"}>
            Sign Up
          </Text>

          {error ? <Text color="red">{error}</Text> : null}
          <Input variant="rounded" size="md" style={{ width: 300 }}>
            <InputField
              placeholder="Name"
              onChangeText={setName}
              value={name}
            />
          </Input>

          <Input variant="rounded" size="md" style={{ width: 300 }}>
            <InputField
              placeholder="Username"
              onChangeText={setUsername}
              value={username}
            />
          </Input>

          <Input variant="rounded" size="md" style={{ width: 300 }}>
            <InputField
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
            />
          </Input>

          <Input variant="rounded" size="md" style={{ width: 300 }}>
            <InputField
              placeholder="Password"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </Input>

          <Input variant="rounded" size="md" style={{ width: 300 }}>
            <InputField
              placeholder="Confirm Password"
              secureTextEntry
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </Input>

          {loading ? (
            <ActivityIndicator size="small" />
          ) : (
            <Button
              size="md"
              variant="solid"
              action="positive"
              onPress={handleSignup}
              style={{ width: 150 }}
            >
              <ButtonText>Sign Up</ButtonText>
            </Button>
          )}
          <HStack alignItems="center">
            <Text>Already have an account? </Text>
            <Button
              size="md"
              variant="link"
              action="secondary"
              onPress={() => navigation.navigate("Login")}
            >
              <ButtonText>Login</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Center>
    </VStack>
  );
}
