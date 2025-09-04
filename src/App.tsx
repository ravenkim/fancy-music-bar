import { useState, useEffect } from 'react'
import FloatingButtons from './components/FloatingButtons'

import './App.css'
// import Prism from './bg/Prism.tsx'
// import Hyperspeed from './bg/hyperspeed/Hyperspeed.tsx'
// import { hyperspeedPresets } from './bg/hyperspeed/hyperspeedPresets.ts'

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false)

    // Restore this useEffect, but keep it commented out for now
    // useEffect(() => {
    //     const rootElement = document.getElementById('root')
    //     if (rootElement) {
    //         if (drawerOpen) {
    //             rootElement.setAttribute('inert', 'true')
    //         } else {
    //             rootElement.removeAttribute('inert')
    //         }
    //     }
    // }, [drawerOpen])

    return (
        <div className="h-screen w-screen bg-gray-900">
            <div className={'h-full w-full'}>
                {/*<Prism
                    animationType="rotate"
                    timeScale={0.5}
                    height={8}
                    baseWidth={8}
                    scale={2}
                    hueShift={0}
                    colorFrequency={1}
                    noise={0}
                    glow={1}
                />*/}

                {/*<Hyperspeed effectOptions={hyperspeedPresets.one} />*/}
            </div>

            {/* Pass onDrawerOpenChange again, with console.log for debugging */}
            <FloatingButtons onDrawerOpenChange={(open) => {
                console.log('Drawer open state changed:', open);
                setDrawerOpen(open);
            }} />
        </div>
    )
}

export default App