import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const battleApi = {
  conductBattle: async (message) => {
    const response = await apiClient.post('/battle', { message });
    return response.data;
  },
};

export default battleApi;
