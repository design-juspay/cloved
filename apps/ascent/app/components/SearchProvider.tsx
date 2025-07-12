"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { SearchResult } from "../docs/utils/searchContent";

const SearchProvider: React.FC = () => {
  const [searchIndex, setSearchIndex] = useState<{ [key: string]: SearchResult }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchIndex = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/search");
        
        if (!response.ok) {
          throw new Error("Failed to fetch search index");
        }
        
        const data = await response.json();
        setSearchIndex(data);
      } catch (err) {
        console.error("Error fetching search index:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchIndex();
  }, []);

  if (isLoading) {
    return (
      <div className="relative max-w-md">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
          </div>
          <input
            type="text"
            placeholder="Loading search..."
            disabled
            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-500"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search unavailable"
            disabled
            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-500"
          />
        </div>
      </div>
    );
  }

  return <SearchBar searchIndex={searchIndex} />;
};

export default SearchProvider; 