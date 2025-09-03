import React from 'react';

// Define type locally for debugging
type Track = {
  id: number;
  title: string;
  artist: string;
  audioSrc: string | null;
  videoUrl: string;
}

interface NowPlayingProps {
  track: Track | null;
}

const NowPlaying: React.FC<NowPlayingProps> = ({ track }) => {
  if (!track) {
    return <div className="now-playing">Select a song to play</div>;
  }

  return (
    <div className="now-playing">
      <h2>{track.title}</h2>
      <p>{track.artist}</p>
    </div>
  );
};

export default NowPlaying;
