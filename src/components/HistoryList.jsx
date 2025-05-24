// src/components/HistoryList.jsx
import { useState, useEffect } from 'react';
import { getTranscriptions, deleteTranscription } from '../services/api';
import TranscriptionItem from './TranscriptionItem';
import LoadingSpinner from './LoadingSpinner';

const HistoryList = ({ refreshTrigger }) => {
  const [transcriptions, setTranscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTranscriptions = async () => {
      try {
        setIsLoading(true);
        const response = await getTranscriptions();
        setTranscriptions(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching transcriptions:', err);
        setError('Failed to load transcription history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranscriptions();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    try {
      await deleteTranscription(id);
      setTranscriptions(transcriptions.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting transcription:', err);
      alert('Failed to delete transcription');
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading transcription history..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mt-4">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-blue-500 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (transcriptions.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg text-center mt-4">
        <p className="text-gray-500">No transcriptions yet. Upload an audio file or record to get started.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Transcription History</h2>
      <div>
        {transcriptions.map((item) => (
          <TranscriptionItem 
            key={item.id} 
            transcription={item} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryList;