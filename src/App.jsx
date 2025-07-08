// src/App.jsx - UPDATED VERSION
import { useState } from 'react';
import Header from './components/Header';
import AudioRecorder from './components/AudioRecorder';
import FileUploader from './components/FileUploader';
import HistoryList from './components/HistoryList';
import LoadingSpinner from './components/LoadingSpinner';
import { uploadAudio } from './services/api';

function App() {
  const [isUploading, setIsUploading] = useState(false);
  const [transcriptionResult, setTranscriptionResult] = useState(null);
  const [error, setError] = useState(null);
  const [refreshHistory, setRefreshHistory] = useState(0);

  const handleFileProcess = async (file) => {
    try {
      setIsUploading(true);
      setError(null);
      setTranscriptionResult(null);
      
      console.log('Processing file:', file.name);
      const result = await uploadAudio(file);
      console.log('Transcription result:', result);
      
      setTranscriptionResult(result.data);
      
      // Refresh the history list
      setRefreshHistory(prev => prev + 1);
    } catch (err) {
      console.error('Error processing file:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Failed to process audio. Please try again.';
      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            <p>{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Dismiss
            </button>
          </div>
        )}
        
        {transcriptionResult && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Transcription Complete!</h3>
            <p className="mb-2">{transcriptionResult.transcription_text}</p>
            <button 
              onClick={() => setTranscriptionResult(null)}
              className="text-sm text-green-600 hover:text-green-800 underline"
            >
              Dismiss
            </button>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-6">
          <AudioRecorder onRecordingComplete={handleFileProcess} />
          <FileUploader onFileSelect={handleFileProcess} />
        </div>
        
        {isUploading && (
          <div className="mt-6">
            <LoadingSpinner text="Processing audio, please wait..." />
          </div>
        )}
        
        <HistoryList refreshTrigger={refreshHistory} />
      </main>
      
      <footer className="bg-gray-800 text-white py-4 text-center mt-auto">
        <p>Speech to Text Converter &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
