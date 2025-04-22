"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { ArrowRightIcon, PlayIcon } from "@heroicons/react/24/solid"
import Link from "next/link";

export default function Home() {
  const [date, setDate] = useState("")
  const [hour, setHour] = useState("")
  const [minute, setMinute] = useState("")
  const [ampm, setAmpm] = useState("")


  /* Get the date every second: */
  /* NOTE: Date is in 24hr format -- hrs from 0 to 23 */
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()

      /* DATE: */
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      const year = now.getFullYear()
      const month = months[now.getMonth()]
      const day = now.getDate()
      const date = month + " " + day + ", " + year 
      setDate(date)

      /* HOUR */
      /* Turn 24-Hour into 12-Hour format */
      const hour = now.getHours()
      
      /* Time: 1pm - 11pm */
      if (hour > 12) {
        const twelveHour = String(hour - 12)
        setHour(twelveHour.padStart(2, "0")) /* Pad nums like 1 with a 0 in the front -- 01 */
        setAmpm("PM")
      }
      /* Time: Midnight (0am) - Noon (12pm) */
      else if (hour <= 12) {
        setHour(hour.toString().padStart(2, "0"))
        {hour < 12 ? setAmpm("AM") : setAmpm("PM")}
      }

      /* MINUTE */
      const minute = String(now.getMinutes())
      setMinute(minute.padStart(2, "0"))
    }, 1000)

    /* Clear the interval: */
    return () => {clearInterval(interval)}
  }, [])





  return (
    <div className="flex flex-col w-full h-screen min-h-screen bg-neutral-900">
      {/* NavBar: */}
      <NavBar/>

      {/* Body: */}
      <div className="flex flex-col w-full h-full mt-10 bg-neutral-900 justify-center items-center">
        {/* Time: */}
        <div className="flex justify-between gap-2 sm:gap-5 w-9/10 sm:w-4/5 text-neutral-300">
          {/* Hour: */}
          <div className="flex justify-center items-center w-1/2 h-80 sm:h-96 py-10 text-9xl sm:text-[200px] border border-neutral-400">
            <p>{hour}</p>
          </div>
          {/* Minute: */}
          <div className="flex relative justify-center items-center w-1/2 h-80 sm:h-96 py-10 border border-neutral-400">
            <p className="text-9xl sm:text-[200px]">{minute}</p>
            <p className="absolute bottom-0 right-0 p-5 text-lg">{ampm}</p>
          </div>
        </div>

        {/* Date: */}
        <div className="text-neutral-300 mt-5 text-2xl">
          {date}
        </div>

        {/* Set Timer Button */}
        <Link href={"/timer"}
              className="flex flex-row justify-center items-center mt-5 text-green-300 border-b gap-2 lowercase cursor-pointer">
          Set Timer
          <ArrowRightIcon className="size-3"/>
        </Link>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
