"use client";

import { AlignLeft } from "lucide-react";
import React, { useEffect, useState } from "react";

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  isMobile?: boolean;
}

export default function TableOfContents({
  items,
  isMobile = false,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0,
      }
    );

    // Observe all heading elements
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="w-64">
      {!isMobile && (
        <div className="flex items-center gap-2 mb-4 px-2">
          <AlignLeft size={16} /> <p className="text-sm">On this page</p>
        </div>
      )}
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`text-left w-full px-2 py-1.5 rounded text-sm transition-colors`}
              style={{
                paddingLeft: `${(item.level - 1) * 16 + 8}px`,
              }}
            >
              <p className={`${activeId === item.id ? "text-gray-900" : "text-gray-700"} font-medium`}>
                {item.text}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}



// ${
//                 activeId === item.id
//                   ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
//                   : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
//               }