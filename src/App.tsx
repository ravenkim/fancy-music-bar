import React, {useEffect, useRef, useState} from 'react';
import ReactPlayer from 'react-player';
import './App.css';
import {tracks} from './data/tracks';
import Playlist from './components/Playlist';
import PlayerControls from './components/PlayerControls';
import NowPlaying from './components/NowPlaying';
import SettingsButton from './components/SettingsButton';
import SettingsDrawer from './components/SettingsDrawer';
// Define types locally for debugging
type BackgroundType = 'default' | 'image' | 'video';
type Track = {
  id: number;
  title: string;
  artist: string;
  audioSrc: string | null;
  videoUrl: string;
}

const defaultBackground = { type: 'default' as BackgroundType, value: '' };

function App() {
  // Load playlist from local storage or use default
  const [playlist, setPlaylist] = useState<Track[]>(() => {
    try {
      const savedPlaylist = localStorage.getItem('playlist');
      return savedPlaylist ? JSON.parse(savedPlaylist) : tracks;
    } catch (error) {
      console.error("Error parsing playlist from local storage:", error);
      return tracks;
    }
  });

  // Load background from local storage or use default
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettingsButton, setShowSettingsButton] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);
  const activityTimeoutRef = useRef<number | undefined>(undefined);

  const currentTrack = currentTrackIndex !== null ? playlist[currentTrackIndex] : null;
  const useVideoAsAudio = currentTrack?.audioSrc === null;

  // Save playlist to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  // Save background to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('background', JSON.stringify(background));
  }, [background]);

  // Audio play/pause logic
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

  // ... (The rest of the component remains the same)

  // Mouse activity logic for settings button
  useEffect(() => {
    const handleMouseMove = () => {
      setShowSettingsButton(true);
      clearTimeout(activityTimeoutRef.current);
      activityTimeoutRef.current = window.setTimeout(() => {
        setShowSettingsButton(false);
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    handleMouseMove(); // Show on initial load

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(activityTimeoutRef.current);
    };
  }, []);

  // Fullscreen change listener
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

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
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
      <SettingsButton onClick={handleToggleDrawer} show={showSettingsButton} />
      <SettingsDrawer 
        isOpen={isDrawerOpen} 
        onClose={handleToggleDrawer} 
        onAddTrack={handleAddTrack}
        onBackgroundChange={handleBackgroundChange}
      />

      <div className="music-player">
        <NowPlaying track={currentTrack} />
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNextTrack}
          onPrev={handlePrevTrack}
          onToggleFullscreen={handleToggleFullscreen}
        />
        <Playlist
          tracks={playlist}
          currentTrackId={currentTrack?.id || null}
          onTrackSelect={handleSelectTrack}
        />
        <audio
          ref={audioRef}
          src={currentTrack?.audioSrc || ''}
          onEnded={handleTrackEnd}
          crossOrigin="anonymous"
        />
      </div>
      
      {renderBackground()}
    </div>
  );
}

export default App;
