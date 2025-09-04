import {ScrollArea} from "./ScrollArea.tsx";

const SelectBg = () => {
    return (

        <div className="h-full w-full bg-amber-700">

            <ScrollArea
                className={'w-full h-200 overflow-auto bg-amber-700'}
            >
                {/*<div className="h-400 w-fullbg-amber-100"></div>*/}


            </ScrollArea>
        </div>


    )
}

export default SelectBg
