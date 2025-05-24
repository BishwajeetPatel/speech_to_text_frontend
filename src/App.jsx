// src/App.jsx
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
      
      const result = await uploadAudio(file);
      setTranscriptionResult(result.data);
      
      // Refresh the history list
      setRefreshHistory(prev => prev + 1);
    } catch (err) {
      console.error('Error processing file:', err);
      setError('Failed to process audio. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}
        
        {transcriptionResult && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Transcription Complete!</h3>
            <p>{transcriptionResult.transcription_text}</p>
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