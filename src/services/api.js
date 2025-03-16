import axios from 'axios';

const BACKEND_URL = 'https://file-upload-server-mc26.onrender.com/';
const REQUEST_TIMEOUT = 1000000;

export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      throw error;
    }
  );

  return api;
};