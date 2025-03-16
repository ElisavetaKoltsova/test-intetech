import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

const BACKEND_URL = 'https://file-upload-server-mc26.onrender.com/';
const REQUEST_TIMEOUT = 1000000;

const StatusCodeMapping = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response) => !!StatusCodeMapping[response.status];

export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);

        console.log(detailMessage);
      }

      throw error;
    }
  );

  return api;
};