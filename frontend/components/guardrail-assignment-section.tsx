"use client"

import React from "react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Check } from "lucide-react"

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
  const [showAttachModal, setShowAttachModal] = React.useState(false);
  const [attachState, setAttachState] = React.useState<'loading' | 'success'>('loading');

  React.useEffect(() => {
    if (attachState === 'success' && showAttachModal) {
      const timer = setTimeout(() => {
        setShowAttachModal(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [attachState, showAttachModal]);

  const handleToggle = (title: string) => {
    setSelectedRules((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const handleAttach = () => {
    setShowAttachModal(true);
    setAttachState('loading');
    setTimeout(() => {
      setAttachState('success');
    }, 2000);
  };

  const grouped = groupBySection(rules)

  return (
    <div className="mt-8 max-w-7xl mx-auto px-2">
      <div className="mb-8">
        <label className="block text-zinc-300 mb-2 font-medium text-lg">Select LLM agent:</label>
        <div className="relative w-full max-w-xs">
          <Select value={selectedServer} onValueChange={setSelectedServer}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select MCP server or LLM interaction" />
            </SelectTrigger>
            <SelectContent>
              {servers.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mb-8">
        {/* <label className="block text-zinc-300 mb-4 font-medium text-lg">Select Rules:</label> */}
        <div className="space-y-4">
          {Object.entries(grouped).map(([section, rails]) => (
            <div key={section} className="mb-8">
              <h3 className="text-2xl mb-4 tracking-wide">{section}</h3>
              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {rails.map((g) => (
                  <Card
                    key={g.title}
                    className={`flex flex-col items-stretch w-full min-w-0 p-3 shadow-sm transition group cursor-pointer min-h-[90px] relative hover:scale-[1.025] hover:shadow-lg hover:border-cyan-400 ${selectedRules.includes(g.title) ? 'border-green-500' : 'border-zinc-600'}`}
                    onClick={() => handleToggle(g.title)}
                  >
                    <div className="flex flex-col flex-1 break-words">
                      <div className="flex items-center mb-2">
                        <span className="text-white text-xl md:text-2xl mb-1 transition break-words">{g.title}</span>
                      </div>
                      <span className="text-zinc-400 text-sm leading-snug mb-4 break-words">{g.description}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="w-96 px-8 py-3 bg-zinc-900/80 text-white border border-zinc-600 rounded-xl shadow-lg text-2xl backdrop-blur-md transition-all duration-150 hover:shadow-xl hover:border-cyan-400 hover:bg-zinc-800/90 focus:ring-2 focus:ring-cyan-400 focus:outline-none flex items-center justify-center"
          onClick={handleAttach}
          aria-label="Attach selected rules"
        >
          <Check className="w-8 h-8 mr-3" />
          <span>Add rules to proxy</span>
        </button>
      </div>
      <Dialog open={showAttachModal} onOpenChange={setShowAttachModal}>
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          {attachState === 'loading' ? (
            <>
              <svg className="animate-spin w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <div className="text-lg font-medium text-center">Adding new rules to proxy...</div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-lg font-semibold text-green-500 text-center">Proxy successfully configured</div>
            </>
          )}
        </DialogContent>
      </Dialog>
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