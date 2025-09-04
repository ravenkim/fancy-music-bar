import FloatingButtons from './components/FloatingButtons'

import './App.css'
import Prism from './bg/Prism.tsx'
import Hyperspeed from './bg/hyperspeed/Hyperspeed.tsx'
import { hyperspeedPresets } from './bg/hyperspeed/hyperspeedPresets.ts'

function App() {
    return (
        <div className="h-screen w-screen bg-gray-900">
            <div className={'h-full w-full'}>
                {/*<Prism*/}
                {/*    animationType="rotate"*/}
                {/*    timeScale={0.5}*/}
                {/*    height={8}*/}
                {/*    baseWidth={8}*/}
                {/*    scale={2}*/}
                {/*    hueShift={0}*/}
                {/*    colorFrequency={1}*/}
                {/*    noise={0}*/}
                {/*    glow={1}*/}
                {/*/>*/}

                <Hyperspeed effectOptions={hyperspeedPresets.one} />
            </div>

            <FloatingButtons />
        </div>
    )
}

export default App
