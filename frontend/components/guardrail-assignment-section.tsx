"use client"

import React from "react"
import Mlogo from "./Mlogo"

interface Rule {
  title: string;
  description: string;
  section: string;
  codeRule?: boolean;
}

const rules: Rule[] = [
  // Code rules first
  {
    title: "No Code After URL Fetch",
    description: "Disallow code execution right after fetching a URL.",
    codeRule: true,
    section: "Code Rules",
  },
  {
    title: "Code Vulnerability Scan",
    description: "Scan generated Python/Bash for security issues.",
    codeRule: true,
    section: "Code Rules",
  },
  {
    title: "GitHub-to-Pip Safety",
    description: "Detect risky patterns in tool call sequences.",
    codeRule: true,
    section: "Code Rules",
  },
  {
    title: "Excessive Code Smells",
    description: "Check for ill-formed code using static code analysis",
    codeRule: true,
    section: "Code Rules",
  },
  {
    title: "Secret leak detection",
    description: "Make use of Semgrep for deep static code analysis of code",
    codeRule: true,
    section: "Code Rules",
  },
  // Access and content rules below
  {
    title: "Email Restriction",
    description: "Block emails to anyone except 'Peter' after viewing the inbox.",
    section: "Access Rules",
  },
  {
    title: "RAG Protection",
    description: "Prevent unauthorized access to your RAG app.",
    section: "Access Rules",
  },
  {
    title: "Block PII",
    description: "Scan for and block PII",
    section: "PII Rules",
  },
  {
    title: "Prompt Injection Guard",
    description: "Spot and stop prompt injection in tool responses.",
    section: "Content Rules",
  },
  {
    title: "Link Trust Filter",
    description: "Block untrusted links from tool outputs.",
    section: "Content Rules",
  },
  {
    title: "Harmful Content Filter",
    description: "Stop processing of toxic or unsafe messages.",
    section: "Content Rules",
  },
]

const servers = [
  { id: "financial_datasets_mcp", name: "financial_datasets mcp" },
  { id: "bloomberg_mcp", name: "bloomberg_mcp" },
  { id: "postgresql_mcp", name: "postgresql_mcp" },
  { id: "slack_mcp", name: "slack_mcp" },
  { id: "grafana_mcp", name: "grafana_mcp" },
  { id: "kagi_search_mcp", name: "kagi_search_mcp" },
]

function groupBySection(rules: Rule[]): Record<string, Rule[]> {
  return rules.reduce((acc: Record<string, Rule[]>, g: Rule) => {
    if (!acc[g.section]) acc[g.section] = []
    acc[g.section].push(g)
    return acc
  }, {})
}

function RuleAssignmentSection() {
  const [selectedServer, setSelectedServer] = React.useState(servers[0].id);
  const [selectedRules, setSelectedRules] = React.useState<string[]>([]);

  const handleToggle = (title: string) => {
    setSelectedRules((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const grouped = groupBySection(rules)

  return (
    <div className="mt-10 p-8 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-2xl border border-zinc-800 shadow-2xl max-w-7xl mx-auto">
      <h2 className="text-2xl mb-6 text-white tracking-tight flex items-center gap-3">
        <span className="inline-block  px-3 py-1 rounded-lg text-lg"><Mlogo style={{ display: 'inline', verticalAlign: 'middle', width: 28, height: 28 }} /></span>
        Configure Rules for MCP Servers
      </h2>
      <div className="mb-8">
        <label className="block text-zinc-300 mb-2 font-medium text-lg">Select MCP Server:</label>
        <div className="relative w-full max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none select-none" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zinc-500">
              <rect x="2" y="3" width="16" height="5" rx="1.5" fill="currentColor"/>
              <rect x="2" y="12" width="16" height="5" rx="1.5" fill="currentColor"/>
              <rect x="2" y="7.5" width="16" height="5" rx="1.5" fill="currentColor" fillOpacity="0.7"/>
              <circle cx="5.5" cy="5.5" r="0.8" fill="#3B82F6"/>
              <circle cx="5.5" cy="14.5" r="0.8" fill="#3B82F6"/>
            </svg>
          </span>
          <select
            className="pl-10 pr-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full appearance-none transition"
            value={selectedServer}
            onChange={(e) => setSelectedServer(e.target.value)}
          >
            {servers.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-8">
        <label className="block text-zinc-300 mb-4 font-medium text-lg">Select Rules:</label>
        <div className="space-y-8">
          {Object.entries(grouped).map(([section, rails]) => (
            <div key={section}>
              <h3 className="text-lg font-semibold mb-3 tracking-wide uppercase">{section}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {rails.map((g) => (
                  <label
                    key={g.title}
                    className="flex flex-col items-start bg-zinc-800/80 rounded-xl p-4 border border-zinc-700 shadow hover:shadow-blue-900/30 transition group cursor-pointer min-h-[110px] relative"
                  >
                    <input
                      type="checkbox"
                      checked={selectedRules.includes(g.title)}
                      onChange={() => handleToggle(g.title)}
                      className="peer appearance-none w-5 h-5 border-2 border-zinc-500 rounded-md checked:bg-blue-600 checked:border-blue-500 transition mr-2 mb-2 focus:ring-2 focus:ring-blue-400 outline-none"
                      style={{ boxShadow: '0 0 0 2px rgba(59,130,246,0.2)' }}
                    />
                    <span className="absolute top-4 right-4 text-xs px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 font-semibold uppercase tracking-wider" style={{display: g.codeRule ? 'block' : 'none'}}>Code</span>
                    <span className="text-white font-semibold text-base mb-1 transition">{g.title}</span>
                    <span className="text-zinc-400 text-sm leading-snug">{g.description}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="mt-2 px-6 py-3 bg-black text-white rounded-xl shadow-2xl border border-zinc-700 hover:scale-105 hover:shadow-zinc-900/40 focus:ring-2 focus:ring-zinc-400 transition text-lg font-semibold w-full max-w-xs mx-auto block"
        onClick={() => alert(`Attached rules to ${selectedServer}`)}
      >
        Attach Selected Rules
      </button>
    </div>
  );
}

export default RuleAssignmentSection; 