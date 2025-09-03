import React, {useState} from 'react';
import type { Track } from '../types';

interface YouTubeSearchProps {
  onAddTrack: (track: Track) => void;
}

const YouTubeSearch: React.FC<YouTubeSearchProps> = ({ onAddTrack }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleAddUrl = () => {
    setError('');
    if (!url) {
      setError('Please enter a YouTube URL.');
      return;
    }

    // Basic frontend validation
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
        setError('Please enter a valid YouTube video URL.');
        return;
    }

    const newTrack: Track = {
      id: Date.now(),
      title: 'YouTube Track', // Placeholder title
      artist: 'From URL',   // Placeholder artist
      videoUrl: url,
      audioSrc: null, // This track will use video audio
    };

    onAddTrack(newTrack);
    setUrl(''); // Clear input on success
  };

  return (
    <div className="youtube-search">
      <h3>Add from YouTube URL</h3>
      <div className="search-input-group">
        <input
          type="text"
          placeholder="Paste YouTube video link..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddUrl()}
        />
        <button onClick={handleAddUrl}>
          Add Track
        </button>
      </div>
      {error && <p className="error-message" style={{color: 'red', fontSize: '0.9em'}}>{error}</p>}
    </div>
  );
};

export default YouTubeSearch;