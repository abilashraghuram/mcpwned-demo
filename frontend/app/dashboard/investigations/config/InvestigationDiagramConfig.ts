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
      name: "email_mcp",
      tools: ["read_inbox", "send_email"]
    },
    recommendedGuardrails: [
      "Restrict send_email tool to only allow replies to known contacts.",
    ]
  }
//   alt: {
//     label: "Insider Threat Data Exfiltration",
//     nodes: [
//       { id: "insider", type: "colored", position: { x: 0, y: 200 }, data: { label: "Insider", color: "#F87171" } },
//       { id: "internal", type: "colored", position: { x: 300, y: 200 }, data: { label: "Internal System", color: "#6EE7B7" } },
//       { id: "data", type: "colored", position: { x: 650, y: 200 }, data: { label: "Sensitive Data", color: "#E9D5FF" } },
//       { id: "exfil", type: "colored", position: { x: 1000, y: 200 }, data: { label: "Exfiltration Channel", color: "#FDE68A" } },
//       { id: "external", type: "colored", position: { x: 1350, y: 200 }, data: { label: "External Entity", color: "#A5B4FC" } },
//     ],
//     edges: [
//       { id: "a1", source: "insider", target: "internal", animated: true, style: { stroke: '#222', strokeWidth: 2 } },
//       { id: "a2", source: "internal", target: "data", animated: true, style: { stroke: '#222', strokeWidth: 2 } },
//       { id: "a3", source: "data", target: "exfil", animated: true, style: { stroke: '#222', strokeWidth: 2 } },
//       { id: "a4", source: "exfil", target: "external", animated: true, style: { stroke: '#222', strokeWidth: 2 } },
//     ],
//     affectedMcp: {
//       name: "Internal Data MCP",
//       tools: ["Data Export", "File Transfer"]
//     },
//     recommendedGuardrails: [
//       "Restrict data export permissions to trusted users only.",
//       "Enable anomaly detection for large or unusual data transfers.",
//       "Log and review all file transfer activities.",
//       "Implement multi-factor authentication for sensitive operations."
//     ]
//   },
}; 