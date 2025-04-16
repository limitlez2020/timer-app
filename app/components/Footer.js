import Link from "next/link";

export default function Footer () {
  return (
    <div className="flex flex-col w-full">
      About this website
      {/* Links */}
      <div className="flex flex-row">
        <Link href={""}>Github</Link>
        .
        <Link href={""}>LinkedIn</Link>
      </div>
    </div>
  )
}