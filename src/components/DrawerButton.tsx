import React from 'react'
import { Drawer } from 'vaul'

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
        <Drawer.Root direction={direction}>
            <Drawer.Trigger asChild>
                <button className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 shadow-md">
                    {icon}
                </button>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />


                <Drawer.Content className="fixed top-0 bottom-0 left-0 h-full w-80 bg-gray-900 outline-none">
                    <Drawer.Title>

                    </Drawer.Title>
                    <Drawer.Description/>
                    {drawerContent}
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}

export default DrawerButton
