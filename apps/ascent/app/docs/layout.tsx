
import Link from 'next/link';
import React from 'react'
import scanDirectory from './utils/scanDirectory';
import path from 'path';
import Sidebar from '../components/Sidebar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen w-screen">
      <nav className="h-[var(--navbar-height)] flex items-center px-4">
        <Link href="/">Blend Docs</Link>
      </nav>
      <div className="w-screen h-[calc(100vh-var(--navbar-height))] flex">
        <aside className="w-[240px] h-[calc(100vh-var(--navbar-height))] overflow-y-auto ">
          <Sidebar
            items={scanDirectory(
              path.join(process.cwd(), "app", "docs", "content")
            )}
          />
        </aside>
        <div className="flex-1 h-[calc(100vh-var(--navbar-height))] overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
};

export default layout