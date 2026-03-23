"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ConsultantProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [expert, setExpert] = useState<(string | number | null)[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const res = await fetch("/api/sheet");
        const allData: (string | number | null)[][] = await res.json();

        // Find the specific row where the ID (index 0) matches the URL param
        const match = allData.find((row) => String(row[0]) === id);

        if (match) {
          setExpert(match);
        }
      } catch (error) {
        console.error("Error fetching consultant:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExpert();
  }, [id]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );

  if (!expert)
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-slate-800">
          Consultant Not Found
        </h1>
        <Link
          href="/dashboard"
          className="text-amber-600 underline mt-4 inline-block"
        >
          Return to Directory
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      {/* Navigation Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-amber-600 font-bold text-sm transition-all"
        >
          ← BACK TO REPOSITORY
        </button>
      </div>

      {/* Main Dossier Card */}
      <div className="flex w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 min-h-[600px]">
        {/* Left Sidebar: Identity */}
        <div className="w-1/3 bg-slate-800 flex flex-col items-center pt-12 pb-8 text-white px-6">
          <div className="relative">
            <img
              src={
                expert[4] && typeof expert[4] === "string"
                  ? expert[4]
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(String(expert[1]))}&background=f1f5f9&color=475569`
              }
              alt="Consultant"
              className="rounded-full object-cover h-40 w-40 border-4 border-slate-700 shadow-2xl"
            />
            <span className="absolute bottom-3 right-3 block h-5 w-5 rounded-full bg-green-500 border-4 border-slate-800"></span>
          </div>

          <h2 className="mt-6 text-2xl font-bold text-center leading-tight">
            {expert[1]}
          </h2>
          <p className="text-amber-400 font-medium text-sm uppercase tracking-widest mt-2 text-center">
            {expert[2]}
          </p>

          <div className="w-full h-[1px] bg-slate-700 my-8"></div>

          <div className="w-full space-y-4">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">
                Consultant ID
              </span>
              <span className="font-mono text-sm">#LGA-{expert[0]}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">
                Status
              </span>
              <span className="text-sm">Active / Verified</span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Institutional Dossier
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Official Expert Registry Profile
              </p>
            </div>
            <button className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-200">
              EXPORT DOSSIER
            </button>
          </div>

          <div className="p-8 space-y-8 overflow-y-auto">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-bold text-amber-600 uppercase mb-3">
                  Primary Division
                </h4>
                <p className="text-slate-800 font-semibold">
                  {expert[2] || "Unassigned"}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-600 uppercase mb-3">
                  Specialization
                </h4>
                <div className="flex flex-wrap gap-2">
                  {expert[3]
                    ?.toString()
                    .split(",")
                    .map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-xs font-medium"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div>
              <h4 className="text-xs font-bold text-amber-600 uppercase mb-3">
                Professional Summary
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Registered consultant specializing in{" "}
                <strong>{expert[3]}</strong>. This profile is part of the
                integrated LGA Knowledge Management system for tracking
                institutional outputs and capacity development initiatives.
              </p>
            </div>

            {/* Dedicated Outputs Section */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mt-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Dedicated Outputs & Deliverables
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    G-Drive Centralized Document Storage
                  </p>
                </div>
                <a
                  href="https://drive.google.com/drive/folders/YOUR_FOLDER_ID"
                  target="_blank"
                  className="flex items-center gap-2 bg-amber-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-amber-700 transition-all shadow-md"
                >
                  <span>Open Folder</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
