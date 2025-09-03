import React from 'react';

type BackgroundType = 'default' | 'image' | 'video';

interface BackgroundOptionsProps {
  onBackgroundChange: (type: BackgroundType, value: string) => void;
}

const imageOptions = [
  { name: 'Galaxy', value: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2093&auto=format&fit=crop' },
  { name: 'Mountain', value: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Forest', value: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop' },
];

const BackgroundOptions: React.FC<BackgroundOptionsProps> = ({ onBackgroundChange }) => {
  return (
    <div className="background-options">
      <h3>Background Options</h3>
      <div className="option-group">
        <button onClick={() => onBackgroundChange('default', '')}>Default</button>
        <button onClick={() => onBackgroundChange('video', '')}>YouTube Video</button>
      </div>
      <div className="image-options">
        {imageOptions.map(img => (
          <div 
            key={img.name} 
            className="image-option"
            style={{ backgroundImage: `url(${img.value})` }}
            onClick={() => onBackgroundChange('image', img.value)}
          >
            <span>{img.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundOptions;