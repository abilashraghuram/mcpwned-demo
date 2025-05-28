"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Server, Info, CheckCircle } from "lucide-react"
import { useMcpStore } from "@/lib/mcp-state"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import React from "react"

// Copy rules and groupBySection from guardrail-assignment-section.tsx
const rules = [
  { title: "No Code After URL Fetch", description: "Disallow code execution right after fetching a URL.", codeRule: true, section: "Code Rules", code: `response = fetch(url)\n# No code execution should follow directly after fetch!` },
  { title: "Code Vulnerability Scan", description: "Scan generated Python/Bash for security issues.", codeRule: true, section: "Code Rules", code: `import bandit\n# Run bandit to scan for vulnerabilities\nbandit -r your_script.py` },
  { title: "GitHub-to-Pip Safety", description: "Detect risky patterns in tool call sequences.", codeRule: true, section: "Code Rules", code: `# Detect pip install from GitHub URLs\nif 'pip install' in command and 'github.com' in command: block()` },
  { title: "Excessive Code Smells", description: "Check for ill-formed code using static code analysis", codeRule: true, section: "Code Rules", code: `# Use pylint or flake8 for static code analysis\npylint your_script.py` },
  { title: "Secret leak detection", description: "Make use of Semgrep for deep static code analysis of code", codeRule: true, section: "Code Rules", code: `# Run Semgrep for secret detection\nsemgrep --config=auto your_code/` },
  { title: "Email Restriction", description: "Block emails to anyone except 'Peter' after viewing the inbox.", section: "Access Rules", code: `if recipient != 'Peter':\n    block_email()` },
  { title: "RAG Protection", description: "Prevent unauthorized access to your RAG app.", section: "Access Rules", code: `# Check user permissions before RAG access\nif not user.is_authorized: deny_access()` },
  { title: "Block PII", description: "Scan for and block PII", section: "PII Rules", code: `# Use regex or PII detection library\nif contains_pii(text): block()` },
  { title: "Prompt Injection Guard", description: "Spot and stop prompt injection in tool responses.", section: "Content Rules", code: `# Detect suspicious prompt patterns\nif is_prompt_injection(input): block()` },
  { title: "Link Trust Filter", description: "Block untrusted links from tool outputs.", section: "Content Rules", code: `# Allow only trusted domains\nif not is_trusted(link): block()` },
  { title: "Harmful Content Filter", description: "Stop processing of toxic or unsafe messages.", section: "Content Rules", code: `# Use content moderation API\nif is_toxic(message): block()` },
]

type Rule = {
  title: string;
  description: string;
  section: string;
  codeRule?: boolean;
  code?: string;
};

type GroupedRules = Record<string, Rule[]>;

function groupBySection(rules: Rule[]): GroupedRules {
  return rules.reduce((acc: GroupedRules, g: Rule) => {
    if (!acc[g.section]) acc[g.section] = [];
    acc[g.section].push(g);
    return acc;
  }, {});
}

export function ServerStats() {
  const { servers, isLoading, error, fetchServers } = useMcpStore()
  const [openServerId, setOpenServerId] = useState<string | null>(null)

  React.useEffect(() => {
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
  const grouped = groupBySection(rules)

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
            <div key={server.id} className="rounded-md p-2 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium">{server.name}</span>
                <div className="text-xs text-muted-foreground ">
                  <span className="text-green-500">{server.number_of_tools || 0}</span> {server.number_of_tools === 1 ? 'tool' : 'tools'}
                </div>
              </div>
              <Dialog open={openServerId === server.id} onOpenChange={open => setOpenServerId(open ? server.id : null)}>
                <DialogTrigger asChild>
                  <button className="ml-2 p-1 rounded hover:bg-zinc-200/30" aria-label="Show guardrails">
                    <Info className="w-4 h-4 text-blue-500" />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-lg font-bold mb-2">Guardrails for {server.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 max-h-96 overflow-y-auto px-1 pb-2">
                    {Object.entries(grouped).map(([section, rails]) => (
                      <div key={section}>
                        <div className="font-semibold text-base mb-3 text-zinc-800 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-700 pb-1 tracking-wide uppercase">{section}</div>
                        <ul className="flex flex-col gap-2">
                          {(rails as Rule[]).map((rule: Rule) => (
                            <li key={rule.title} className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-md px-3 py-2 shadow-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{rule.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
