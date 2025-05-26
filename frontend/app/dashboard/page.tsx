import { KpiCards } from "@/components/kpi-cards"
import { TopPerformersList } from "@/components/top-performers-list"
import { DashboardShell } from "@/components/dashboard-shell"
import { RecentActivity } from "@/components/recent-activity"
import { ServerStats } from "@/components/server-stats"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default async function DashboardPage() {
  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex flex-col items-center justify-center py-8 mb-8 border-b border-muted/40">
          <img src="/Mlogo.svg" alt="CodeIntegrity Logo" className="w-20 h-20 mb-4" />
          <p className="text-lg text-muted-foreground text-center">Analytics for your MCP servers</p>
          {/* Waitlist Signup Box */}
          <form className="mt-6 w-full max-w-xs bg-muted/30 border border-muted/50 rounded-xl p-5 flex flex-col items-center gap-3 shadow">
            <Label htmlFor="waitlist-email" className="w-full text-center">Sign up for the waitlist</Label>
            <Input id="waitlist-email" type="email" placeholder="Enter your email" className="w-full" required />
            <Button type="button" className="w-full mt-2">Join Waitlist</Button>
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
