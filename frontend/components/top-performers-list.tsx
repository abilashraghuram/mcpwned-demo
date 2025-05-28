"use client";
import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useMcpStore } from "@/lib/mcp-state";

export function TopPerformersList() {
  const { servers, logs, fetchServers, fetchAllLogs } = useMcpStore();

  useEffect(() => {
    fetchServers();
    fetchAllLogs();
  }, [fetchServers, fetchAllLogs]);

  // Group logs by server id
  const logsByServer: Record<string, { total: number; violations: number }> = {};
  (Array.isArray(logs) ? logs : []).forEach((log) => {
    const sid = log.mcp_server_id;
    if (!logsByServer[sid]) logsByServer[sid] = { total: 0, violations: 0 };
    logsByServer[sid].total++;
    if (log.status !== "success") logsByServer[sid].violations++;
  });

  // MOCK: Assign random compliance percentages for demo purposes
  const performerData = servers.map((server, i) => {
    // Generate mock compliance values: 100, 92, 77, 65, 48, 35, etc.
    const mockCompliance = [100, 92, 77, 65, 48, 35, 85, 60, 99, 73][i % 10];
    return {
      name: server.name,
      compliance: mockCompliance,
      total: 100,
      violations: 100 - mockCompliance,
    };
  });

  // Sort by compliance descending
  performerData.sort((a, b) => b.compliance - a.compliance);

  function getColor(compliance: number) {
    if (compliance < 50) return "text-red-600";
    if (compliance < 80) return "text-orange-500";
    return "text-green-600";
  }
 
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 font-medium">
      <div className="space-y-1">
        <CardTitle>Guardrails Compliance</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-1">
          {performerData.map((perf, idx) => (
            <li key={idx} className="flex justify-between items-center text-sm py-2 gap-x-8">
              <span className="font-mono">{perf.name}</span>
              <span className={`font-mono ${getColor(perf.compliance)} text-right`}>
                {perf.compliance.toFixed(1)}% compliant
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
} 