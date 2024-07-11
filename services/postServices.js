import axios from "axios";

const SERVICE_API_URL = "https://foodmood-services-2cf25513658c.herokuapp.com";
const API_URL = "https://foodmood-59eae4f7d92d.herokuapp.com/api";

const checkProfanity = async (text) => {
  try {
    const response = await axios.post(
      `${SERVICE_API_URL}/check_profanity`,
      { text },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data.message || "Error occurred during profanity check."
    );
  }
};

const createPost = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/posts/create`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data.message || "Error creating post.";
  }
};

const getAllPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    throw error.response?.data.message || "Error fetching posts.";
  }
};

const getPostsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/posts/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data.message || "Error fetching posts by user ID.";
  }
};

const getPostById = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data.message || "Error fetching post.";
  }
};

const updatePost = async (postId, data, token) => {
  try {
    const response = await axios.put(`${API_URL}/posts/${postId}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data.message || "Error updating post.";
  }
};

const deletePost = async (postId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data.message || "Error deleting post.";
  }
};

export default {
  checkProfanity,
  createPost,
  getAllPosts,
  getPostsByUserId,
  getPostById,
  updatePost,
  deletePost,
};
