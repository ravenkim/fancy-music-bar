import React from 'react';

// Define type locally for debugging
type Track = {
  id: number;
  title: string;
  artist: string;
  audioSrc: string | null;
  videoUrl: string;
}

interface PlaylistProps {
  tracks: Track[];
  currentTrackId: number | null;
  onTrackSelect: (id: number) => void;
}

const Playlist: React.FC<PlaylistProps> = ({ tracks, currentTrackId, onTrackSelect }) => {
  return (
    <div className="playlist">
      <ul>
        {tracks.map((track) => (
          <li
            key={track.id}
            className={track.id === currentTrackId ? 'active' : ''}
            onClick={() => onTrackSelect(track.id)}
          >
            <span className="track-title">{track.title}</span>
            <span className="track-artist">{track.artist}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
