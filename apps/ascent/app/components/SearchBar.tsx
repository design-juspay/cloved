"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X, ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SearchResult } from "../docs/utils/searchContent";

interface SearchBarProps {
  searchIndex: { [key: string]: SearchResult };
}

const SearchBar: React.FC<SearchBarProps> = ({ searchIndex }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Helper function to get flattened results for keyboard navigation
  const getFlattenedResults = () => {
    const flattened: Array<{ type: 'page' | 'section'; result: SearchResult; section?: any; href: string }> = [];
    
    results.forEach(result => {
      // Add main page result
      flattened.push({
        type: 'page',
        result,
        href: `/docs/${result.path}`
      });
      
      // Add section results
      result.sections?.forEach(section => {
        const sectionMatches = query.toLowerCase().split(/\s+/).some(term =>
          section.title.toLowerCase().includes(term)
        );
        
        if (sectionMatches) {
          flattened.push({
            type: 'section',
            result,
            section,
            href: `/docs/${result.path}#${section.id}`
          });
        }
      });
    });
    
    return flattened;
  };

  // Search function
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simple client-side search implementation
    const searchTerms = searchQuery.toLowerCase().split(/\s+/);
    const searchResults: Array<SearchResult & { score: number }> = [];

    for (const [slug, result] of Object.entries(searchIndex)) {
      let score = 0;
      const searchableText = [
        result.title,
        result.description,
        result.content,
        ...(result.tags || []),
        ...(result.sections?.map(s => s.title) || [])
      ].join(' ').toLowerCase();

      for (const term of searchTerms) {
        // Title matches get highest score
        if (result.title.toLowerCase().includes(term)) {
          score += 10;
        }

        // Description matches get high score
        if (result.description?.toLowerCase().includes(term)) {
          score += 8;
        }

        // Section header matches get high score
        if (result.sections?.some(section => section.title.toLowerCase().includes(term))) {
          score += 7;
        }

        // Tag matches get medium score
        if (result.tags?.some(tag => tag.toLowerCase().includes(term))) {
          score += 6;
        }

        // Content matches get lower score
        if (searchableText.includes(term)) {
          score += 2;
        }
      }

      if (score > 0) {
        searchResults.push({ ...result, score });
      }
    }

    // Sort by score and limit results
    const sortedResults = searchResults
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ score, ...result }) => result);

    setResults(sortedResults);
    setIsSearching(false);
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const flattenedResults = getFlattenedResults();
    if (!isOpen || flattenedResults.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < flattenedResults.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev > 0 ? prev - 1 : flattenedResults.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (flattenedResults[selectedIndex]) {
          window.location.href = flattenedResults[selectedIndex].href;
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    setIsOpen(true);
    setSelectedIndex(0);
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          className="w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (query || isSearching) && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">
              Searching...
            </div>
          ) : results.length > 0 ? (
                        <div className="py-2">
              {results.map((result, resultIndex) => {
                const flattenedResults = getFlattenedResults();
                let currentIndex = resultIndex;
                
                return (
                  <div key={result.slug}>
                    {/* Main result */}
                    <Link
                      href={`/docs/${result.path}`}
                      onClick={handleResultClick}
                      className={`block px-4 py-3 hover:bg-gray-50 transition-colors ${
                        flattenedResults[currentIndex]?.type === 'page' && currentIndex === selectedIndex ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {result.title}
                          </div>
                          {result.description && (
                            <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {result.description}
                            </div>
                          )}
                          <div className="text-xs text-gray-400 mt-1">
                            {result.path}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          {flattenedResults[currentIndex]?.type === 'page' && currentIndex === selectedIndex && (
                            <>
                              <ArrowRight className="h-3 w-3" />
                              <span>Enter</span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                    
                    {/* Section matches */}
                    {result.sections?.map((section, sectionIndex) => {
                      const sectionMatches = query.toLowerCase().split(/\s+/).some(term =>
                        section.title.toLowerCase().includes(term)
                      );
                      
                      if (!sectionMatches) return null;
                      
                      currentIndex++; // Move to next flattened index
                      
                      return (
                        <Link
                          key={`${result.slug}-${section.id}`}
                          href={`/docs/${result.path}#${section.id}`}
                          onClick={handleResultClick}
                          className={`block px-4 py-2 hover:bg-gray-50 transition-colors border-l-2 border-gray-200 ml-4 ${
                            flattenedResults[currentIndex]?.type === 'section' && currentIndex === selectedIndex ? "bg-blue-50" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-gray-700 truncate">
                                {section.title}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Section in {result.title}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              {flattenedResults[currentIndex]?.type === 'section' && currentIndex === selectedIndex && (
                                <ArrowRight className="h-3 w-3" />
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ) : query ? (
            <div className="p-4 text-center text-gray-500">
              No results found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 