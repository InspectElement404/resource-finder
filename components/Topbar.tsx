"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Topbar = () => {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center px-8 fixed top-0 left-0 bg-white/80 backdrop-blur-md border-b border-slate-200 w-full h-16 z-[60] font-helvetica">
      {/* Left Section: Logo & Branding */}
      <div className="flex items-center gap-6">
        <Link
          href="/dashboard"
          className="relative shrink-0 h-10 w-10 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/m-inform.svg"
            alt="LGA Logo"
            fill
            className="object-contain"
          />
        </Link>
        <div className="h-6 w-[1px] bg-slate-200 hidden md:block"></div>
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
          <span className="text-slate-400">LGRC</span>
          <span className="text-slate-300">/</span>
          <h1 className="text-slate-800 font-bold tracking-tight">
            Expert Dashboard
          </h1>
        </nav>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="p-2 text-slate-400 hover:text-amber-600 transition-colors relative">
          <span className="absolute top-2 right-2 h-2 w-2 bg-amber-500 rounded-full border-2 border-white"></span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        {/* PROFILE & LOGOUT TRIGGER */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="group flex items-center gap-3 pl-4 border-l border-slate-100 hover:bg-slate-50 py-1.5 px-3 rounded-xl transition-all"
          title="Click to logout"
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-800 leading-none group-hover:text-red-600 transition-colors">
              {session?.user?.name || "LGA User"}
            </p>
            <p className="text-[10px] text-amber-600 font-medium mt-1 uppercase tracking-tighter">
              Click to Sign Out
            </p>
          </div>

          <div className="relative h-9 w-9 rounded-full overflow-hidden border border-slate-200 shadow-sm transition-all group-hover:border-red-200">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              /* Default Person Icon SVG */
              <div className="h-full w-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-red-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            {/* Hover Logout Overlay Icon */}
            <div className="absolute inset-0 flex items-center justify-center bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
