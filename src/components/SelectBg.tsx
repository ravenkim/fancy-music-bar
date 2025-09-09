import { ScrollArea } from './ScrollArea.tsx'
import React, { type Dispatch, type SetStateAction } from 'react'

interface SelectBgProps {
    setBg: Dispatch<SetStateAction<string>>
}

const SelectBg: React.FC<SelectBgProps> = ({ setBg }) => {
    return (
        <div className="h-full w-full bg-amber-700">
            <ScrollArea className={'h-200 w-full overflow-auto bg-amber-700'}>
                {/*<div className="h-400 w-fullbg-amber-100"></div>*/}

                <div onClick={() => setBg('prism')}></div>
            </ScrollArea>
        </div>
    )
}

export default SelectBg
