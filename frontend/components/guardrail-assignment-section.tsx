"use client"

import React from "react"
import Mlogo from "./Mlogo"

interface Rule {
  title: string;
  description: string;
  section: string;
  codeRule?: boolean;
  code?: string;
}

const rules: Rule[] = [
  // Code rules first
  {
    title: "No Code After URL Fetch",
    description: "Disallow code execution right after fetching a URL.",
    codeRule: true,
    section: "Code Rules",
    code: `response = fetch(url)\n# No code execution should follow directly after fetch!`,
  },
  {
    title: "Code Vulnerability Scan",
    description: "Scan generated Python/Bash for security issues.",
    codeRule: true,
    section: "Code Rules",
    code: `import bandit\n# Run bandit to scan for vulnerabilities\nbandit -r your_script.py`,
  },
  {
    title: "GitHub-to-Pip Safety",
    description: "Detect risky patterns in tool call sequences.",
    codeRule: true,
    section: "Code Rules",
    code: `# Detect pip install from GitHub URLs\nif 'pip install' in command and 'github.com' in command: block()`,
  },
  {
    title: "Excessive Code Smells",
    description: "Check for ill-formed code using static code analysis",
    codeRule: true,
    section: "Code Rules",
    code: `# Use pylint or flake8 for static code analysis\npylint your_script.py`,
  },
  {
    title: "Secret leak detection",
    description: "Make use of Semgrep for deep static code analysis of code",
    codeRule: true,
    section: "Code Rules",
    code: `# Run Semgrep for secret detection\nsemgrep --config=auto your_code/`,
  },
  // Access and content rules below
  {
    title: "Email Restriction",
    description: "Block emails to anyone except 'Peter' after viewing the inbox.",
    section: "Access Rules",
    code: `if recipient != 'Peter':\n    block_email()`
  },
  {
    title: "RAG Protection",
    description: "Prevent unauthorized access to your RAG app.",
    section: "Access Rules",
    code: `# Check user permissions before RAG access\nif not user.is_authorized: deny_access()`
  },
  {
    title: "Block PII",
    description: "Scan for and block PII",
    section: "PII Rules",
    code: `# Use regex or PII detection library\nif contains_pii(text): block()`
  },
  {
    title: "Prompt Injection Guard",
    description: "Spot and stop prompt injection in tool responses.",
    section: "Content Rules",
    code: `# Detect suspicious prompt patterns\nif is_prompt_injection(input): block()`
  },
  {
    title: "Link Trust Filter",
    description: "Block untrusted links from tool outputs.",
    section: "Content Rules",
    code: `# Allow only trusted domains\nif not is_trusted(link): block()`
  },
  {
    title: "Harmful Content Filter",
    description: "Stop processing of toxic or unsafe messages.",
    section: "Content Rules",
    code: `# Use content moderation API\nif is_toxic(message): block()`
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
  const [modalRule, setModalRule] = React.useState<Rule | null>(null);

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
                    className="flex flex-col items-stretch w-full bg-zinc-800/80 rounded-xl p-4 border border-zinc-700 transition group cursor-pointer min-h-[110px] relative"
                  >
                    <div className="flex flex-col flex-1">
                      <input
                        type="checkbox"
                        checked={selectedRules.includes(g.title)}
                        onChange={() => handleToggle(g.title)}
                        className="peer appearance-none w-5 h-5 border-2 border-zinc-500 rounded-md checked:bg-blue-600 checked:border-blue-500 transition mr-2 mb-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        style={{ boxShadow: '0 0 0 2px rgba(59,130,246,0.2)' }}
                      />
                      <span className="text-white font-semibold text-base mb-1 transition">{g.title}</span>
                      <span className="text-zinc-400 text-sm leading-snug mb-4">{g.description}</span>
                      {/* <button
                        type="button"
                        className="mt-auto px-3 py-1.5 bg-zinc-900 text-blue-300 border border-zinc-700 rounded-lg shadow hover:bg-zinc-800 hover:text-blue-400 transition text-xs font-semibold"
                        onClick={(e) => { e.preventDefault(); setModalRule(g); }}
                      >
                        Details
                      </button> */}
                    </div>
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
      {/* Modal for code snippet */}
      {modalRule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setModalRule(null)}>
          <div
            className="bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-700 max-w-md w-full mx-4 p-8 relative animate-fadeIn"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-zinc-400 hover:text-red-400 focus:outline-none"
              onClick={() => setModalRule(null)}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h4 className="text-xl font-bold text-white mb-2">{modalRule.title}</h4>
            <p className="text-zinc-400 mb-4">{modalRule.description}</p>
            <div className="bg-zinc-800 rounded-lg p-4 overflow-x-auto border border-zinc-700">
              <pre className="text-blue-200 text-sm whitespace-pre-wrap"><code>{modalRule.code || 'No code snippet available.'}</code></pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RuleAssignmentSection; 