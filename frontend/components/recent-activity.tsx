"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, Clock, XCircle } from "lucide-react"
import { useMcpStore } from "@/lib/mcp-state"

export function RecentActivity() {
  const { toolsLoading, toolsError, fetchAllTools } = useMcpStore();

  useEffect(() => {
    fetchAllTools();
  }, [fetchAllTools]);

  const mockRecentTools = [
    {
      id: "1",
      tool: "Bloomberg Price Fetcher",
      status: "success",
      time: "2024-06-01 10:15",
      duration: "2s",
    },
    {
      id: "2",
      tool: "Kubernetes Pod Inspector",
      status: "error",
      time: "2024-06-01 09:50",
      duration: "1s",
    },
    {
      id: "3",
      tool: "Bloomberg News Aggregator",
      status: "pending",
      time: "2024-06-01 09:30",
      duration: "N/A",
    },
    {
      id: "4",
      tool: "Kubernetes Cluster Health Check",
      status: "success",
      time: "2024-05-31 18:22",
      duration: "3s",
    },
    {
      id: "5",
      tool: "Bloomberg Earnings Calendar",
      status: "success",
      time: "2024-05-31 17:10",
      duration: "4s",
    },
    {
      id: "6",
      tool: "Kubernetes Deployment Manager",
      status: "success",
      time: "2024-05-31 16:45",
      duration: "5s",
    },
  ];

  // Get the 6 most recent tools, handling the data property
  // const recentTools = toolsArray.slice(0, 6).map((tool: { id: string; name: string }) => ({
  //   id: tool.id,
  //   tool: tool.name,
  //   status: "success", // Since status isn't in the tool data, defaulting to success
  //   time: "N/A",      // or a real value if you have it
  //   duration: "N/A",  // or a real value if you have it
  // })) || [];
  const recentTools = mockRecentTools;

  if (toolsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Loading latest tool invocations...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[220px]">
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
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Error loading tool invocations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[220px]">
            <p className="text-destructive">{toolsError}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Top MCP tools by usage</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[220px]">
          <div className="space-y-4">
            {recentTools.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  {activity.status === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : activity.status === "error" ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium leading-none">{activity.tool}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-muted-foreground">{activity.duration}</p>
                  <Badge
                    variant={
                      activity.status === "success"
                        ? "default"
                        : activity.status === "error"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))}
            {recentTools.length === 0 && (
              <div className="flex items-center justify-center h-[180px]">
                <p className="text-muted-foreground">No recent tool activity</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
