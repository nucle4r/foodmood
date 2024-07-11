import axios from "axios";

const API_URL = "https://foodmood-lstm-4c992b2da9be.herokuapp.com";

const fetchUserFeeds = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/recommend/${userId}`, {
      headers: {
        Authorization: `Bearer FoodMood-LSTM`,
      },
    });
    console.log();
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error.response?.data);
    throw error;
  }
};

const fetchUserExplore = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/explore_recommend/${userId}`, {
      headers: {
        Authorization: `Bearer FoodMood-LSTM`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error.response?.data);
    throw error;
  }
};

export default {
  fetchUserFeeds,
  fetchUserExplore
};
