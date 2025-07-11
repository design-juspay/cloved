"use client";

import { Menu } from "lucide-react";
import { Drawer } from "vaul";

const SidebarDrawer = () => {
  return (
    <Drawer.Root direction="left">
      <Drawer.Trigger asChild className="size-8 flex items-center justify-center">
        <Menu size={14} />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="left-2 top-2 bottom-2 fixed z-10 outline-none w-[310px] flex"
        >
          <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-2 text-zinc-900">
                It supports all directions.
              </Drawer.Title>
              <Drawer.Description className="text-zinc-600 mb-2">
                This one specifically is not touching the edge of the screen,
                but that&apos;s not required for a side drawer.
              </Drawer.Description>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};


export default SidebarDrawer;