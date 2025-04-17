"use client"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/solid"

export default function Timer () {

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isTimerSet, setIsTimerSet] = useState(false);



  /* Function to handle range of possible inputs for timer: 
   * Used when a user manually types answer into the input field */
  const handleInputChange = (input, min, max) => {

    /* Even though the input type is "number", under the hood,
    * it's still a string. If it gets an invalid number,
    * it will be an empty string */

    /* Invalid input */
    if (input === "") {
     return min;
    }

    /* Remove leading zeros: */
    if (input.length > 1 && input[0] === "0") {
      input = input.replace(input[0], "")
    }
    
    /* Make sure number is in range */
    if (input < min) { return min }
    else if (input > max) { return max }
    else { return input }
  }




  /* Function to start the timer */
  // const handleStartTimer = () => {
  //   /* Toggle to the Timer UI */
  //   setIsTimerSet(true)

  //   useEffect(() => {
  //     /* Start the countdown */
  //     let interval = setInterval(() => {
  //       if (seconds === 0) {
  //         setSeconds(59)
  //         setMinutes(minutes - 1)
  
  //         if (minutes === 0) {
  //           setMinutes(minutes = 59)
  //           setHours(hours - 1)
  //         }
  //       }
  //       else if (seconds > 0) {
  //         setSeconds(seconds - 1)
  //       }
  //     }, 1000)

  //   }, [])
  // }






  /* UI Component for setting timer */
  const setTimerUI = () => {
    return (
      <div className="flex flex-col w-full h-full mt-10 justify-center items-center bg-neutral-900 text-neutral-300">
        <p className="text-neutral-300 mb-10 text-xl">Set Timer</p>
        {/* Input fields */}
        <div className="flex flex-row w-4/5 justify-between items-center gap-5 text-7xl">
          {/* Hour */}
          <div className="flex flex-col justify-center items-center w-1/3">
            <input type="number" className="flex w-full border-b p-5 border-neutral-200 text-center"
                  min={0} max={99} value={hours} onChange={(e) => setHours(handleInputChange(e.target.value, 0, 99))}
            />
            <p className="text-sm mt-3">hours</p>
          </div>

          {/* Minute */}
          <div className="flex flex-col justify-center items-center w-1/3">
            <input type="number" className="flex w-full border-b p-5 border-neutral-200 text-center"
                  min={0} max={59} value={minutes} onChange={(e) => setMinutes(handleInputChange(e.target.value, 0, 59))}
            />
            <p className="text-sm mt-3">minutes</p>
          </div>

          {/* Seconds */}
          <div className="flex flex-col justify-center items-center w-1/3">
            <input type="number" className="flex w-full border-b p-5 border-neutral-200 text-center"
                  min={0} max={59} value={seconds} onChange={(e) => setSeconds(handleInputChange(e.target.value, 0, 59))}
            />
            <p className="text-sm mt-3">seconds</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row w-4/5 mt-20 items-center justify-between gap-10">
          {/* Cancel */}
          <Link href={"/"} className="flex flex-row justify-center items-center border-b gap-2 text-red-300">
            <ArrowLongLeftIcon className="size-4"/>
            cancel
          </Link>
          {/* Start */}
          <button className="flex flex-row justify-center items-center border-b gap-2 text-green-300 cursor-pointer"
                  onClick={handleStartTimer}>
            start
            <ArrowLongRightIcon className="size-4"/>
          </button>
        </div>
      </div>
    )
  }






  return (
    <div className="flex flex-col w-full h-screen min-h-full bg-neutral-900 justify-center">
      {/* NavBar: */}
      <NavBar/>

      {/* Body - display timer setr UI or the actual timer UI */}
      {isTimerSet ? (
        /* Actual Timer UI */
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
          
      ) : (
        /* Set Timer UI */
        setTimerUI()
      )}

      {/* Footer */}
      <Footer/>
    </div>
  )
}