import { GenerateTasksRequest, GenerateTasksResponse } from '@/types/api';
import axios from 'axios';

const API_BASE_URL = 'https://focus-bear-game-app.vercel.app/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API response from: ${response.config.url}`, response.status);
    console.log('API response data:', response.data);
    return response;
  },
  (error) => {
    console.error('API response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const taskApi = {

  generateTasks: async (payload: GenerateTasksRequest): Promise<GenerateTasksResponse> => {
    try {
      const response = await apiClient.post<GenerateTasksResponse>('/generate-tasks', payload);
      console.log('API response payload:', payload);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
   
    }
  },
};

export default apiClient;
