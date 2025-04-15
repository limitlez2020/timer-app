"use client"

import Image from "next/image";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen min-h-full bg-neutral-900 justify-center">
      {/* NavBar: */}
      <NavBar/>

      {/* Body: */}
      <div className="flex flex-col w-full h-full bg-neutral-900 justify-center items-center">
        {/* Time: */}
        <div className="flex justify-between gap-10 w-4/5 text-neutral-300">
          {/* Hour: */}
          <div className="flex justify-center items-center w-1/2 py-10 text-[200px] border border-neutral-400">
            11
          </div>
          {/* Minute: */}
          <div className="flex justify-center items-center w-1/2 py-10 text-[200px] border border-neutral-400">
            45
          </div>
        </div>
      </div>
    </div>
  );
}
