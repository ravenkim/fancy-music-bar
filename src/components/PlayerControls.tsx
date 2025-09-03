import React from 'react';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onToggleFullscreen: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({ isPlaying, onPlayPause, onNext, onPrev, onToggleFullscreen }) => {
  return (
    <div className="player-controls">
      <button onClick={onPrev}>Prev</button>
      <button onClick={onPlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button onClick={onNext}>Next</button>
      <button onClick={onToggleFullscreen}>Fullscreen</button>
    </div>
  );
};

export default PlayerControls;
