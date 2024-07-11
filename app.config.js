import 'dotenv/config';

export default {
  expo: {
    name: "FoodMood",
    slug: "FoodMood",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-secure-store",
      "expo-font",
      [
        "expo-av",
        {
          microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone."
        }
      ]
    ],
    // Add extra configuration to include environment variables
    extra: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  }
};
