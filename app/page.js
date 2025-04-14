"use client"

import Image from "next/image";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen min-h-full bg-neutral-300 justify-center">
      {/* NavBar: */}
      <NavBar/>

      {/* Body: */}
      <div className="flex flex-col w-full h-full bg-neutral-200 justify-center items-center">
        Enter Email
        <textarea className="w-1/2 border p-2"/>
      </div>
    </div>
  );
}
