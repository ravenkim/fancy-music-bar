import FloatingButtons from './components/FloatingButtons';

import './App.css'
import Prism from "./bg/Prism.tsx";

function App() {





    return (
        <div className="w-screen h-screen bg-gray-900">
            <div
                className={'w-full h-full '}
            >




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
            </div>


            <FloatingButtons />
        </div>
    )
}

export default App
