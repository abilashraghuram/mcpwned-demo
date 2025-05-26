"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const tools = [
  {
    id: "1",
    name: "Get Directions",
    server: "Maps MCP Server",
    invocations: 1250,
    errors: 25,
    avgDuration: 320,
    status: "active",
  },
  {
    id: "2",
    name: "Get Weather",
    server: "Weather MCP Server",
    invocations: 980,
    errors: 45,
    avgDuration: 450,
    status: "active",
  },
  {
    id: "3",
    name: "Create Event",
    server: "Calendar MCP Server",
    invocations: 750,
    errors: 15,
    avgDuration: 280,
    status: "active",
  },
  {
    id: "4",
    name: "Search Web",
    server: "Search MCP Server",
    invocations: 1500,
    errors: 30,
    avgDuration: 350,
    status: "active",
  },
  {
    id: "5",
    name: "Send Email",
    server: "Email MCP Server",
    invocations: 620,
    errors: 10,
    avgDuration: 310,
    status: "active",
  },
  {
    id: "6",
    name: "Find Places",
    server: "Maps MCP Server",
    invocations: 890,
    errors: 20,
    avgDuration: 340,
    status: "active",
  },
  {
    id: "7",
    name: "Get Forecast",
    server: "Weather MCP Server",
    invocations: 720,
    errors: 35,
    avgDuration: 420,
    status: "active",
  },
]

export function ToolsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tool</TableHead>
            <TableHead>Server</TableHead>
            <TableHead>Invocations</TableHead>
            <TableHead>Error Rate</TableHead>
            <TableHead>Avg. Duration</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tools.map((tool) => {
            const errorRate = (tool.errors / tool.invocations) * 100
            return (
              <TableRow key={tool.id}>
                <TableCell className="font-medium">{tool.name}</TableCell>
                <TableCell>{tool.server}</TableCell>
                <TableCell>{tool.invocations.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Progress
                      value={errorRate}
                      className="h-2 w-[60px]"
                      indicatorClassName={
                        errorRate > 5 ? "bg-destructive" : errorRate > 2 ? "bg-yellow-500" : "bg-green-500"
                      }
                    />
                    <span className="text-xs text-muted-foreground">{errorRate.toFixed(1)}%</span>
                  </div>
                </TableCell>
                <TableCell>{tool.avgDuration}ms</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {tool.status}
                  </Badge>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
