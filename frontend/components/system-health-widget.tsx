import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function SystemHealthWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-sm font-medium">Status: <span className="text-green-600">Healthy</span></span>
        </div>
      </CardContent>
    </Card>
  );
} 