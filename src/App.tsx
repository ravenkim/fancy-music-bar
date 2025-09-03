import {useCallback, useEffect, useRef, useState} from 'react'
import {Music, Monitor} from 'lucide-react';
import {Drawer} from 'vaul';

import './App.css'

function App() {
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
        <div className="w-screen h-screen bg-gray-900">
            <div
                className={'w-full h-full '}
            >


            </div>

            <div
                className={`fixed bottom-5 right-5 flex flex-col gap-2 opacity-0 transition-opacity duration-300 ease-in-out ${
                    showButtons ? "opacity-100" : "opacity-0"
                }`}
            >


                <Drawer.Root direction={"left"}>
                    <Drawer.Trigger asChild>
                        <button
                            className="bg-gray-800 rounded-full w-14 h-14 flex justify-center items-center shadow-md">
                            <Music color="white" size={24}/>
                        </button>
                    </Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay className="fixed inset-0 bg-black/40"/>
                        <Drawer.Content

                            className="bg-gray-900 w-80 h-full fixed bottom-0 top-0 left-0 outline-none">

                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>


                <Drawer.Root direction={"left"}>
                    <Drawer.Trigger asChild>
                        <button
                            className="bg-gray-800 rounded-full w-14 h-14 flex justify-center items-center shadow-md">
                            <Monitor color="white" size={24}/>
                        </button>
                    </Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay className="fixed inset-0 bg-black/40"/>
                        <Drawer.Content

                            className="bg-gray-900 w-80 h-full fixed bottom-0 top-0 left-0 outline-none">

                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>

            </div>
        </div>
    )
}

export default App
