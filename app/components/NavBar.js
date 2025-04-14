import Link from "next/link"

export default function NavBar() {
  return (
    <div className="flex w-full py-3 px-3 border items-center justify-between gap-20"> 
      <p>Email.</p>
      <Link href={"https://github.com/limitlez2020"} target="_blank">
        <button className="flex py-1 px-2 border text-sm cursor-pointer">
          Github
        </button>
      </Link>
    </div>
  )
}