"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { useMcpStore, McpServer } from "@/lib/mcp-state"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

export function Overview() {
  const { servers, isLoading, error, fetchServers } = useMcpStore()

  useEffect(() => {
    fetchServers()
  }, [fetchServers])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Server status and tool invocations over time.</CardDescription>
          <CardDescription>Loading server data...</CardDescription>
        </CardHeader>
        <CardContent className="px-2">
          <div className="h-[200px]">
            <Skeleton className="h-full w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Server status and tool invocations over time.</CardDescription>
          <CardDescription>Error loading server data.</CardDescription>
        </CardHeader>
        <CardContent className="px-2">
          <div className="h-[200px] flex items-center justify-center text-destructive">
            Error: {error}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Group data by date and calculate metrics
  const dateMap = new Map<string, { invocations: number; errors: number }>()
  
  let activeServersCount = 0;
  let totalTools = 0;
  
  if (Array.isArray(servers)) {
    activeServersCount = servers.length; // All servers are active in this case
    totalTools = servers.reduce((acc, server) => acc + (server.tools?.length || 0), 0);
    
    servers.forEach((server: McpServer) => {
      const date = new Date(server.lastSeen || new Date()).toISOString().split('T')[0]
      const current = dateMap.get(date) || { invocations: 0, errors: 0 }
      
      // Count tools as invocations
      current.invocations += server.tools?.length || 0
      // Count offline servers as errors
      if (server.status === 'offline') {
        current.errors += 1
      }
      
      dateMap.set(date, current)
    })
  }

  // Convert to array and sort by date
  const chartData = Array.from(dateMap.entries())
    .map(([date, metrics]) => ({
      date,
      invocations: metrics.invocations,
      errors: metrics.errors,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Server status and tool invocations over time.</CardDescription>
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Active Servers: {activeServersCount}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                Total Tools: {totalTools}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-2">
          <div className="h-[200px]">
            <ChartContainer
              config={{
                invocations: {
                  label: "Tool Invocations",
                  color: "hsl(var(--chart-1))",
                },
                errors: {
                  label: "Inactive Servers",
                  color: "hsl(var(--destructive))",
                },
              }}
              className="h-full"
            >
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                />
                <YAxis hide />
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="invocations"
                  stroke="var(--color-invocations)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="errors"
                  stroke="var(--color-errors)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
