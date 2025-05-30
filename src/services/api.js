import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://speech-to-text-backend-fheu.onrender.com';

// Create axios instance without global multipart headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadAudio = async (file) => {
  const formData = new FormData();
  formData.append('audio', file);
  
  try {
    // Use /api/transcriptions/upload to match backend route
    const response = await api.post('/api/transcriptions/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Only for this request
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading audio:', error);
    throw error;
  }
};

export const getTranscriptions = async () => {
  try {
    // Use /api/transcriptions to match backend route
    const response = await api.get('/api/transcriptions');
    return response.data;
  } catch (error) {
    console.error('Error fetching transcriptions:', error);
    throw error;
  }
};

export const deleteTranscription = async (id) => {
  try {
    // Use /api/transcriptions/${id} to match backend route
    const response = await api.delete(`/api/transcriptions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting transcription:', error);
    throw error;
  }
};
