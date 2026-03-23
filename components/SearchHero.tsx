"use client";

import React, { useState, useEffect } from "react";
// Import the profile component we'll define below
import ConsultantProfileModal from "./ConsultantProfileModal";

export default function SearchHero() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<(string | number | null)[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // State for the modal
  const [selectedExpertId, setSelectedExpertId] = useState<string | null>(null);

  useEffect(() => {
    const load_data = async () => {
      try {
        const raw_sheet = await fetch("/api/sheet");
        const clean_sheet = await raw_sheet.json();
        setData(clean_sheet);
      } catch (error) {
        console.error("Failed to load expert data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    load_data();
  }, []);

  const filtered = data.filter((rows, index) => {
    if (index === 0) return false;
    return rows?.some((cell) =>
      cell?.toString().toLowerCase().includes(query.toLowerCase()),
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 items-center p-6 md:p-10 font-helvetica">
      {/* Modal Overlay */}
      {selectedExpertId && (
        <ConsultantProfileModal
          id={selectedExpertId}
          onClose={() => setSelectedExpertId(null)}
        />
      )}

      {/* Institutional Header Section */}
      <div className="w-full max-w-4xl mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight mb-3">
          LGA Expert <span className="text-amber-600">Repository</span>
        </h1>
        <p className="text-slate-500 font-medium mb-8">
          Integrated Knowledge Management & Capacity Development Directory
        </p>

        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search by name, expertise, or division..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-4 pl-12 rounded-xl border border-slate-200 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none shadow-sm transition-all bg-white text-slate-800"
          />
          <span className="absolute left-4 top-4 text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl">
        {isLoading ? (
          <div className="col-span-full text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-slate-500 text-sm font-medium uppercase tracking-widest">
              Loading Experts...
            </p>
          </div>
        ) : filtered.length > 0 ? (
          filtered.map((expert, i) => (
            <button
              key={i}
              onClick={() => setSelectedExpertId(String(expert[0]))}
              className="group text-left w-full"
            >
              <div className="flex w-full bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden group-hover:shadow-md group-hover:border-amber-200 transition-all h-full cursor-pointer">
                {/* Left Sidebar (Avatar) */}
                <div className="w-1/3 bg-slate-50 flex flex-col pt-6 items-center border-r border-slate-100 ">
                  <div className="relative">
                    <img
                      src={expert[4] || "https://via.placeholder.com/150"}
                      alt={String(expert[1])}
                      className="rounded-full object-cover h-24 w-24 border-4 border-white shadow-sm group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1 right-1 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                  </div>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Consultant ID
                  </p>
                  <p className="text-xs font-mono text-slate-600 mb-4">
                    #{expert[0]}
                  </p>
                </div>

                {/* Right Content */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                        {expert[1]}
                      </h3>
                      <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase">
                        Expert
                      </span>
                    </div>
                    <p className="text-amber-600 font-medium text-xs mt-0.5">
                      {expert[2]}
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {expert[3]
                          ?.toString()
                          .split(",")
                          .slice(0, 3)
                          .map((skill, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px]"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-amber-600 text-xs font-bold">
                    VIEW PROFILE
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-400 font-medium">
              No results found for "{query}"
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-4 text-amber-600 font-bold text-sm hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
