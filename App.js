import 'react-native-gesture-handler';
import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { RecoilRoot } from "recoil";
import Main from "./Main";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    async function hideSplash() {
      if (loaded) {
        await SplashScreen.hideAsync();
      }
    }

    hideSplash();
  }, [loaded]);

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <RecoilRoot>
        <Main />
      </RecoilRoot>
    </View>
  );
}
