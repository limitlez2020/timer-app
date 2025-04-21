import Link from "next/link"

export default function NavBar() {
  return (
    <div className="flex lowercase w-full mt-5 items-center justify-center text-neutral-400"> 
      <Link href={"/"}>Time.</Link>
    </div>
  )
}