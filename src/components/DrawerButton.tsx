import React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from './Drawer.tsx'

interface DrawerButtonProps {
    icon: React.ReactNode
    drawerContent: React.ReactNode
    direction?: 'left' | 'right' | 'top' | 'bottom'
}

const DrawerButton: React.FC<DrawerButtonProps> = ({
    icon,
    drawerContent,
    direction = 'left',
}) => {
    return (
        <Drawer direction={direction}>
            <DrawerTrigger asChild>
                <button className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 shadow-md">
                    {icon}
                </button>
            </DrawerTrigger>
            <DrawerContent className={'w-200'}>
                <DrawerHeader>
                    <DrawerTitle className={'text-white'}>
                        배경 선택
                    </DrawerTitle>
                    <DrawerDescription className={'text-white'}>
                        원하는 배경을 골라주세요
                    </DrawerDescription>
                </DrawerHeader>
                {drawerContent}
            </DrawerContent>
        </Drawer>

        // <Drawer.Root direction={direction}>

        //     <Drawer.Portal>
        //         <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        //
        //
        //         <Drawer.Content className="fixed top-0 bottom-0 left-0 h-full w-80 bg-gray-900 outline-none">
        //             <Drawer.Title>
        //
        //             </Drawer.Title>
        //             <Drawer.Description/>
        //
        //         </Drawer.Content>
        //     </Drawer.Portal>
        // </Drawer.Root>
    )
}

export default DrawerButton
