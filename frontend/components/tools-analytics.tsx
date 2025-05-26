"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, AreaChart, Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const invocationData = [
  {
    name: "Mon",
    "Get Directions": 240,
    "Get Weather": 180,
    "Create Event": 150,
    "Search Web": 300,
    "Send Email": 120,
  },
  {
    name: "Tue",
    "Get Directions": 280,
    "Get Weather": 200,
    "Create Event": 170,
    "Search Web": 320,
    "Send Email": 140,
  },
  {
    name: "Wed",
    "Get Directions": 300,
    "Get Weather": 210,
    "Create Event": 180,
    "Search Web": 350,
    "Send Email": 160,
  },
  {
    name: "Thu",
    "Get Directions": 320,
    "Get Weather": 230,
    "Create Event": 190,
    "Search Web": 370,
    "Send Email": 150,
  },
  {
    name: "Fri",
    "Get Directions": 290,
    "Get Weather": 220,
    "Create Event": 160,
    "Search Web": 330,
    "Send Email": 130,
  },
  {
    name: "Sat",
    "Get Directions": 250,
    "Get Weather": 190,
    "Create Event": 140,
    "Search Web": 290,
    "Send Email": 110,
  },
  {
    name: "Sun",
    "Get Directions": 220,
    "Get Weather": 170,
    "Create Event": 130,
    "Search Web": 270,
    "Send Email": 100,
  },
]

const errorData = [
  {
    name: "Mon",
    "Get Directions": 12,
    "Get Weather": 18,
    "Create Event": 8,
    "Search Web": 15,
    "Send Email": 6,
  },
  {
    name: "Tue",
    "Get Directions": 14,
    "Get Weather": 20,
    "Create Event": 9,
    "Search Web": 16,
    "Send Email": 7,
  },
  {
    name: "Wed",
    "Get Directions": 15,
    "Get Weather": 21,
    "Create Event": 9,
    "Search Web": 18,
    "Send Email": 8,
  },
  {
    name: "Thu",
    "Get Directions": 16,
    "Get Weather": 23,
    "Create Event": 10,
    "Search Web": 19,
    "Send Email": 8,
  },
  {
    name: "Fri",
    "Get Directions": 15,
    "Get Weather": 22,
    "Create Event": 8,
    "Search Web": 17,
    "Send Email": 7,
  },
  {
    name: "Sat",
    "Get Directions": 13,
    "Get Weather": 19,
    "Create Event": 7,
    "Search Web": 15,
    "Send Email": 6,
  },
  {
    name: "Sun",
    "Get Directions": 11,
    "Get Weather": 17,
    "Create Event": 7,
    "Search Web": 14,
    "Send Email": 5,
  },
]

export function ToolsAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tool Analytics</CardTitle>
        <CardDescription>Visualize tool invocations and errors over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="invocations">
          <TabsList className="mb-4">
            <TabsTrigger value="invocations">Invocations</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>
          <TabsContent value="invocations" className="h-[300px]">
            <ChartContainer
              config={{
                "Get Directions": {
                  label: "Get Directions",
                  color: "hsl(var(--chart-1))",
                },
                "Get Weather": {
                  label: "Get Weather",
                  color: "hsl(var(--chart-2))",
                },
                "Create Event": {
                  label: "Create Event",
                  color: "hsl(var(--chart-3))",
                },
                "Search Web": {
                  label: "Search Web",
                  color: "hsl(var(--chart-4))",
                },
                "Send Email": {
                  label: "Send Email",
                  color: "hsl(var(--chart-5))",
                },
              }}
              className="h-full"
            >
              <AreaChart
                data={invocationData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="Get Directions"
                  stackId="1"
                  stroke="var(--color-Get Directions)"
                  fill="var(--color-Get Directions)"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="Get Weather"
                  stackId="1"
                  stroke="var(--color-Get Weather)"
                  fill="var(--color-Get Weather)"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="Create Event"
                  stackId="1"
                  stroke="var(--color-Create Event)"
                  fill="var(--color-Create Event)"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="Search Web"
                  stackId="1"
                  stroke="var(--color-Search Web)"
                  fill="var(--color-Search Web)"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="Send Email"
                  stackId="1"
                  stroke="var(--color-Send Email)"
                  fill="var(--color-Send Email)"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="errors" className="h-[300px]">
            <ChartContainer
              config={{
                "Get Directions": {
                  label: "Get Directions",
                  color: "hsl(var(--chart-1))",
                },
                "Get Weather": {
                  label: "Get Weather",
                  color: "hsl(var(--chart-2))",
                },
                "Create Event": {
                  label: "Create Event",
                  color: "hsl(var(--chart-3))",
                },
                "Search Web": {
                  label: "Search Web",
                  color: "hsl(var(--chart-4))",
                },
                "Send Email": {
                  label: "Send Email",
                  color: "hsl(var(--chart-5))",
                },
              }}
              className="h-full"
            >
              <BarChart
                data={errorData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="Get Directions" stackId="a" fill="var(--color-Get Directions)" />
                <Bar dataKey="Get Weather" stackId="a" fill="var(--color-Get Weather)" />
                <Bar dataKey="Create Event" stackId="a" fill="var(--color-Create Event)" />
                <Bar dataKey="Search Web" stackId="a" fill="var(--color-Search Web)" />
                <Bar dataKey="Send Email" stackId="a" fill="var(--color-Send Email)" />
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
