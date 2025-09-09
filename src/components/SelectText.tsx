import useLocalStorage from '../hooks/useLocalStorage' // Adjust path if necessary
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

const SelectText = () => {
    const [text, setText] = useLocalStorage('displayText', 'Your text here')
    const [xOffset, setXOffset] = useLocalStorage('offsetX', 0)
    const [yOffset, setYOffset] = useLocalStorage('offsetY', 0)
    const [fontSize, setFontSize] = useLocalStorage('fontSize', 48) // Default font size
    const [lineHeight, setLineHeight] = useLocalStorage('lineHeight', 1.5) // Default line height
    const [textAlign, setTextAlign] = useLocalStorage('textAlign', 'center') // Default alignment

    return (
        <div className="z-50 flex flex-col gap-4 rounded-md bg-black/50 p-4">
            <label className="text-white">
                Text:
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="ml-2 resize-y rounded border-none p-2"
                    rows={3}
                ></textarea>
            </label>
            <label className="text-white">
                X Position Offset:
                <input
                    type="number"
                    value={xOffset}
                    onChange={(e) => setXOffset(Number(e.target.value))}
                    className="ml-2 w-20 rounded border-none p-2"
                />
                <span>px</span>
            </label>
            <label className="text-white">
                Y Position Offset:
                <input
                    type="number"
                    value={yOffset}
                    onChange={(e) => setYOffset(Number(e.target.value))}
                    className="ml-2 w-20 rounded border-none p-2"
                />
                <span>px</span>
            </label>
            <label className="text-white">
                Font Size:
                <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="ml-2 w-20 rounded border-none p-2"
                />
                <span>px</span>
            </label>
            <label className="text-white">
                Line Height:
                <input
                    type="number"
                    step="0.1"
                    value={lineHeight}
                    onChange={(e) => setLineHeight(Number(e.target.value))}
                    className="ml-2 w-20 rounded border-none p-2"
                />
            </label>
            <label className="text-white">
                Text Align:
                <div className="ml-2 flex gap-2">
                    <button
                        onClick={() => setTextAlign('left')}
                        className={`rounded p-2 ${textAlign === 'left' ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
                    >
                        <AlignLeft size={20} />
                    </button>
                    <button
                        onClick={() => setTextAlign('center')}
                        className={`rounded p-2 ${textAlign === 'center' ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
                    >
                        <AlignCenter size={20} />
                    </button>
                    <button
                        onClick={() => setTextAlign('right')}
                        className={`rounded p-2 ${textAlign === 'right' ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
                    >
                        <AlignRight size={20} />
                    </button>
                </div>
            </label>
        </div>
    )
}

export default SelectText
