"use client"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/solid"
import TimerCountdown from "../components/TimerCountdown"

export default function Timer () {

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isTimerSet, setIsTimerSet] = useState(false);
  const [noTimeSet, setNoTimeSet] = useState(false)



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




  /* Function to handle starting the timer: */
  const startTimer = () => {
    /* If no time is set, display warning to user */
    if (hours === 0 && minutes === 0 && seconds === 0) {
      setNoTimeSet(true)
    }
    else {
      /* Display the timer UI */
      setIsTimerSet(true)
    }
  }






  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-neutral-900">
      {/* NavBar: */}
      <NavBar/>

      {/* Body - display timer setr UI or the actual timer UI */}
      {isTimerSet ? (
        /* Actual Timer Countdown UI */
        <TimerCountdown hrs={hours} mins={minutes} secs={seconds}/>

      ) : (

        /* Set Timer UI */
        <div className="flex flex-col w-full h-full mt-45 mb-32.5 justify-center items-center bg-neutral-900 text-neutral-300">
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

            {/* Display warning message to user */}
            {noTimeSet && <p className="flex text-yellow-300 opacity-90 lowercase text-sm">
              [ please set a time ]
            </p>}

            {/* Start */}
            <button className="flex flex-row justify-center items-center border-b gap-2 text-green-300 cursor-pointer"
                    onClick={startTimer}>
              start
              <ArrowLongRightIcon className="size-4"/>
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer/>
    </div>
  )
}