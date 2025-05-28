"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Server } from "lucide-react"
import { useMcpStore } from "@/lib/mcp-state"
import { Skeleton } from "@/components/ui/skeleton"

export function ServerStats() {
  const { servers, isLoading, error, fetchServers } = useMcpStore()

  useEffect(() => {
    fetchServers()
  }, [fetchServers])

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Active MCP Servers</CardTitle>
            <CardDescription>Total servers and status</CardDescription>
          </div>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-16" />
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Active MCP Servers</CardTitle>
            <CardDescription>Error loading server data</CardDescription>
          </div>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm text-destructive">Failed to load server data</div>
        </CardContent>
      </Card>
    )
  }

  const serverCount = Array.isArray(servers) ? servers.length : 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium">Active MCP Servers</CardTitle>
        </div>
        <Server className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <div className="text-2xl font-bold  text-green-500">{serverCount}</div>
          <div className="flex items-center text-sm text-muted-foreground">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Online
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {Array.isArray(servers) && servers.map((server) => (
            <div key={server.id} className="rounded-md p-2">
              <div className="text-xs font-medium">{server.name}</div>
              <div className="text-xs text-muted-foreground ">
                <span className="text-green-500">{server.number_of_tools || 0}</span> {server.number_of_tools === 1 ? 'tool' : 'tools'}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
