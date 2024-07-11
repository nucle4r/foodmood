import axios from "axios";

const API_URL = "https://foodmood-59eae4f7d92d.herokuapp.com/api/comments";

// Function to add a comment
const addComment = async (itemId, onModel, content, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/${itemId}/${onModel}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error.response?.data);
    throw error;
  }
};

// Function to get comments for an item
const getComments = async (itemId, token) => {
  try {
    const response = await axios.get(`${API_URL}/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error.response?.data);
    throw error;
  }
};

// Function to update a comment
const updateComment = async (commentId, content, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/${commentId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error.response?.data);
    throw error;
  }
};

// Function to delete a comment
const deleteComment = async (commentId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error.response?.data);
    throw error;
  }
};

export default {
  addComment,
  getComments,
  updateComment,
  deleteComment,
};
