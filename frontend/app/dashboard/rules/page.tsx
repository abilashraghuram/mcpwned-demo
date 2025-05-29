"use client"

import React from "react"
import GuardrailAssignmentSection from "@/components/guardrail-assignment-section"
import { DashboardHeader } from "@/components/dashboard-header"


export default function GuardrailsPage() {
  return (
    <>
      <DashboardHeader heading="Configure Rules" text="Attach guardrails to your MCP servers" />
      <GuardrailAssignmentSection />
    </>
  )
} 