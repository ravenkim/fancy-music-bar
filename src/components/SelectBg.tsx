
import React, { type Dispatch, type SetStateAction } from 'react'
import { ScrollArea } from './ScrollArea.tsx'
import Prism from "../bg/Prism.tsx";
import Hyperspeed from "../bg/hyperspeed/Hyperspeed.tsx";
import {hyperspeedPresets} from "../bg/hyperspeed/hyperspeedPresets.ts";

interface SelectBgProps {
    setBg: Dispatch<SetStateAction<string>>
}

const backgrounds = [
    { id: 'off', name: 'Off' },
    { id: 'prism', name: 'Prism' },
    { id: 'hyperspeed', name: 'Hyperspeed' },
]

const BgPreview: React.FC<{ bgId: string }> = ({ bgId }) => {
    switch (bgId) {
        case 'prism':
            return (
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
                />            )
        case 'hyperspeed':
            return (
                <div className="relative h-full w-full overflow-hidden bg-black">
                    <Hyperspeed effectOptions={hyperspeedPresets.one} />
                </div>
            )
        default:
            return <div className="h-full w-full bg-gray-900" />
    }
}

const SelectBg: React.FC<SelectBgProps> = ({ setBg }) => {
    return (
        <div className="h-full w-full p-4">
            <ScrollArea className="h-full w-full">
                <div className="grid grid-cols-2 gap-4">
                    {backgrounds.map((bg) => (
                        <div
                            key={bg.id}
                            onClick={() => setBg(bg.id)}
                            className="group cursor-pointer overflow-hidden rounded-lg border-2 border-transparent transition-all hover:border-blue-500"
                        >
                            <div className="h-24 w-full">
                                <BgPreview bgId={bg.id} />
                            </div>
                            <div className="bg-gray-800 p-2 text-center text-sm text-white transition-all group-hover:bg-blue-500">
                                {bg.name}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default SelectBg
