import FloatingButtons from './components/FloatingButtons'
import './App.css'
import useLocalStorage from './hooks/useLocalStorage.ts'
import { BACKGROUNDS } from './constants/backgrounds.tsx'

function App() {
    const [bg, setBg] = useLocalStorage('bg', 'prism')

    const ActiveBackground =
        BACKGROUNDS.find((b) => b.id === bg)?.component || null

    return (
        <div className="h-screen w-screen bg-gray-900">
            <div className={'h-full w-full'}>{ActiveBackground}</div>
            <FloatingButtons setBg={setBg} />
        </div>
    )
}

export default App
