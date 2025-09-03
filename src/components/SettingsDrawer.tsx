import React from 'react';
import YouTubeSearch from './YouTubeSearch';
import BackgroundOptions from './BackgroundOptions';

// Define types locally for debugging
type BackgroundType = 'default' | 'image' | 'video';
type Track = {
  id: number;
  title: string;
  artist: string;
  audioSrc: string | null;
  videoUrl: string;
}

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTrack: (track: Track) => void;
  onBackgroundChange: (type: BackgroundType, value: string) => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ isOpen, onClose, onAddTrack, onBackgroundChange }) => {
  return (
    <>
      <div className={`drawer-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`settings-drawer ${isOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <YouTubeSearch onAddTrack={onAddTrack} />
        <hr />
        <BackgroundOptions onBackgroundChange={onBackgroundChange} />
      </div>
    </>
  );
};

export default SettingsDrawer;
