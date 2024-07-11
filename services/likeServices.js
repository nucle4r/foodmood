import axios from "axios";

const API_URL = "https://foodmood-59eae4f7d92d.herokuapp.com/api";

const toggleLike = async (itemId, token, type) => {
  try {
    const response = await axios.post(
      `${API_URL}/likes/${type}/${itemId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error toggling like:", error.response.data);
    throw error;
  }
};

const fetchUserLikes = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/likes/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Assuming the response structure directly gives you the desired result
  } catch (error) {
    console.error("Failed to fetch user likes:", error);
    throw error;
  }
};

export default {
  toggleLike,
  fetchUserLikes,
};
