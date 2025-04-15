import Link from "next/link"

export default function NavBar() {
  return (
    <div className="flex w-full py-3 px-3 border-b border-neutral-600 items-center justify-between gap-20 text-neutral-400"> 
      <p>Timer.</p>
      <Link href={"https://github.com/limitlez2020"} target="_blank">
        <button className="flex py-1 px-2 border text-sm cursor-pointer">
          Github
        </button>
      </Link>
    </div>
  )
}