// lib/axiosInstance.ts
import axios from 'axios';
import { createCookies, getCookies } from '@/utils/action';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL; // Use NEXT_PUBLIC_ prefix for Next.js

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
const axiosInstance2 = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  async (config: any) => {
    if (!config.headers) {
      config.headers = {};
    }

    const data = await getCookies('users');
    const parseData = data && JSON.parse(data?.value);
    const token = parseData?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const data = await getCookies('users');
        const parseData = data && JSON.parse(data?.value);
        const res = await axiosInstance2.post('/account/renew_access_token/', {
          refresh_token: parseData?.refresh,
        });
        const newAccessToken = res?.data?.access_token;
        if (newAccessToken) {
          const updatedUserData = {
            ...parseData,
            access: newAccessToken,
            refresh: res?.data?.refresh_token,
          };
          await createCookies('users', JSON.stringify(updatedUserData));
          axiosInstance.defaults.headers.common['Authorization'] =
            `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        }
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
