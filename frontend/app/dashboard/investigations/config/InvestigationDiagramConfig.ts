import { type Node, type Edge } from "@xyflow/react";

export type InvestigationDiagramConfig = {
  label: string;
  nodes: Node[];
  edges: Edge[];
  affectedMcp: {
    name: string;
    tools: string[];
  };
  recommendedGuardrails: string[];
};

export const investigations: Record<string, InvestigationDiagramConfig> = {
  default: {
    label: "K8s MCP multi tool injection vulnerability",
    nodes: [
      { id: "attacker", type: "colored", position: { x: 80, y: 200 }, data: { label: "Attacker", color: "#F87171" } },
      { id: "mcp1", type: "colored", position: { x: 300, y: 200 }, data: { label: "K8s MCP Server - Attacker creates pod in public namespace", color: "#6EE7B7" } },
      { id: "issue", type: "colored", position: { x: 700, y: 300 }, data: { label: "Malicious prompt is in the pod description metadata", color: "#FDE68A" } },
      { id: "ai", type: "colored", position: { x: 1150, y: 200 }, data: { label: "AI Agent", color: "#A5B4FC" } },
      { id: "mcp2", type: "colored", position: { x: 1450, y: 200 }, data: { label: "K8s MCP Server executes malicious operations", color: "#6EE7B7" } },
      { id: "private", type: "colored", position: { x: 1750, y: 80 }, data: { label: "Secrete private Analytics", color: "#E9D5FF" } },
      { id: "public", type: "colored", position: { x: 1750, y: 320 }, data: { label: "Private secrets exfiltrated", color: "#FDE68A" } },
    ],
    edges: [
      { id: "e1", source: "attacker", target: "mcp1", animated: true, style: { stroke: '#22c55e', strokeWidth: 2 } },
      { id: "e2", source: "mcp1", target: "issue", animated: true, style: { stroke: '#22c55e', strokeWidth: 2 } },
      { id: "e3", source: "issue", target: "ai", animated: true, style: { stroke: '#ef4444', strokeWidth: 2 } },
      { id: "e4", source: "ai", target: "mcp2", animated: true, style: { stroke: '#ef4444', strokeWidth: 2 } },
      { id: "e5", source: "mcp2", target: "private", animated: true, style: { stroke: '#ef4444', strokeWidth: 2 } },
      { id: "e6", source: "mcp2", target: "public", animated: true, style: { stroke: '#ef4444', strokeWidth: 2 } },
    ],
    affectedMcp: {
      name: "k8s MCP",
      tools: ["namespaces_list", "pods_exec", "pods_get", "pods_list", "pods_list_in_namespace","pods_log","pods_run"]
    },
    recommendedGuardrails: [
        "Enforce single-namespace access per agent session to prevent cross-namespace data leakage.",
        "Block exec, get, and log actions on pods outside the active namespace context."
      ]
  },
  complex_meeting_notes_exploit: {
    label: "Complex meeting notes exploit",
    nodes: [
      { id: "user", type: "colored", position: { x: 200, y: 200 }, data: { label: "User", color: "#22c55e" } },
      { id: "find_notes", type: "colored", position: { x: 550, y: 120 }, data: { label: "Find recent meeting notes", color: "#6EE7B7" } },
      { id: "extract_conf", type: "colored", position: { x: 850, y: 100 }, data: { label: "Extract confidential.txt from drive", color: "#FDE68A" } },
      { id: "drive", type: "colored", position: { x: 1150, y: 60 }, data: { label: "internal drive", color: "#E9D5FF" } },
      { id: "poison_note", type: "colored", position: { x: 550, y: 300 }, data: { label: "poisoned note", color: "#FDE68A" } },
      { id: "hacker", type: "colored", position: { x: 300, y: 400 }, data: { label: "Hacker", color: "#F87171" } },
      { id: "extract_email", type: "colored", position: { x: 700, y: 400 }, data: { label: "Extract attacker email address", color: "#F87171" } },
      { id: "agent", type: "colored", position: { x: 900, y: 200 }, data: { label: "Agent", color: "#A5B4FC" } },
      { id: "fetch_conf", type: "colored", position: { x: 1300, y: 250 }, data: { label: "Fetch confidential.txt by name", color: "#6EE7B7" } },
      { id: "send_conf", type: "colored", position: { x: 1100, y: 400 }, data: { label: "Send confidential.txt to attacker@evil.com", color: "#F87171" } },
    ],
    edges: [
      // Green (normal) edges
      { id: "e1", source: "user", target: "find_notes", animated: true, style: { stroke: '#22c55e', strokeWidth: 2, strokeDasharray: '4 2' } },
      { id: "e2", source: "find_notes", target: "extract_conf", animated: true, style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '4 2' } },
      { id: "e4", source: "find_notes", target: "poison_note", animated: true, style: { stroke: '#22c55e', strokeWidth: 2, strokeDasharray: '4 2' } },
      { id: "e5", source: "hacker", target: "poison_note", animated: true, style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '4 2' } },
      { id: "e6", source: "poison_note", target: "extract_email", animated: true, style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '4 2' } },
      // Exploit path (red)
      { id: "e3", source: "drive", target: "extract_conf", animated: true, style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '4 2' } },
      { id: "e7", source: "extract_conf", target: "agent", animated: true, style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '4 2' } },
      { id: "e8", source: "agent", target: "fetch_conf", animated: true, style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '4 2' } },
      { id: "e9", source: "fetch_conf", target: "send_conf", animated: true, style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '4 2' } },
      { id: "e10", source: "extract_email", target: "send_conf", animated: true, style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '4 2' } },
    ],
    affectedMcp: {
      name: "meeting summarizer mcp",
      tools: ["summarize_meeting", "read_drive", "send_email"]
    },
    recommendedGuardrails: [
      "Restrict reads to drive, sanitize reads from meeting notes.",
      "Restrict outgoing email to subset cases"
    ]
  },
  code_execution_chain: {
    label: "Unsafe pip install and execution",
    nodes: [
      { id: "read_web", type: "colored", position: { x: 500, y: 200 }, data: { label: "read_web", color: "#6EE7B7" } },
      { id: "bash_pip_install", type: "colored", position: { x: 900, y: 200 }, data: { label: "bash and/or pip install", color: "#FDE68A" } },
      { id: "bash_python_exec", type: "colored", position: { x: 1300, y: 200 }, data: { label: "bash python execution", color: "#A5B4FC" } },
    ],
    edges: [
      { id: "e1", source: "read_web", target: "bash_pip_install", animated: true, style: { stroke: '#22c55e', strokeWidth: 2 } },
      { id: "e2", source: "bash_pip_install", target: "bash_python_exec", animated: true, style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '4 2' } },
    ],
    affectedMcp: {
      name: "code assist mcp",
      tools: ["install_pip", "run_bash"]
    },
    recommendedGuardrails: [
      "Restrict pip installs to approved packages only.",
      "Limit bash execution to non-destructive commands."
    ]
  },
  browserbase_click_loop: {
    label: "Browserbase Click Loop",
    nodes: [
      { id: "click1", type: "colored", position: { x: 700, y: 100 }, data: { label: "browserbase-click", color: "#FDE68A" } },
      { id: "click2", type: "colored", position: { x: 1100, y: 100 }, data: { label: "browserbase-click", color: "#FDE68A" } },
      { id: "click3", type: "colored", position: { x: 900, y: 350 }, data: { label: "browserbase-click", color: "#FDE68A" } },
    ],
    edges: [
      { id: "e1", source: "click1", target: "click2", animated: true, style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '4 2' } },
      { id: "e2", source: "click2", target: "click3", animated: true, style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '4 2' } },
      { id: "e3", source: "click3", target: "click1", animated: true, style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '4 2' } },
    ],
    affectedMcp: {
      name: "browserbase mcp",
      tools: ["browserbase_click"]
    },
    recommendedGuardrails: [
      "Limit the number of consecutive browserbase_click actions to prevent infinite loops."
    ]
  },
  email_exfiltration: {
    label: "Email data exfiltration",
    nodes: [
      { id: "user", type: "colored", position: { x: 500, y: 150 }, data: { label: "User replies to email", color: "#F87171" } },
      { id: "read_inbox", type: "colored", position: { x: 720, y: 150 }, data: { label: "read-inbox-tool", color: "#6EE7B7" } },
      { id: "hacker_prompt", type: "colored", position: { x: 720, y: 300 }, data: { label: "A Hacker Prompt injected email", color: "#FDE68A" } },
      { id: "send_email", type: "colored", position: { x: 1020, y: 150 }, data: { label: "send-email-tool", color: "#6EE7B7" } },
      { id: "private_data", type: "colored", position: { x: 1320, y: 150 }, data: { label: "Private_data_exfiltrated", color: "#E9D5FF" } },
    ],
    edges: [
      { id: "e1", source: "user", target: "read_inbox", animated: true, style: { stroke: '#22c55e', strokeWidth: 2 } },
      { id: "e2", source: "read_inbox", target: "send_email", animated: true, style: { stroke: '#22c55e', strokeWidth: 2 } },
      { id: "e3", source: "read_inbox", target: "hacker_prompt", animated: true, style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '4 2' } },
      { id: "e4", source: "send_email", target: "private_data", animated: true, style: { stroke: '#ef4444', strokeWidth: 2 } },
    ],
    affectedMcp: {
      name: "email mcp",
      tools: ["read_inbox", "send_email"]
    },
    recommendedGuardrails: [
      "Restrict send_email tool to only allow replies to known contacts.",
    ]
  },
  pii_exfiltration: {
    label: "PII exfiltration",
    nodes: [
      { id: "user", type: "colored", position: { x: 500, y: 150 }, data: { label: "User", color: "#F87171" } },
      { id: "send_email", type: "colored", position: { x: 920, y: 150 }, data: { label: "Send_email", color: "#6EE7B7" } },
      { id: "pii_exfil", type: "colored", position: { x: 1300, y: 150 }, data: { label: "PII exfiltrated", color: "#E9D5FF" } },
    ],
    edges: [
      { id: "e1", source: "user", target: "send_email", animated: true, style: { stroke: '#22c55e', strokeWidth: 2, strokeDasharray: '4 2' } },
      { id: "e2", source: "send_email", target: "pii_exfil", animated: true, style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '4 2' } },
    ],
    affectedMcp: {
      name: "email mcp",
      tools: ["send_email"]
    },
    recommendedGuardrails: [
      "Auto redact PII from outgoing email"
    ]
  },
}; 