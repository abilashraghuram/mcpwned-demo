"use client";
import InvestigationDiagram from "./components/InvestigationDiagram";
import { investigations } from "./config/InvestigationDiagramConfig";
import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard-header";
import SidebarInvestigationList from "./components/SidebarInvestigationList";
import { AffectedMcp } from "./components/AffectedMcp";
import { RecommendedGuardrails } from "./components/RecommendedGuardrails";

export default function InvestigationsPage() {
  const [selected, setSelected] = useState<string>("default");
  const config = investigations[selected];
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Investigations"
        text="Visualize attack chains"
      />
      <div className="flex flex-col md:flex-row gap-0 md:gap-8 mt-4">
        <SidebarInvestigationList selected={selected} setSelected={setSelected} />
        <main className="flex-1 px-0 md:px-4">
          <div className="mb-4 mt-2">
            <h1 className="text-3xl md:text-4xl">{config.label}</h1>
          </div>
          <InvestigationDiagram investigationKey={selected} />
          <div className="mt-8 flex flex-col md:flex-row gap-6 md:gap-0 md:space-x-6 items-stretch">
            <AffectedMcp affectedMcp={config.affectedMcp} />
            <RecommendedGuardrails guardrails={config.recommendedGuardrails} />
          </div>
        </main>
      </div>
    </DashboardShell>
  );
} 