import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://speech-to-text-backend-fheu.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const uploadAudio = async (file) => {
  const formData = new FormData();
  formData.append('audio', file);
  
  try {
    const response = await api.post('/transcriptions/upload', formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading audio:', error);
    throw error;
  }
};

export const getTranscriptions = async () => {
  try {
    const response = await api.get('/transcriptions');
    return response.data;
  } catch (error) {
    console.error('Error fetching transcriptions:', error);
    throw error;
  }
};

export const deleteTranscription = async (id) => {
  try {
    const response = await api.delete(`/transcriptions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting transcription:', error);
    throw error;
  }
};
