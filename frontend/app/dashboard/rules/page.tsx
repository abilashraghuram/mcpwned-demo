"use client"

import React from "react"
import GuardrailAssignmentSection from "@/components/guardrail-assignment-section"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"


export default function GuardrailsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Configure Rules" text="Attach guardrails to your MCP servers" />
      <GuardrailAssignmentSection />
    </DashboardShell>
  )
} 