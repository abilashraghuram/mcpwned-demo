"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const invocationData = [
  {
    timestamp: "00:00",
    "Maps MCP Server": 120,
    "Weather MCP Server": 90,
    "Calendar MCP Server": 75,
    "Search MCP Server": 150,
    "Email MCP Server": 60,
  },
  {
    timestamp: "04:00",
    "Maps MCP Server": 80,
    "Weather MCP Server": 60,
    "Calendar MCP Server": 50,
    "Search MCP Server": 100,
    "Email MCP Server": 40,
  },
  {
    timestamp: "08:00",
    "Maps MCP Server": 150,
    "Weather MCP Server": 110,
    "Calendar MCP Server": 90,
    "Search MCP Server": 180,
    "Email MCP Server": 70,
  },
  {
    timestamp: "12:00",
    "Maps MCP Server": 200,
    "Weather MCP Server": 150,
    "Calendar MCP Server": 120,
    "Search MCP Server": 240,
    "Email MCP Server": 90,
  },
  {
    timestamp: "16:00",
    "Maps MCP Server": 180,
    "Weather MCP Server": 130,
    "Calendar MCP Server": 110,
    "Search MCP Server": 220,
    "Email MCP Server": 80,
  },
  {
    timestamp: "20:00",
    "Maps MCP Server": 160,
    "Weather MCP Server": 120,
    "Calendar MCP Server": 100,
    "Search MCP Server": 200,
    "Email MCP Server": 75,
  },
]

const latencyData = [
  {
    timestamp: "00:00",
    "Maps MCP Server": 320,
    "Weather MCP Server": 450,
    "Calendar MCP Server": 280,
    "Search MCP Server": 350,
    "Email MCP Server": 310,
  },
  {
    timestamp: "04:00",
    "Maps MCP Server": 310,
    "Weather MCP Server": 440,
    "Calendar MCP Server": 270,
    "Search MCP Server": 340,
    "Email MCP Server": 300,
  },
  {
    timestamp: "08:00",
    "Maps MCP Server": 330,
    "Weather MCP Server": 460,
    "Calendar MCP Server": 290,
    "Search MCP Server": 360,
    "Email MCP Server": 320,
  },
  {
    timestamp: "12:00",
    "Maps MCP Server": 350,
    "Weather MCP Server": 480,
    "Calendar MCP Server": 300,
    "Search MCP Server": 380,
    "Email MCP Server": 330,
  },
  {
    timestamp: "16:00",
    "Maps MCP Server": 340,
    "Weather MCP Server": 470,
    "Calendar MCP Server": 295,
    "Search MCP Server": 370,
    "Email MCP Server": 325,
  },
  {
    timestamp: "20:00",
    "Maps MCP Server": 330,
    "Weather MCP Server": 460,
    "Calendar MCP Server": 285,
    "Search MCP Server": 360,
    "Email MCP Server": 315,
  },
]

export function ServerMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Metrics</CardTitle>
        <CardDescription>Monitor server performance metrics over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="invocations">
          <TabsList className="mb-4">
            <TabsTrigger value="invocations">Invocations</TabsTrigger>
            <TabsTrigger value="latency">Latency</TabsTrigger>
          </TabsList>
          <TabsContent value="invocations" className="h-[300px]">
            <ChartContainer
              config={{
                "Maps MCP Server": {
                  label: "Maps MCP Server",
                  color: "hsl(var(--chart-1))",
                },
                "Weather MCP Server": {
                  label: "Weather MCP Server",
                  color: "hsl(var(--chart-2))",
                },
                "Calendar MCP Server": {
                  label: "Calendar MCP Server",
                  color: "hsl(var(--chart-3))",
                },
                "Search MCP Server": {
                  label: "Search MCP Server",
                  color: "hsl(var(--chart-4))",
                },
                "Email MCP Server": {
                  label: "Email MCP Server",
                  color: "hsl(var(--chart-5))",
                },
              }}
              className="h-full"
            >
              <LineChart
                data={invocationData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="timestamp" tickLine={false} axisLine={false} />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="Maps MCP Server"
                  stroke="var(--color-Maps MCP Server)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="Weather MCP Server"
                  stroke="var(--color-Weather MCP Server)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="Calendar MCP Server"
                  stroke="var(--color-Calendar MCP Server)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="Search MCP Server"
                  stroke="var(--color-Search MCP Server)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="Email MCP Server"
                  stroke="var(--color-Email MCP Server)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="latency" className="h-[300px]">
            <ChartContainer
              config={{
                "Maps MCP Server": {
                  label: "Maps MCP Server",
                  color: "hsl(var(--chart-1))",
                },
                "Weather MCP Server": {
                  label: "Weather MCP Server",
                  color: "hsl(var(--chart-2))",
                },
                "Calendar MCP Server": {
                  label: "Calendar MCP Server",
                  color: "hsl(var(--chart-3))",
                },
                "Search MCP Server": {
                  label: "Search MCP Server",
                  color: "hsl(var(--chart-4))",
                },
                "Email MCP Server": {
                  label: "Email MCP Server",
                  color: "hsl(var(--chart-5))",
                },
              }}
              className="h-full"
            >
              <LineChart
                data={latencyData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="timestamp" tickLine={false} axisLine={false} />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="Maps MCP Server"
                  stroke="var(--color-Maps MCP Server)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="Weather MCP Server"
                  stroke="var(--color-Weather MCP Server)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="Calendar MCP Server"
                  stroke="var(--color-Calendar MCP Server)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="Search MCP Server"
                  stroke="var(--color-Search MCP Server)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="Email MCP Server"
                  stroke="var(--color-Email MCP Server)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
