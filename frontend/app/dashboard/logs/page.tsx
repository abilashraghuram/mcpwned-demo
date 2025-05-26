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
    dateRange: { from: null, to: null }
  });

  return (
    <DashboardShell>
      <DashboardHeader heading="Logs Explorer" text="View and analyze logs from your MCP servers and tools." />
      <LogsFilter onChange={setFilters} />
      <LogsTable filters={filters} />
    </DashboardShell>
  )
}
