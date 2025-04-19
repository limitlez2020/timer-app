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
      
      setSeconds((prevSecs) => {
        /* Decrease seconds */
        if (prevSecs > 0) {
          return prevSecs - 1
        }

        /* If seconds reach 0 */
        else {
          /* If there's still minutes - decrease minutes and reset seconds */
          if (minutes > 0) {
            return 59
          }
        }
      })

      setMinutes((prevMins) => {
        /* If seconds is 0 - decrease minutes (if there's still minutes left) */
        if (seconds === 0) {
          if (prevMins > 0) {
            return prevMins - 1
          }
        }
        return prevMins
      })


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

    }, 1000)

    /* Cleanup interval */
    return () => clearInterval(interval)

  }, [])






  return (
    <div className="flex flex-col w-full h-full mt-10 justify-center items-center bg-neutral-900 text-neutral-300">
      {/* Time: */}
      <div className="flex items-end justify-between gap-5 w-4/5 text-neutral-300">
        {/* Hour: */}
        <div className="flex justify-center items-center w-1/2 py-10 text-[200px] border border-neutral-400">
          {hours}
        </div>
        {/* Minute: */}
        <div className="flex justify-center w-1/2 py-10 border border-neutral-400">
          <p className="text-[200px]">{minutes}</p>
        </div>
        {/* Seconds */}
        <p className="flex justify-center h-fit p-5 border border-neutral-400 text-6xl">{seconds}</p>
      </div>
    </div>
  )
}