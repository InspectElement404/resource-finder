"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  id: string;
  onClose: () => void;
}

export default function ConsultantProfileModal({ id, onClose }: ModalProps) {
  const [expert, setExpert] = useState<(string | number | null)[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const res = await fetch("/api/sheet");
        const allData: (string | number | null)[][] = await res.json();
        const match = allData.find((row) => String(row[0]) === id);
        if (match) setExpert(match);
      } catch (error) {
        console.error("Error fetching consultant:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExpert();

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [id]);

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm font-helvetica">
      <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full shadow-md text-slate-400 hover:text-amber-600 transition-colors"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {isLoading ? (
          <div className="flex h-[600px] w-full items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : !expert ? (
          <div className="p-20 text-center w-full">
            <h1 className="text-2xl font-bold text-slate-800">
              Consultant Not Found
            </h1>
            <button onClick={onClose} className="text-amber-600 underline mt-4">
              Close Modal
            </button>
          </div>
        ) : (
          <>
            {/* Left Sidebar: Identity */}
            <div className="w-full md:w-1/3 bg-slate-800 flex flex-col items-center pt-12 pb-8 text-white px-6 overflow-y-auto shrink-0">
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
                    Primary Email
                  </span>
                  <span className="font-mono text-sm break-all">
                    {expert[5] || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">
                    Contact Number
                  </span>
                  <span className="font-mono text-sm">
                    {expert[6] || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">
                    Last Engagement
                  </span>
                  <span className="font-mono text-sm">
                    {expert[8] || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 flex flex-col bg-white overflow-y-auto">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                    Classification
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">
                    Highly Technical Consultant
                  </p>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
                    <strong>{expert[3]}</strong>. Profile integrated with LGA
                    Knowledge Management.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Section 1 */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">
                          Profile & Credentials
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          CV, PhilGEPS Registration, and Supporting Documents
                        </p>
                      </div>
                      <a
                        href={String(expert[7])}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-amber-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-amber-700 transition-all shadow-md whitespace-nowrap"
                      >
                        Open Folder
                      </a>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">
                          Outputs & Deliverables
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          Reports, Project Outputs, and Knowledge Products
                        </p>
                      </div>
                      <a
                        href={String(expert[7])}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-amber-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-amber-700 transition-all shadow-md whitespace-nowrap"
                      >
                        Open Folder
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
