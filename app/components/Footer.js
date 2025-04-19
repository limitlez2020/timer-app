import Link from "next/link";

export default function Footer () {
  return (
    <div className="flex flex-col w-full pb-3 justify-center items-center text-neutral-400 text-sm lowercase">
      🙊 Who made this 🙈
      {/* Links */}
      <div className="flex flex-row text-xs">
        <Link href={"https://github.com/limitlez2020"} target="_blank" className="underline">Github</Link>
        &nbsp; . &nbsp;
        <Link href={"https://www.linkedin.com/in/david-akinremi/"} target="_blank" className="underline">LinkedIn</Link>
      </div>
    </div>
  )
}