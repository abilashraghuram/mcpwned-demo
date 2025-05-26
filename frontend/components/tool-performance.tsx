"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useMcpStore } from "@/lib/mcp-state"

interface ToolUsage {
  [key: string]: number;
}

// Helper to truncate tool names
function truncateLabel(label: string, maxLength = 12) {
  return label.length > maxLength ? label.slice(0, maxLength) + "…" : label;
}

export function ToolPerformance() {
  const { tools, toolsLoading, toolsError, fetchAllTools } = useMcpStore();
  const [toolUsage, setToolUsage] = useState<ToolUsage>({});

  useEffect(() => {
    fetchAllTools();
  }, []);

  useEffect(() => {
    // Only proceed if tools.data is an array
    if (tools && Array.isArray((tools as unknown as { data: unknown[] }).data)) {
      const newToolUsage: ToolUsage = {};
      (tools as unknown as { data: { name: string }[] }).data.forEach((tool: { name: string }) => {
        const toolName = tool.name;
        newToolUsage[toolName] = (newToolUsage[toolName] || 0) + 1;
      });
      setToolUsage(newToolUsage);
    }
  }, [tools]);

  const chartData = Object.entries(toolUsage)
    .map(([name, count]) => ({
      name,
      usage: count,
    }))
    .sort((a, b) => b.usage - a.usage)
    .slice(0, 5);

  if (toolsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tool Performance</CardTitle>
          <CardDescription>Loading tool usage data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (toolsError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tool Performance</CardTitle>
          <CardDescription>Error loading tool usage data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-destructive">{toolsError}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tool Performance</CardTitle>
        <CardDescription>Most frequently used tools</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-[260px] flex items-center justify-center">
          <ChartContainer
            config={{
              usage: {
                label: "Usage Count",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-full w-full"
          >
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 70,
              }}
            >
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={({ x, y, payload }) => (
                  <g transform={`translate(${x},${y})`}>
                    <title>{payload.value}</title>
                    <text
                      x={0}
                      y={0}
                      dy={16}
                      textAnchor="end"
                      fill="#888"
                      fontSize={12}
                      transform="rotate(-45)"
                    >
                      {truncateLabel(payload.value)}
                    </text>
                  </g>
                )}
                height={70}
              />
              <YAxis hide />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => [`${value} use`, '']}
                  />
                }
                cursor={false}
              />
              <Bar
                dataKey="usage"
                fill="var(--color-duration)"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
