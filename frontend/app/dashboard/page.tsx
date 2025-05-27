"use client";
import { KpiCards } from "@/components/kpi-cards"
import { TopPerformersList } from "@/components/top-performers-list"
import { DashboardShell } from "@/components/dashboard-shell"
import { RecentActivity } from "@/components/recent-activity"
import { ServerStats } from "@/components/server-stats"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import React, { useState } from "react"

export default function DashboardPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch("/api/waitlist_add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok && !data.error) {
        setMessage("🎉 Successfully joined the waitlist!")
        setEmail("")
      } else {
        setMessage(
          typeof data.error === "string"
            ? data.error
            : data.error?.message || "Something went wrong. Please try again."
        )
      }
    } catch {
      setMessage("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row items-center justify-center py-8 mb-8 border-b border-muted/40 gap-8 md:gap-16">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img src="/Mlogo.svg" alt="CodeIntegrity Logo" className="w-20 h-20 mb-4" />
            <p className="text-lg text-muted-foreground">MCP observability and security</p>
          </div>
          <form onSubmit={handleWaitlistSubmit} className="mt-6 md:mt-0 w-full max-w-md bg-black border-2 border-primary rounded-xl p-5 flex flex-col items-center gap-3 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
            <Label htmlFor="waitlist-email" className="w-full text-center text-lg font-semibold text-white flex items-center justify-center gap-2">🚀 Welcome to the Mcpwned demo. Feel free to explore the dashboard and join our waitlist!</Label>
            <Input
              id="waitlist-email"
              type="email"
              placeholder="Enter email to join launch waitlist"
              className="w-full text-white placeholder-white bg-black border border-white"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Joining..." : "Join Waitlist"}
            </Button>
            {message && <div className="w-full text-center text-sm mt-2 text-white">{message}</div>}
          </form>
        </header>
        {/* Overview Section */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <KpiCards />
            </div>
          </div>
        </section>
        {/* Alerts & Top Performers Section */}
        <section className="mb-10">
          <div className="grid gap-6 md:grid-cols-2">
            <ServerStats />
            <TopPerformersList />
          </div>
        </section>
        {/* Server Stats & Tool Performance */}
        <section className="mb-10">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Add more components here if needed */}
          </div>
        </section>
        {/* Recent Activity */}
        <section>
          <div>
            <RecentActivity />
          </div>
        </section>
      </div>
    </DashboardShell>
  )
}
