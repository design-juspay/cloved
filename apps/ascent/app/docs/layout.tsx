import Link from "next/link";
import React from "react";
import Sidebar from "../components/Sidebar";
import getDirItems from "./utils/getDirItems";
import SidebarDrawer from "../components/SidebarDrawer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen w-screen">
      <nav className="h-[var(--navbar-height)] flex items-center px-4">
        <div className="flex items-center gap-2">
          <div className="sidebar-drawer-trigger">
            <SidebarDrawer />
          </div>
          <Link href="/" className="pl-2">
            Blend Docs
          </Link>
        </div>
      </nav>
      <div className="w-screen h-[calc(100vh-var(--navbar-height))] flex">
        <aside className="doc-sidebar w-[240px] h-[calc(100vh-var(--navbar-height))] overflow-y-auto ">
          <Sidebar items={getDirItems("app/docs/content")} />
        </aside>
        <div className="flex-1 h-[calc(100vh-var(--navbar-height))] overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
};

export default layout;
