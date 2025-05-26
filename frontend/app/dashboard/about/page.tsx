import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export default function AboutPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="About Us" text="Learn more about our team and mission." />
      <div className="grid gap-4 md:grid-cols-1">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p>This is the About Us page. More information coming soon.</p>
        </div>
      </div>
    </DashboardShell>
  )
} 