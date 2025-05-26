"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const dailyData = [
  { date: "2023-05-01", invocations: 1200, errors: 30 },
  { date: "2023-05-02", invocations: 1300, errors: 35 },
  { date: "2023-05-03", invocations: 1400, errors: 25 },
  { date: "2023-05-04", invocations: 1350, errors: 40 },
  { date: "2023-05-05", invocations: 1500, errors: 30 },
  { date: "2023-05-06", invocations: 1600, errors: 35 },
  { date: "2023-05-07", invocations: 1450, errors: 28 },
  { date: "2023-05-08", invocations: 1550, errors: 32 },
  { date: "2023-05-09", invocations: 1650, errors: 38 },
  { date: "2023-05-10", invocations: 1700, errors: 42 },
  { date: "2023-05-11", invocations: 1600, errors: 36 },
  { date: "2023-05-12", invocations: 1550, errors: 30 },
  { date: "2023-05-13", invocations: 1500, errors: 28 },
  { date: "2023-05-14", invocations: 1450, errors: 25 },
]

const weeklyData = [
  { week: "Week 1", invocations: 8500, errors: 210 },
  { week: "Week 2", invocations: 9200, errors: 230 },
  { week: "Week 3", invocations: 9800, errors: 245 },
  { week: "Week 4", invocations: 10500, errors: 260 },
]

const monthlyData = [
  { month: "Jan", invocations: 35000, errors: 875 },
  { month: "Feb", invocations: 32000, errors: 800 },
  { month: "Mar", invocations: 38000, errors: 950 },
  { month: "Apr", invocations: 40000, errors: 1000 },
  { month: "May", invocations: 45000, errors: 1125 },
]

const toolDistribution = [
  { name: "Google Maps", value: 35 },
  { name: "Weather API", value: 25 },
  { name: "Calendar", value: 20 },
  { name: "Search", value: 15 },
  { name: "Email", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"]

export function AnalyticsCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Invocations Over Time</CardTitle>
          <CardDescription>Track tool invocations and errors over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily">
            <TabsList className="mb-4">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="h-[300px]">
              <ChartContainer
                config={{
                  invocations: {
                    label: "Invocations",
                    color: "hsl(var(--chart-1))",
                  },
                  errors: {
                    label: "Errors",
                    color: "hsl(var(--destructive))",
                  },
                }}
                className="h-full"
              >
                <LineChart
                  data={dailyData}
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
                  <ChartTooltip content={<ChartTooltipContent />} />
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
            </TabsContent>
            <TabsContent value="weekly" className="h-[300px]">
              <ChartContainer
                config={{
                  invocations: {
                    label: "Invocations",
                    color: "hsl(var(--chart-1))",
                  },
                  errors: {
                    label: "Errors",
                    color: "hsl(var(--destructive))",
                  },
                }}
                className="h-full"
              >
                <LineChart
                  data={weeklyData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="week" tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
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
            </TabsContent>
            <TabsContent value="monthly" className="h-[300px]">
              <ChartContainer
                config={{
                  invocations: {
                    label: "Invocations",
                    color: "hsl(var(--chart-1))",
                  },
                  errors: {
                    label: "Errors",
                    color: "hsl(var(--destructive))",
                  },
                }}
                className="h-full"
              >
                <LineChart
                  data={monthlyData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tool Distribution</CardTitle>
          <CardDescription>Percentage of invocations by tool.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer
            config={{
              value: {
                label: "Invocations",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-full"
          >
            <PieChart>
              <Pie
                data={toolDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {toolDistribution.map((entry, index) => (
                  <Pie key={`cell-${index}`} fill={COLORS[index % COLORS.length]} dataKey={"value"} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {toolDistribution.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center">
                <div className="mr-1 h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-xs">
                  {entry.name} ({entry.value}%)
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Server Performance</CardTitle>
          <CardDescription>Average response time by server (ms).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Maps MCP Server</span>
                <span className="text-sm text-muted-foreground">320ms</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-primary" style={{ width: "64%" }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Weather MCP Server</span>
                <span className="text-sm text-muted-foreground">450ms</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-primary" style={{ width: "90%" }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Calendar MCP Server</span>
                <span className="text-sm text-muted-foreground">280ms</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-primary" style={{ width: "56%" }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Search MCP Server</span>
                <span className="text-sm text-muted-foreground">350ms</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-primary" style={{ width: "70%" }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Email MCP Server</span>
                <span className="text-sm text-muted-foreground">310ms</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-primary" style={{ width: "62%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
