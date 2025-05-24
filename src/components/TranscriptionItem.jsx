// src/components/TranscriptionItem.jsx
import { useState } from 'react';

const TranscriptionItem = ({ transcription, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this transcription?')) {
      setIsDeleting(true);
      await onDelete(transcription.id);
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Truncate text if it's too long
  const truncatedText = transcription.transcription_text.length > 100 && !isExpanded
    ? `${transcription.transcription_text.substring(0, 100)}...`
    : transcription.transcription_text;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-lg text-gray-800">
          {transcription.original_filename}
        </h3>
        <span className="text-sm text-gray-500">
          {formatDate(transcription.created_at)}
        </span>
      </div>
      
      <div className="text-gray-700 mb-3">
        {truncatedText}
        {transcription.transcription_text.length > 100 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-700 ml-2 text-sm"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={() => {
            navigator.clipboard.writeText(transcription.transcription_text);
            alert('Transcription copied to clipboard!');
          }}
          className="text-blue-500 hover:text-blue-700 mr-4"
        >
          Copy
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-500 hover:text-red-700"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default TranscriptionItem;