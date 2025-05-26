import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { AnalyticsOverview } from "@/components/analytics-overview"
import { AnalyticsCharts } from "@/components/analytics-charts"

export default async function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Analytics" text="Detailed analytics and insights for your MCP servers." />
      <AnalyticsOverview />
      <AnalyticsCharts />
    </DashboardShell>
  )
}
