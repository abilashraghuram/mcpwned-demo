"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, List } from "lucide-react"

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
      title: "Explore Logs",
      href: "/dashboard/logs",
      icon: List,
    },
    {
      title: "Configure Rules",
      href: "/dashboard/rules",
      icon: List,
    },
    {
      title: "About Us",
      href: "/dashboard/about",
      icon: List,
    },
  ]

  return (
    <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-2">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
