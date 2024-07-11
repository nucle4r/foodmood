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
import { useRecoilState } from "recoil";
import { userDataAtom } from "../global/state";
import userServices from "../services/userServices";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setUserData] = useRecoilState(userDataAtom);

  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await userServices.login({ email, password });
      setUserData(data.user);
      navigation.navigate("Main");
    } catch (error) {
      console.error("Login error:", error);
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
            Welcome Back!
          </Text>
          <Text bold="true" size={"2xl"}>
            Login
          </Text>

          {error ? <Text color="red">{error}</Text> : null}

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

          {loading ? (
            <ActivityIndicator size="small" />
          ) : (
            <Button
              size="md"
              variant="solid"
              action="positive"
              onPress={handleLogin}
              style={{ width: 150 }}
            >
              <ButtonText>Login</ButtonText>
            </Button>
          )}
          <HStack alignItems="center">
            <Text>Don't have an account? </Text>
            <Button
              size="md"
              variant="link"
              action="secondary"
              onPress={() => navigation.navigate("Signup")}
            >
              <ButtonText>Sign up</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Center>
    </VStack>
  );
}
