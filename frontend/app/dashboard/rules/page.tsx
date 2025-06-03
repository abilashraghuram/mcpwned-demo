"use client"

import React from "react"
import GuardrailAssignmentSection from "@/components/guardrail-assignment-section"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"


export default function GuardrailsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Configure granular control flow and data flow rules" text="Attach guardrails to your agenticatic control and dataflows" />
      <GuardrailAssignmentSection />
    </DashboardShell>
  )
} 