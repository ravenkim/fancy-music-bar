import FloatingButtons from './components/FloatingButtons'

import './App.css'
import Prism from './bg/Prism.tsx'
import Hyperspeed from './bg/hyperspeed/Hyperspeed.tsx'
import { hyperspeedPresets } from './bg/hyperspeed/hyperspeedPresets.ts'
import { useState } from 'react'
import Silk from "./bg/Silk.tsx";

function App() {
    const [bg, setBg] = useState('prism')

    return (
        <div className="h-screen w-screen bg-gray-900">
            <div className={'h-full w-full'}>
                {bg === 'prism' && (
                    <Prism
                        animationType="rotate"
                        timeScale={0.5}
                        height={8}
                        baseWidth={8}
                        scale={2}
                        hueShift={0}
                        colorFrequency={1}
                        noise={0}
                        glow={1}
                    />
                )}

                {bg === 'hyperspeed' && (
                    <Hyperspeed effectOptions={hyperspeedPresets.one} />
                )}

                {bg === 'silk' && (
                    <Silk
                        speed={5}
                        scale={1}
                        color="#7B7481"
                        noiseIntensity={1.5}
                        rotation={0}
                    />                )}
            </div>

            <FloatingButtons setBg={setBg} />
        </div>
    )
}

export default App
