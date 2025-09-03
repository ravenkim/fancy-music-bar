import {useEffect, useState} from 'react'
import { Music, Monitor } from 'lucide-react';

import './App.css'

function App() {
    const [showButtons, setShowButtons] = useState(false);
    let timeout: number;

    const handleMouseMove = () => {
        setShowButtons(true);
        clearTimeout(timeout);
        timeout = setTimeout(() => setShowButtons(false), 2000);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timeout);
        };
    }, []);

  return (
      <div className="w-screen h-screen bg-gray-900">
          <div
              className={`fixed bottom-5 right-5 flex flex-col gap-2 opacity-0 transition-opacity duration-300 ease-in-out ${
                  showButtons ? "opacity-100" : "opacity-0"
              }`}
          >
              <button className="bg-gray-800 rounded-full w-14 h-14 flex justify-center items-center shadow-md">
                  <Music color="white" size={24} />
              </button>

              <button className="bg-gray-800 rounded-full w-14 h-14 flex justify-center items-center shadow-md">
                  <Monitor color="white" size={24} />
              </button>
          </div>
      </div>
  )
}

export default App
