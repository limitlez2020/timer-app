"use client"

import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState, useEffect } from "react"

export default function TimerCountdown ({hrs, mins, secs}) {

  const [hours, setHours] = useState(hrs);
  const [minutes, setMinutes] = useState(mins);
  const [seconds, setSeconds] = useState(secs);
  const [timeUp, setTimeUp] = useState(false);

  const [pause, setPause] = useState(false);


  /* Function to handle timer */
  useEffect(() => {
    /* Start the countdown */
    let interval = setInterval(() => {

      /* Pause Timer: */
      if (pause) return

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
            // alert("Time is up ⏰")
            setTimeUp(true)
          }
        }
      }

    }, 1000)

    /* Cleanup interval */
    return () => clearInterval(interval)

  }, [seconds, pause])






  return (
    <div className="flex flex-col w-full h-full mt-10 justify-center items-center bg-neutral-900 text-neutral-300">
      {timeUp ? (
        /* Message that time is up */
        <div className="flex flex-col items-center justify-center mt-52.25 mb-52 lowercase">
          <p className="text-6xl">[ time is up ]</p>
          <p className="text-sm">good job, So proud of you!</p>

          {/* Link to timer page: */}
          <button onClick={() => window.location.reload()} className="flex flex-row justify-center items-center mt-20 gap-2 border-b text-green-300 cursor-pointer">
            set timer
            <ArrowLongRightIcon className="size-4"/>
          </button>
        </div>

      ) : (

        <div className="flex flex-col w-4/5 mt-17 mb-17.75">
          {/* Time Countdown: */}
          <div className="flex items-end justify-between gap-5 w-full text-neutral-300">
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

          {/* Pause/Resume and Stop Buttons */}
          <div className="flex flex-row justify-between items-center gap-10 w-full mt-10">
            {pause ? (
              /* Resume */
              <button className="text-green-400 border p-2 cursor-pointer" onClick={() => setPause(false)}>
                resume
              </button>
            ) : (
              /* Pause */
              <button className="text-amber-400 border p-2 cursor-pointer" onClick={() => setPause(true)}>
                pause
              </button>
            )}

            {/* Stop */}
            <button className="text-red-400 border p-2 px-3 cursor-pointer" onClick={() => setTimeUp(true)}>
              stop
            </button>
          </div>

        </div>
      )}
    </div>
  )
}