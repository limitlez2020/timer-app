import Link from "next/link";

export default function Footer () {
  return (
    <div className="flex flex-col w-full pb-3 justify-center items-center text-neutral-400 text-sm lowercase">
      About this website
      {/* Links */}
      <div className="flex flex-row text-xs">
        <Link href={"https://github.com/limitlez2020/timer-app"} target="_blank" className="underline">Github</Link>
        &nbsp; . &nbsp;
        <Link href={""} className="underline">LinkedIn</Link>
      </div>
    </div>
  )
}