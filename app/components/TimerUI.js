"use client"

import { useState, useEffect } from "react"

export default function TimerUI ({hrs, mins, secs}) {

  const [hours, setHours] = useState(hrs);
  const [minutes, setMinutes] = useState(mins);
  const [seconds, setSeconds] = useState(secs);

  /* Function to handle timer */
  useEffect(() => {
    /* Start the countdown */
    let interval = setInterval(() => {

      /* PLAN: the whole thing is controlled by seconds:
       *
       * 1. If the seconds is greater than 0:
       *   - Decrease seconds by 1
       * 2. If the seconds is 0: (we either still have minutes left or timer is up)
       *   - If the minutes > 0:
       *       - Decrease minutes by 1
       *       - Reset seconds to 59
       *   - If the minutes is 0: (we either update the hour or timer is up)
       *       - If hours > 0:
       *            - Decrease hours by 1
       *            - Reset the minutes to 59
       *            - Reset the seconds to 59
       *       - If hours is 0:
       *            - Timer is up (seconds, minutes, and hour are all zero at this point)
       *         
      */

      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1)
      }
      else if (seconds === 0) {
        if (minutes > 0) {
          setMinutes(prevMinutes => prevMinutes - 1)
          setSeconds(59)
        }
        else if (minutes === 0) {
          if (hours > 0) {
            setHours(prevHours => prevHours - 1)
            setMinutes(59)
            setSeconds(59)
          }
          else if (hours === 0) {
            /* Timer is up */
            clearInterval(interval)
            alert("Time is up ⏰")
          }
        }
      }
    }, 1000)

    /* Cleanup interval */
    return () => clearInterval(interval)

  }, [seconds])






  return (
    <div className="flex flex-col w-full h-full mt-10 justify-center items-center bg-neutral-900 text-neutral-300">
      {/* Time: */}
      <div className="flex items-end justify-between gap-5 w-4/5 text-neutral-300">
        {/* Hour: */}
        <div className="flex relative justify-center items-center w-1/2 py-10 text-[200px] border border-neutral-400">
          {hours}
          <p className="flex absolute bottom-3 text-base">hours</p>
        </div>
        {/* Minute: */}
        <div className="flex relative justify-center w-1/2 py-10 text-[200px] border border-neutral-400">
          {minutes}
          <p className="flex absolute bottom-3 text-base">minutes</p>
        </div>
        {/* Seconds */}
        <div className="flex relative justify-center p-7 border border-neutral-400 text-6xl">
          {String(seconds).padStart(2, "0")}
          <p className="flex absolute bottom-1 text-xs">seconds</p>
        </div>
      </div>
    </div>
  )
}