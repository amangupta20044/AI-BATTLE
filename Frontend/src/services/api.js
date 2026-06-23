import axios from 'axios';

// The base URL comes from our .env file.
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export async function sendMessage(prompt) {
  try {
    // Send a POST request to the backend /invoke endpoint
    const response = await axios.post(`${API_URL}/invoke`, {
      input: prompt,
    });

    if (response.data && response.data.success) {
      // The backend returns { message, success, result: { solution_1, solution_2, judge } }
      return response.data.result;
    }

    const errorMessage = response.data?.error || 'Invalid response format from server';
    throw new Error(errorMessage);
  } catch (error) {
    console.error('API Error:', error);

    if (axios.isAxiosError(error) && error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }

    throw error instanceof Error ? error : new Error('Network Error');
  }
}

