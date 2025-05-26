"use client"
import Link from "next/link"
import { Activity } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function MainNav() {

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-6 md:gap-10 ml-4">
        <Link href="/" className="flex items-center space-x-2">
          <Activity className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">Observee</span>
        </Link>
      </div>
      <ThemeToggle />
    </div>
  )
}
