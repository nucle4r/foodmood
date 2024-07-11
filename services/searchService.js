import axios from 'axios';

const API_URL = 'https://foodmood-59eae4f7d92d.herokuapp.com/api';

// Function to perform search
const searchItems = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { query }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Search service error:', error.response ? error.response.data : 'Error occurred during the search');
    throw error; // Re-throw to handle it in the component
  }
};

export default {
  searchItems
};
