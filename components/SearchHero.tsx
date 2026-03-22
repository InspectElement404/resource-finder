"use client";

import React, { useState, useEffect } from "react";

export default function SearchHero() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<(string | number | null)[][]>([]);

  useEffect(() => {
    const load_data = async () => {
      const raw_sheet = await fetch("http://localhost:3000/api/sheet");
      const clean_sheet = await raw_sheet.json();
      setData(clean_sheet);
    };
    load_data();
  }, []);

  const filtered = data.filter((rows, index) => {
    if (index == 0) {
      return false;
    }
    return rows.toString().toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 items-center p-6 md:p-10 font-helvetica">
      {/* Search Header */}
      <div className="w-full max-w-2xl mb-12">
        <h1 className="text-3xl font-bold text-center mb-6 text-slate-900">
          LGA Expert Finder
        </h1>

        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, skill, or division..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-4 pl-12 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-lg"
          />
          <span className="absolute left-4 top-4 opacity-50">🔍</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {filtered.length > 0 ? (
          filtered.map((expert) => (
            <div
              key={expert[0]}
              className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                  {expert[2]}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 leading-tight">
                  {expert[1]}
                </h3>
              </div>
              <p className="text-sm text-slate-500 mt-4 line-clamp-2">
                {expert[3]}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-slate-400 mt-10">
            No experts found matching "{query}"
          </p>
        )}
      </div>
    </div>
  );
}
