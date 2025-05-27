import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function KpiCards() {
  const kpis = [
    { label: "Total MCPs", value: 1342, color: "text-green-600" },
    { label: "MCP Uptime", value: "82.98%", color: "text-orange-500" },
    { label: "MCP Tool Calls", value: 8734, color: "text-green-600" },
    { label: "Guardrails Enabled", value: 34, color: "text-green-600" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label}>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{kpi.label}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <span className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 