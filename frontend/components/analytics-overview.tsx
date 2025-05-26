"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, BarChart3, Clock, Server, Zap } from "lucide-react"

export function AnalyticsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Total Invocations</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </div>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45,231</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <ArrowUp className="h-3 w-3 text-green-500" />
            <span className="text-green-500">12.5%</span>
            <span>from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </div>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">320ms</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <ArrowDown className="h-3 w-3 text-green-500" />
            <span className="text-green-500">5.2%</span>
            <span>from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </div>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2.4%</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <ArrowDown className="h-3 w-3 text-green-500" />
            <span className="text-green-500">0.8%</span>
            <span>from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Active Servers</CardTitle>
            <CardDescription>Current status</CardDescription>
          </div>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5/5</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span className="text-green-500">100% uptime</span>
            <span>last 7 days</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
