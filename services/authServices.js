// services/authServices.js
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "https://foodmood-59eae4f7d92d.herokuapp.com/api";

const checkAuth = async () => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    if (!token) return null;

    const authResponse = await axios.get(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userResponse = await axios.get(`${BASE_URL}/users/${authResponse.data.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return userResponse.data;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return null;
  }
};

export const authServices = {
  checkAuth,
};
