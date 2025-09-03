import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Music, Monitor } from 'lucide-react';
import DrawerButton from './DrawerButton';

const FloatingButtons: React.FC = () => {
  const [showButtons, setShowButtons] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseMove = useCallback(() => {
    setShowButtons(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => setShowButtons(false), 1000);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <div
      className={`fixed bottom-5 right-5 flex flex-col gap-2 opacity-0 transition-opacity duration-300 ease-in-out ${
        showButtons ? "opacity-100" : "opacity-0"
      }`}
    >
      <DrawerButton
        icon={<Music color="white" size={24} />}
        drawerContent={<div>Music Drawer Content</div>} // Placeholder for music drawer content
      />
      <DrawerButton
        icon={<Monitor color="white" size={24} />}
        drawerContent={<div>Monitor Drawer Content</div>} // Placeholder for monitor drawer content
      />
    </div>
  );
};

export default FloatingButtons;
