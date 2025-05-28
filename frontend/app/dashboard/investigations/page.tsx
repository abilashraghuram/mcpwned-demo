"use client";
import InvestigationDiagram from "./InvestigationDiagram";
import { investigations } from "./InvestigationDiagramConfig";
import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard-header";
import SidebarInvestigationList from "./SidebarInvestigationList";

function AffectedMcp({ affectedMcp }: { affectedMcp: { name: string; tools: string[] } }) {
  return (
    <div className="rounded-2xl border bg-card p-8 shadow-lg max-w-xl w-full">
      <div className="font-extrabold text-2xl mb-5 text-primary tracking-tight text-left">{affectedMcp.name}</div>
      <div className="text-base text-muted-foreground mb-3 font-medium text-left">Affected Tools:</div>
      <ul className="list-disc list-inside ml-5 space-y-2">
        {affectedMcp.tools.map(tool => (
          <li key={tool} className="text-base text-foreground pl-1 text-left font-normal">{tool}</li>
        ))}
      </ul>
    </div>
  );
}

function RecommendedGuardrails({ guardrails }: { guardrails: string[] }) {
  return (
    <div className="rounded-2xl border bg-card p-8 shadow-lg max-w-xl w-full">
      <div className="font-extrabold text-2xl mb-5 text-primary tracking-tight text-left">Recommended Guardrails</div>
      <ul className="list-disc list-inside ml-5 space-y-3">
        {guardrails.map((g, i) => (
          <li key={i} className="text-base text-foreground pl-1 text-left font-normal">{g}</li>
        ))}
      </ul>
    </div>
  );
}

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
          <h2 className="text-2xl font-semibold mb-4 mt-2 text-primary">{config.label}</h2>
          <InvestigationDiagram investigationKey={selected} />
          <div className="mt-8 flex flex-col md:flex-row gap-10 md:gap-12">
            <AffectedMcp affectedMcp={config.affectedMcp} />
            <RecommendedGuardrails guardrails={config.recommendedGuardrails} />
          </div>
        </main>
      </div>
    </DashboardShell>
  );
} 