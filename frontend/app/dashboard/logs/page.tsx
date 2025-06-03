"use client"
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { LogsTable } from "@/components/logs-table"
import { LogsFilter, LogsFilterState } from "@/components/logs-filter"

export default function LogsPage() {
  const [filters, setFilters] = useState<LogsFilterState>({
    search: "",
    status: "all",
    server: "all",
    tool: "all",
    dateRange: { from: undefined, to: undefined }
  });

  return (
    <DashboardShell>
      <DashboardHeader heading="Traces Explorer" text="View and analyze control flow, data flow traces from your agentic interactions." />
      <LogsFilter onChange={setFilters} />
      <LogsTable filters={filters} />
    </DashboardShell>
  )
}
