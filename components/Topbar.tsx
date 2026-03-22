import React from "react";
import Image from "next/image";

const Topbar = () => {
  return (
    <header className="flex justify-start gap-6 items-center px-8 fixed top-0 left-0 bg-slate-50 border-b border-slate-200 w-full h-16 z-50">
      <div className="relative shrink-0 h-12 w-12">
        <Image
          src="/m-inform.svg"
          alt="some-logo"
          fill
          className="object-contain"
        ></Image>
      </div>
      <h1>Dashboard</h1>
    </header>
  );
};

export default Topbar;
