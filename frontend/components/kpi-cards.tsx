import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function KpiCards() {
  const kpis = [
    { label: "Total MCPs", value: 12 },
    { label: "Uptime %", value: "99.98%" },
    { label: "MCP Tool Calls today", value: 8734 },
    { label: "Guardrail Violations Today", value: 34 },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label}>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{kpi.label}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <span className="text-2xl font-bold">{kpi.value}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 