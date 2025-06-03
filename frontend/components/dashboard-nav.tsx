"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, SlidersHorizontal, FileText, Info } from "lucide-react"

interface NavProps {
  isCollapsed?: boolean
}

export function DashboardNav({ isCollapsed }: NavProps) {
  const pathname = usePathname()

  const items = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Insights",
      href: "/dashboard/investigations",
      icon: FileText,
    },
    {
      title: "Rules",
      href: "/dashboard/rules",
      icon: SlidersHorizontal,
    },
    {
      title: "Logs",
      href: "/dashboard/logs",
      icon: FileText,
    },
    {
      title: "About",
      href: "/dashboard/about",
      icon: Info,
    },
    {
      title: "Scanner",
      href: "/dashboard/scanner",
      icon: SlidersHorizontal,
    },
  ]

  return (
    <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-2 bg-background/80 backdrop-blur border-r border-border shadow-md rounded-xl">
      <nav className="grid gap-1 px-1 group-[[data-collapsed=true]]:justify-center">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="text-base">{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
