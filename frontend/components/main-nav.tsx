"use client"
import Link from "next/link"
import Image from "next/image"

export function MainNav() {

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-6 md:gap-10 ml-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/Mlogo.svg" alt="Mcpwned Logo" width={24} height={24} />
          <span className="hidden sm:inline-block">Mcpwned - Early Access Preview</span>
        </Link>
      </div>
    </div>
  )
}
