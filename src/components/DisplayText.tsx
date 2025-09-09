import { useEffect, useRef, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage' // Adjust path as needed

const DisplayText = () => {
    // Retrieve text properties from local storage
    const [displayText] = useLocalStorage('displayText', 'Your text here')
    const [offsetX] = useLocalStorage('offsetX', 0)
    const [offsetY] = useLocalStorage('offsetY', 0)
    const [fontSize] = useLocalStorage('fontSize', 48)
    const [lineHeight] = useLocalStorage('lineHeight', 1.5)
    const [textAlign] = useLocalStorage('textAlign', 'center')

    const textRef = useRef<HTMLDivElement>(null)
    const [centerX, setCenterX] = useState(0)
    const [centerY, setCenterY] = useState(0)

    useEffect(() => {
        const updateCenter = () => {
            if (textRef.current) {
                const rect = textRef.current.getBoundingClientRect()
                setCenterX(window.innerWidth / 2 - rect.width / 2)
                setCenterY(window.innerHeight / 2 - rect.height / 2)
            }
        }

        updateCenter()
        window.addEventListener('resize', updateCenter)
        return () => window.removeEventListener('resize', updateCenter)
    }, [displayText, fontSize, lineHeight, textAlign]) // Recalculate when text or font size changes

    return (
        <div
            ref={textRef}
            style={{
                position: 'absolute',
                left: `${centerX + offsetX}px`,
                top: `${centerY + offsetY}px`,
                fontSize: `${fontSize}px`,
                lineHeight: `${lineHeight}`,
                textAlign: `${textAlign}`,
                color: 'white', // Assuming a dark background, make text white
                whiteSpace: 'pre-wrap', // Preserve whitespace and newlines, and wrap text
                pointerEvents: 'none', // Allow clicks to pass through to elements below
                zIndex: 999, // Ensure text is above background but below controls
            }}
        >
            {displayText}
        </div>
    )
}

export default DisplayText
