import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "https://foodmood-59eae4f7d92d.herokuapp.com/api/users";

const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Error occurred during signup.";
  }
};

const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    const { token, user } = response.data;

    // Save token and user data in SecureStore
    await SecureStore.setItemAsync("userToken", token);    
    await SecureStore.setItemAsync("userData", JSON.stringify(user));

    return { user, token };
  } catch (error) {
    throw error.response.data.message || "Error occurred during login.";
  }
};

const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Error fetching users.";
  }
};

const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Error fetching user.";
  }
};

const updateUser = async (userId, userData) => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    const response = await axios.put(`${BASE_URL}/${userId}`, userData, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const updatedUser = response.data;

    // Update SecureStore
    await SecureStore.setItemAsync("userData", JSON.stringify(updatedUser));

    return updatedUser;
  } catch (error) {
    throw error.response?.data.message || "Error occurred during user update.";
  }
};

const deleteUser = async (userId) => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    await axios.delete(`${BASE_URL}/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return { message: "User deleted successfully." };
  } catch (error) {
    throw error.response.data.message || "Error deleting user.";
  }
};

export default {
  signup,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
