"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Info, XCircle, AlertTriangle } from "lucide-react"
import type { Log } from "@/lib/api";
import { useMcpStore } from "@/lib/mcp-state";
import { LogsFilterState } from "./logs-filter"

interface LogWithTools extends Log {
  tools?: {
    name: string;
  };
}

interface LogsResponse {
  data: LogWithTools[];
}

export function LogsTable({ filters }: { filters: LogsFilterState }) {
  const {
    logs,
    logsLoading,
    logsError,
    fetchAllLogs,
  } = useMcpStore();
  const [selectedLog, setSelectedLog] = useState<LogWithTools | null>(null)

  useEffect(() => {
    fetchAllLogs();
  }, [fetchAllLogs]);

  if (logsLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Clock className="mr-2 h-5 w-5 animate-spin" />
        <p>Loading logs...</p>
      </div>
    );
  }

  if (logsError) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-red-600">
        <AlertTriangle className="mr-2 h-5 w-5" />
        <p>Error loading logs: {logsError}</p>
      </div>
    );
  }

  // Check if logs is an object with a data property
  const logsData = (logs as unknown as LogsResponse)?.data || [];

  // Filter logs based on filters prop
  const filteredLogs = logsData.filter(log => {
    // Status filter
    if (filters.status !== "all" && log.status !== filters.status) return false;
    // Server filter
    if (filters.server !== "all" && log.mcp_server_id !== filters.server) return false;
    // Tool filter
    if (filters.tool !== "all" && log.tools?.name !== filters.tool) return false;
    // Search filter
    if (filters.search && !(
      log.tools?.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      log.tool_input?.toLowerCase().includes(filters.search.toLowerCase())
    )) return false;
    // Date range filter
    if (filters.dateRange?.from && filters.dateRange?.to) {
      const logDate = new Date(log.created_at);
      if (logDate < filters.dateRange.from || logDate > filters.dateRange.to) return false;
    }
    return true;
  });

  if (!filteredLogs || filteredLogs.length === 0) {
    return <p>No logs to display.</p>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tool Name</TableHead>
            <TableHead>MCP Server ID</TableHead>
            <TableHead>Input Arguments</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead className="text-right">Expand Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs.map((log: LogWithTools) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium truncate max-w-[150px]" title={log.tools?.name || 'N/A'}>
                {log.tools?.name || 'N/A'}
              </TableCell>
              <TableCell className="truncate max-w-[150px]" title={log.mcp_server_id || 'N/A'}>
                {log.mcp_server_id || 'N/A'}
              </TableCell>
              <TableCell className="max-w-[200px] truncate" title={log.tool_input || 'N/A'}>
                {log.tool_input || 'N/A'}
              </TableCell>
              <TableCell>
                <Badge
                  variant={log.status === "success" ? "default" : log.status === "error" ? "destructive" : "outline"}
                >
                  {log.status === "success" ? (
                    <CheckCircle className="mr-1 h-3 w-3" />
                  ) : log.status === "error" ? (
                    <XCircle className="mr-1 h-3 w-3" />
                  ) : log.status === "pending" ? (
                    <Clock className="mr-1 h-3 w-3" />
                  ) : (
                    <Info className="mr-1 h-3 w-3" />
                  )}
                  {log.status || 'N/A'}
                </Badge>
              </TableCell>
              <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedLog(log)}>
                      <Info className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Log Details</DialogTitle>
                      <DialogDescription>Detailed information about this log entry.</DialogDescription>
                    </DialogHeader>
                    {selectedLog && (
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="text-sm font-medium">Log ID:</span>
                          <span className="col-span-3">{selectedLog.id}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="text-sm font-medium">Tool Name:</span>
                          <span className="col-span-3">{selectedLog.tools?.name || 'N/A'}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="text-sm font-medium">Server ID:</span>
                          <span className="col-span-3">{selectedLog.mcp_server_id || 'N/A'}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="text-sm font-medium">Status:</span>
                          <span className="col-span-3">
                            <Badge
                              variant={
                                selectedLog.status === "success"
                                  ? "default"
                                  : selectedLog.status === "error"
                                    ? "destructive"
                                    : "outline"
                              }
                            >
                              {selectedLog.status || 'N/A'}
                            </Badge>
                          </span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="text-sm font-medium">Timestamp:</span>
                          <span className="col-span-3">{new Date(selectedLog.created_at).toLocaleString()}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          <span className="text-sm font-medium">Input:</span>
                          <div className="col-span-3 rounded-md bg-muted p-2">
                            <pre className="text-sm whitespace-pre-wrap">{selectedLog.tool_input || 'N/A'}</pre>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          <span className="text-sm font-medium">Response:</span>
                          <div className="col-span-3 rounded-md bg-muted p-2">
                            <pre className="text-sm whitespace-pre-wrap">{selectedLog.tool_response || 'N/A'}</pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

