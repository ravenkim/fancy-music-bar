import React from 'react';
import type { Track } from '../types';

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
