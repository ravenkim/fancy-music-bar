import React from 'react';
import { Drawer } from 'vaul';
import type { Track } from '../types';
import NowPlaying from './NowPlaying';
import PlayerControls from './PlayerControls';
import Playlist from './Playlist';

interface PlayerDrawerProps {
  playlist: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (id: number) => void;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onToggleFullscreen: () => void;
}

export const PlayerDrawer: React.FC<PlayerDrawerProps> = (props) => {
  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger asChild>
        <button className="player-drawer-trigger">Show Playlist</button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <div className="max-w-md mx-auto">
              <NowPlaying track={props.currentTrack} />
              <PlayerControls
                isPlaying={props.isPlaying}
                onPlayPause={props.onPlayPause}
                onNext={props.onNext}
                onPrev={props.onPrev}
                onToggleFullscreen={props.onToggleFullscreen}
              />
              <Playlist
                tracks={props.playlist}
                currentTrackId={props.currentTrack?.id || null}
                onTrackSelect={props.onTrackSelect}
              />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
