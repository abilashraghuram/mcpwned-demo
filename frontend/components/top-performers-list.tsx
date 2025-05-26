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

  // Calculate compliance percentage for each server
  const performerData = servers.map((server) => {
    const logStats = logsByServer[server.id] || { total: 0, violations: 0 };
    const total = logStats.total;
    const violations = logStats.violations;
    const compliance = total > 0 ? ((total - violations) / total) * 100 : 100;
    return {
      name: server.name,
      compliance: compliance,
      total,
      violations,
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
      <CardHeader>
        <CardTitle>Guardrails Compliance</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {performerData.map((perf, idx) => (
            <li key={idx} className="flex justify-between text-sm">
              <span>{perf.name}</span>
              <span className={`font-mono ${getColor(perf.compliance)}`}>
                {perf.compliance.toFixed(1)}% compliant
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
} 