import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  // Music,
  Monitor,
  Fullscreen } from 'lucide-react';
import DrawerButton from './DrawerButton';
import SelectBg from "./SelectBg.tsx";

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

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.error(`Error attempting to exit full-screen mode: ${err.message}`);
        });
      }
    }
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 flex flex-col gap-2 opacity-0 transition-opacity duration-300 ease-in-out ${
        showButtons ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        onClick={toggleFullscreen}
        className="bg-gray-800 rounded-full w-14 h-14 flex justify-center items-center shadow-md">
        <Fullscreen color="white" size={24} />
      </button>

      {/*추후 음악 기능 업데이트 */}
      {/*<DrawerButton*/}
      {/*  icon={<Music color="white" size={24} />}*/}
      {/*  drawerContent={<div>Music Drawer Content</div>}*/}
      {/*/>*/}
      <DrawerButton
        icon={<Monitor color="white" size={24} />}
        drawerContent={<SelectBg/>}
      />
    </div>
  );
};

export default FloatingButtons;
