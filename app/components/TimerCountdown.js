"use client"

import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { SpeakerXMarkIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState, useEffect, useRef } from "react"
import useSound from "use-sound";

export default function TimerCountdown ({hrs, mins, secs}) {
  
  /* Control Timer */
  const [hours, setHours] = useState(hrs);
  const [minutes, setMinutes] = useState(mins);
  const [seconds, setSeconds] = useState(secs);
  const [timeUp, setTimeUp] = useState(false);
  const intervalRef = useRef(null) /* reference to the interval so, I can access it outside of the useEffect */
  const [pauseTimer, setPauseTimer] = useState(false);
  
  /* Alarm Sound */
  const [isAlarmOn, setIsAlarmOn] = useState(false)
  const [playAlarm, { stop: stopAlarm }] = useSound("/music/alarm.mp3", {
    volume: 0.2,
    onend: () => setIsAlarmOn(false),
  })


  /* Background Music */
  const TOTAL_SONGS = 10
  const [currentSong, setCurrentSong] = useState(1)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [playMusic, { stop: stopMusic, pause: pauseMusic }] = useSound(`/music/jazz/${currentSong}.mp3`, {
    volume: 0.2,
    onend: () => {
      /* Move to next song */
      const nextSong = (currentSong === TOTAL_SONGS) ? 1 : currentSong + 1
      setCurrentSong(nextSong)
    }
  })  
  


  /*******  AUTOPLAY CORE MECHANISM **********/
  /* The key idea is that the useSound hook dynamically creates a
   * sound instance based on the currentSong state. When currentSong
   * changes, useSound effectively provides a new set of playMusic,
   * stopMusic, and pauseMusic functions that are linked to the new
   * audio file. Your useEffect is designed to react to these changes
   * and manage the playback transition smoothly.
   **/

  /* Play next song automatically when the current song is over */
  useEffect(() => {
    if (musicPlaying) {
      console.log(`Attempting to play song ${currentSong}`)
      playMusic()
    }
    /* Cleanup function to prevent the song that was previously
     * playing from being repeated by playMusic call above
     * NOTE:
     * This runs when the effect's dependencies change (before the effect runs again)
     * or when the component unmounts. It stops the sound associated with the
     * *previous* render's useSound instance (and thus the previous currentSong).
     **/
    return () => {
      stopMusic()
    }
  }, [currentSong, playMusic])
  /* Dependencies:
   * currentSong -> calls the useEffect function when the currentSong number changes
   * playMusic -> calls "  " when the playMusic function chages. i.e. when the playMusic
   *              function is now updated to the new useSound instance that contains the
   *              new sound url. Basically when the sound url updates, it sort of creates a
   *              new useSound instance with the functions attached to it like playMusic.
   **/




  /* Play music only when no music is playing */
  const handleUnmute = () => {
    if (!musicPlaying) {
      playMusic()
      /* update music state */
      setMusicPlaying(true)
    }
  }


  /* Mute or pause the music */
  const handleMute = () => {
    if (musicPlaying) {
      pauseMusic()
      /* update music state: */
      setMusicPlaying(false)
    }
  }




  /************   TIMER COUNTDOWN  *************/
  /* Function to handle timer */
  useEffect(() => {
    /* Start the countdown */
    intervalRef.current = setInterval(() => {

      /* Pause Timer: */
      if (pauseTimer) return

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
            clearInterval(intervalRef.current)
            setTimeUp(true)

            /* Play the alarm sound */
            playAlarm()
            setIsAlarmOn(true)

            /* Turn off background music */
            stopMusic()
          }  
        }  
      }  

    }, 1000)  

    /* Cleanup interval */
    return () => clearInterval(intervalRef.current)

  }, [seconds, pauseTimer])  




  /* Stop the timer: */
  const stopTimer = () => {
    setTimeUp(true)
    clearInterval(intervalRef.current)

    /* stop background music */
    stopMusic()
  }  







  return (
    <div className="flex flex-col w-full h-full mt-10 justify-center items-center bg-neutral-900 text-neutral-300">
      {timeUp ? (
        /* Message that time is up */
        <div className="flex flex-col items-center justify-center lowercase">
          <p className="text-6xl">[ time is up ]</p>
          <p className="text-sm">good job, So proud of you!</p>

          {/* Link to timer page: */}
          {isAlarmOn ? (
            /* Stop alarm sound */
            <button className="mt-20 text-red-400 border-b cursor-pointer" onClick={() => {stopAlarm(); setIsAlarmOn(false);}}>
              stop
            </button>
          ) : (
            /* Set timer */
            <button onClick={() => window.location.reload()} className="flex flex-row justify-center items-center mt-20 gap-2 border-b text-green-300 cursor-pointer">
              set timer
              <ArrowLongRightIcon className="size-4"/>
            </button>
          )}
        </div>

      ) : (

        /*********  TIME COUNTDOWN SCREEN  ***********/
        <div className="flex flex-col w-9/10 sm:w-4/5">
          {/* Time Countdown: */}
          <div className="flex items-end justify-between gap-2 sm:gap-5 w-full text-neutral-300">
            {/* Hour: */}
            <div className="flex relative justify-center items-center w-2/5 h-80 sm:h-96 py-10 text-9xl sm:text-[200px] border border-neutral-400">
              {hours}
              <p className="flex absolute bottom-2 sm:bottom-3 text-base">hours</p>
            </div>
            {/* Minute: */}
            <div className="flex relative justify-center items-center w-2/5 h-80 sm:h-96 py-10 text-9xl sm:text-[200px] border border-neutral-400">
              {minutes}
              <p className="flex absolute bottom-2 sm:bottom-3 text-base">minutes</p>
            </div>
            {/* Seconds */}
            <div className="flex relative justify-center items-center w-1/5 h-1/3 p-7 border border-neutral-400 text-4xl sm:text-7xl">
              {String(seconds).padStart(2, "0")}
              <p className="flex absolute bottom-1 text-xs">seconds</p>
            </div>
          </div>

          {/* Pause/Resume and Stop Buttons */}
          <div className="flex flex-row justify-between items-center gap-10 w-full mt-10">
            {pauseTimer ? (
              /* Resume */
              <button className="text-green-400 border p-2 cursor-pointer" onClick={() => setPauseTimer(false)}>
                resume
              </button>
            ) : (
              /* Pause */
              <button className="text-amber-400 border p-2 cursor-pointer" onClick={() => setPauseTimer(true)}>
                pause
              </button>
            )}

            {/* Stop */}
            <button className="text-red-400 border p-2 px-3 cursor-pointer"
                    onClick={stopTimer}
            >
              stop
            </button>
          </div>


          {/* Music + Controls: */}
          <div className="flex w-3/5 md:w-1/2 justify-center items-center self-center gap-2 mt-5 mb-7 text-sm">
            <button onClick={handleMute} className={`${!musicPlaying && "bg-neutral-700"} flex w-2/12 sm:w-2/10 lg:w-1/10 border p-2 justify-center items-center cursor-pointer`}>
              <SpeakerXMarkIcon className="size-4"/>
            </button>

            {/* Genre */}
            <div className="h-full w-8/12 sm:w-6/10 lg:w-8/10 justify-center text-center border p-2">
              <p className="animate-pulse">study music</p>
            </div>

            {/* Unmute */}
            <button onClick={handleUnmute} className={`${musicPlaying && "bg-neutral-700"} flex w-2/12 sm:w-2/10 lg:w-1/10 border p-2 justify-center cursor-pointer`}>
              <SpeakerWaveIcon className="size-4"/>
            </button>
          </div>

        </div>
      )}
    </div>
  )
}