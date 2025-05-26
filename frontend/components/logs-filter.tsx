"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Search, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useMcpStore } from "@/lib/mcp-state"

export interface LogsFilterState {
  search: string
  status: string
  server: string
  tool: string
  dateRange: { from: Date | null, to: Date | null }
}

export function LogsFilter({ onChange }: { onChange: (filters: LogsFilterState) => void }) {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<LogsFilterState>({
    search: "",
    status: "all",
    server: "all",
    tool: "all",
    dateRange: { from: null, to: null }
  });

  // Get servers and tools for dynamic options
  const { servers, tools } = useMcpStore();

  // Call onChange whenever filters change
  useEffect(() => {
    onChange(filters);
  }, [filters, onChange]);

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search logs..."
            className="pl-8"
            value={filters.search}
            onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
          />
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 lg:hidden">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Logs</SheetTitle>
              <SheetDescription>Apply filters to narrow down your log results.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h4 className="font-medium">Status</h4>
                <Select value={filters.status} onValueChange={status => setFilters(f => ({ ...f, status }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Server</h4>
                <Select value={filters.server} onValueChange={server => setFilters(f => ({ ...f, server }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select server" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Servers</SelectItem>
                    {servers.map(server => (
                      <SelectItem key={server.id} value={server.id}>{server.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Tool</h4>
                <Select value={filters.tool} onValueChange={tool => setFilters(f => ({ ...f, tool }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tool" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tools</SelectItem>
                    {tools && Array.isArray(tools) && tools.map(tool => (
                      <SelectItem key={tool.id} value={tool.name}>{tool.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Date Range</h4>
                <DatePickerWithRange
                  value={filters.dateRange}
                  onChange={dateRange => setFilters(f => ({ ...f, dateRange }))}
                />
              </div>
              <Button onClick={() => setOpen(false)}>Apply Filters</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/* Desktop filters */}
      <div className="hidden space-x-2 lg:flex">
        <Select value={filters.status} onValueChange={status => setFilters(f => ({ ...f, status }))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.server} onValueChange={server => setFilters(f => ({ ...f, server }))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Server" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Servers</SelectItem>
            {servers.map(server => (
              <SelectItem key={server.id} value={server.id}>{server.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filters.tool} onValueChange={tool => setFilters(f => ({ ...f, tool }))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tool" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tools</SelectItem>
            {tools && Array.isArray(tools) && tools.map(tool => (
              <SelectItem key={tool.id} value={tool.name}>{tool.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DatePickerWithRange
          value={filters.dateRange}
          onChange={dateRange => setFilters(f => ({ ...f, dateRange }))}
        />
      </div>
    </div>
  )
}
