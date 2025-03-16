import { createAPI } from './api';

const api = createAPI();

export const uploadFile = async (file, name) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', name);

  try {
    const response = await api.post('/api/v1/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
    throw error;
  }
};
