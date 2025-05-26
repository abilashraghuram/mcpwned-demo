import { KpiCards } from "@/components/kpi-cards"
import { TopPerformersList } from "@/components/top-performers-list"
import { SystemHealthWidget } from "@/components/system-health-widget"
import { DashboardShell } from "@/components/dashboard-shell"
import { RecentActivity } from "@/components/recent-activity"
import { ServerStats } from "@/components/server-stats"

export default async function DashboardPage() {
  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex flex-col items-center justify-center py-8 mb-8 border-b border-muted/40">
          <img src="/Mlogo.svg" alt="CodeIntegrity Logo" className="w-20 h-20 mb-4" />
          <p className="text-lg text-muted-foreground text-center">Analytics for your MCP servers</p>
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
