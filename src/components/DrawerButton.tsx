import React from 'react';
import { Drawer } from 'vaul';

interface DrawerButtonProps {
  icon: React.ReactNode;
  drawerContent: React.ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}

const DrawerButton: React.FC<DrawerButtonProps> = ({ icon, drawerContent, direction = 'left' }) => {
  return (
    <Drawer.Root direction={direction}>
      <Drawer.Trigger asChild>
        <button className="bg-gray-800 rounded-full w-14 h-14 flex justify-center items-center shadow-md">
          {icon}
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-900 w-80 h-full fixed bottom-0 top-0 left-0 outline-none">
          {drawerContent}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default DrawerButton;
