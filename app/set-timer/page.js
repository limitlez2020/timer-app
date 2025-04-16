"use client"

import { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


export default function SetTimer () {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);


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
    if ((input < min)) { 
      return min
    }
    else if (input > max) { 
      return max
    }
    else {
      return input
    }
  }



  




  return (
    <div className="flex flex-col w-full h-screen min-h-full bg-neutral-900 justify-center">
      {/* NavBar: */}
      <NavBar/>

      {/* Body: */}
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
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  ); 
}