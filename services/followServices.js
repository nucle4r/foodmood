import axios from "axios";

const API_URL = "https://foodmood-59eae4f7d92d.herokuapp.com/api/follow";

// Function to follow a user
const followUser = async (userId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/follow/${userId}`, // Updated the path for consistency
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error following user:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to unfollow a user
const unfollowUser = async (userId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/unfollow/${userId}`, // Updated the path for consistency
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error unfollowing user:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to fetch followers of a user
const fetchUserFollowers = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/followers/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user followers:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to fetch users a person is following
const fetchUserFollowing = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/following/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user following:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export default {
  followUser,
  unfollowUser,
  fetchUserFollowers,
  fetchUserFollowing,
};
