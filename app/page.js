"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { ArrowRightIcon, PlayIcon } from "@heroicons/react/24/solid"

export default function Home() {
  const [hour, setHour] = useState("")
  const [minute, setMinute] = useState("")
  const [ampm, setAmpm] = useState("")

  const [timerScrn, setTimerScrn] = useState(false)


  /* Get the date every second: */
  /* NOTE: Date is in 24hr format -- hrs from 0 to 23 */
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()

      /* Turn 24-Hour into 12-Hour format */
      const hour = date.getHours()
      
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

      /* Minute */
      const minute = String(date.getMinutes())
      setMinute(minute.padStart(2, "0"))
    }, 1000)

    /* Clear the interval: */
    return () => {clearInterval(interval)}
  }, [])



  return (
    <div className="flex flex-col w-full h-screen min-h-full bg-neutral-900 justify-center">
      {/* NavBar: */}
      <NavBar/>

      {/* Body: */}
      {timerScrn ? (
        /* Timer Screen Body */
        <div className="flex flex-col w-full h-full mt-10 justify-center items-center bg-neutral-900 text-neutral-300">
          <p className="text-neutral-300 mb-10 text-xl">Set Timer</p>
          {/* Input fields */}
          <div className="flex flex-row w-4/5 justify-between items-center gap-5 text-7xl">
            {/* Hour */}
            <div className="flex flex-col justify-center items-center w-1/3">
              <input type="number" className="flex w-full border-b p-5 border-neutral-200 text-center" min={0} defaultValue={0}/>
              <p className="text-sm mt-3">hours</p>
            </div>
            {/* Minute */}
            <div className="flex flex-col justify-center items-center w-1/3">
              <input type="number" className="flex w-full border-b p-5 border-neutral-200 text-center" min={0} max={59} defaultValue={0}/>
              <p className="text-sm mt-3">minutes</p>
            </div>
            {/* Seconds */}
            <div className="flex flex-col justify-center items-center w-1/3">
              <input type="number" className="flex w-full border-b p-5 border-neutral-200 text-center" min={0} max={59} defaultValue={0}/>
              <p className="text-sm mt-3">seconds</p>
            </div>
          </div>
        </div>

      ) : (
        /* Home Screen Body*/
        <div className="flex flex-col w-full h-full mt-10 bg-neutral-900 justify-center items-center">
          {/* Time: */}
          <div className="flex justify-between gap-5 w-4/5 text-neutral-300">
            {/* Hour: */}
            <div className="flex justify-center items-center w-1/2 py-10 text-[200px] border border-neutral-400">
              {hour}
            </div>
            {/* Minute: */}
            <div className="flex relative justify-center w-1/2 py-10 border border-neutral-400">
              <p className="text-[200px]">{minute}</p>
              <p className="absolute bottom-0 right-0 p-5 text-lg">{ampm}</p>
            </div>
          </div>

          {/* Set Timer Button */}
          <button className="flex flex-row justify-center items-center mt-10 text-neutral-300 
                            border-b gap-2 lowercase cursor-pointer"
                  onClick={() => setTimerScrn(true)}
          >
            Start Timer
            <ArrowRightIcon className="size-3"/>
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer/>
    </div>
  );
}
