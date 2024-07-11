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

const createRecipe = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/recipes/create`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data.message || "Error creating recipe.";
  }
};

const getAllRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/recipes`);
    return response.data;
  } catch (error) {
    throw error.response?.data.message || "Error fetching recipes.";
  }
};

const getRecipeById = async (recipeId) => {
  try {
    const response = await axios.get(`${API_URL}/recipes/${recipeId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data.message || "Error fetching recipe.";
  }
};

const updateRecipe = async (recipeId, data, token) => {
  try {
    const response = await axios.put(`${API_URL}/recipes/${recipeId}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data.message || "Error updating recipe.";
  }
};

const deleteRecipe = async (recipeId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/recipes/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data.message || "Error deleting recipe.";
  }
};

const getRecipesByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/recipes/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data.message || "Error fetching recipes by user ID.";
  }
};

export default {
  checkProfanity,
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getRecipesByUserId,
};
