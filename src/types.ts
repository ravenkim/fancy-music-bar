export type Track = {
  id: number;
  title: string;
  artist: string;
  audioSrc: string | null;
  videoUrl: string;
}

export type BackgroundType = 'default' | 'image' | 'video';
