import { useAuthStore } from '@/store/useAuthStore';
import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
