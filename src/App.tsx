import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './App.css';
import { tracks } from './data/tracks';
import { PlayerDrawer } from './components/PlayerDrawer';
import SettingsDrawer from './components/SettingsDrawer';
import type { Track, BackgroundType } from './types';

const defaultBackground = { type: 'default' as BackgroundType, value: '' };

function App() {
  const [playlist, setPlaylist] = useState<Track[]>(() => {
    try {
      const savedPlaylist = localStorage.getItem('playlist');
      return savedPlaylist ? JSON.parse(savedPlaylist) : tracks;
    } catch (error) {
      console.error("Error parsing playlist from local storage:", error);
      return tracks;
    }
  });

  const [background, setBackground] = useState<{type: BackgroundType, value: string}>(() => {
    try {
      const savedBackground = localStorage.getItem('background');
      return savedBackground ? JSON.parse(savedBackground) : defaultBackground;
    } catch (error) {
      console.error("Error parsing background from local storage:", error);
      return defaultBackground;
    }
  });

  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = currentTrackIndex !== null ? playlist[currentTrackIndex] : null;
  const useVideoAsAudio = currentTrack?.audioSrc === null;

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  useEffect(() => {
    localStorage.setItem('background', JSON.stringify(background));
  }, [background]);

  useEffect(() => {
    if (audioRef.current) {
      if (useVideoAsAudio) {
        audioRef.current.pause();
        return;
      }
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, useVideoAsAudio]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleSelectTrack = (id: number) => {
    const trackIndex = playlist.findIndex(t => t.id === id);
    if (trackIndex !== -1) {
      setCurrentTrackIndex(trackIndex);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    if (currentTrackIndex === null && playlist.length > 0) {
      setCurrentTrackIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextTrack = () => {
    if (currentTrackIndex !== null) {
      const nextIndex = (currentTrackIndex + 1) % playlist.length;
      setCurrentTrackIndex(nextIndex);
      setIsPlaying(true);
    }
  };

  const handlePrevTrack = () => {
    if (currentTrackIndex !== null) {
      const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
      setCurrentTrackIndex(prevIndex);
      setIsPlaying(true);
    }
  };

  const handleTrackEnd = () => {
    handleNextTrack();
  };

  const handleAddTrack = (track: Track) => {
    setPlaylist(prev => [...prev, track]);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }; 
  
  const handleBackgroundChange = (type: BackgroundType, value: string) => {
    setBackground({ type, value });
  };

  const renderBackground = () => {
    switch (background.type) {
      case 'image':
        return <div className="visualizer-bg" style={{ backgroundImage: `url(${background.value})` }}></div>;
      case 'video':
        if (currentTrack?.videoUrl) {
          const isMuted = !useVideoAsAudio;
          return (
            <div className="visualizer-bg video-bg">
              <ReactPlayer
                url={currentTrack.videoUrl}
                playing={isPlaying}
                width="100%"
                height="100%"
                volume={isMuted ? 0 : 1}
                muted={isMuted}
                onEnded={handleTrackEnd}
                loop={false}
                config={{
                  youtube: {
                    playerVars: { showinfo: 0, controls: 0, modestbranding: 1 }
                  }
                }}
              />
            </div>
          );
        }
        return <div className="visualizer-bg"></div>;
      case 'default':
      default:
        return <div className="visualizer-bg"></div>;
    }
  };

  return (
    <div className={`App ${isFullscreen ? 'fullscreen' : ''}`}>
      <SettingsDrawer 
        onAddTrack={handleAddTrack}
        onBackgroundChange={handleBackgroundChange}
      />

      <PlayerDrawer 
        playlist={playlist}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTrackSelect={handleSelectTrack}
        onPlayPause={handlePlayPause}
        onNext={handleNextTrack}
        onPrev={handlePrevTrack}
        onToggleFullscreen={handleToggleFullscreen}
      />

      <audio
        ref={audioRef}
        src={currentTrack?.audioSrc || ''}
        onEnded={handleTrackEnd}
        crossOrigin="anonymous"
      />
      
      {renderBackground()}
    </div>
  );
}

export default App;