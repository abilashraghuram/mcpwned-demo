"use client";
import { DashboardShell } from "@/components/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard-header";
import InvestigationDiagramScan from "./components/InvestigationDiagramScan";
import { useState, useEffect } from "react";
import type { Node as XYNode, Edge as XYEdge } from "@xyflow/react";
import MCPServerSelector from "@/components/MCPServerSelector";
import MCPToolsList from "@/components/MCPToolsList";
import GuardrailsList from "@/components/GuardrailsList";
import { Clock } from "lucide-react";
import { DiagramCache, PlaygroundDiagram } from "@/utils/cache";
import * as EmailValidator from "email-validator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const MOCK_MCP_SERVERS = [
  { id: "mock1", name: "Mock MCP Server 1" },
  { id: "mock2", name: "Mock MCP Server 2" },
  { id: "mock3", name: "Mock MCP Server 3" },
];

// Add GUID generator
function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function PlaygroundPage() {
  const [selectedMcp, setSelectedMcp] = useState(MOCK_MCP_SERVERS[0].name);
  const [diagrams, setDiagrams] = useState<PlaygroundDiagram[]>([]);
  const [selectedDiagramIdx, setSelectedDiagramIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customMcp, setCustomMcp] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [mcpServerError, setMcpServerError] = useState<string | null>(null);

  // Sidebar search state
  const [search, setSearch] = useState("");

  // Waitlist state
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistMessage, setWaitlistMessage] = useState("");
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(true);


  // Restore from cache on mount
  useEffect(() => {
    const cached = DiagramCache.load();
    if (cached && Array.isArray(cached.diagrams) && cached.diagrams.length > 0) {
      // Cast nodes and edges to XYNode and XYEdge for type compatibility
      const diagramsTyped = cached.diagrams.map(d => ({
        ...d,
        nodes: d.nodes as XYNode[],
        edges: d.edges as XYEdge[],
      }));
      setDiagrams(diagramsTyped);
      setEmail(cached.email || "");
      setCustomMcp(cached.mcpQualifiedName || "");
      setSelectedDiagramIdx(0);
      // setSearch(diagramsTyped[0]?.scan_description || ""); // Removed: Do not auto-populate search bar
    }
  }, []);

  // Replace handleGenerate with polling logic
  const handleGenerate = async () => {
    if (!email.trim() || !EmailValidator.validate(email.trim())) {
      setEmailError(true);
      return;
    }
    setDiagrams([]); // Clear previous diagrams immediately
    setLoading(true);
    setError(null);
    setMcpServerError(null);
    const qualifiedName = customMcp.trim();
    if (!qualifiedName) {
      setMcpServerError('Please enter a qualified MCP name.');
      setLoading(false);
      return;
    }
    const guid = generateGUID();
    console.log("[handleGenerate] Generated GUID:", guid);
    try {
      // Step 1: Get tools for MCP server and trigger diagram generation on backend
      const toolsRes = await fetch("/api/mcp-tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: qualifiedName, guid, email: email.trim() }),
      });
      const toolsData = await toolsRes.json();
      if (toolsRes.status !== 200 || !Array.isArray(toolsData.tools) || toolsData.tools.length === 0) {
        setMcpServerError("Invalid MCP qualified name or no tools found. Please check and try again.");
        setLoading(false);
        return;
      }
      // Step 2: Poll for result (start polling immediately after tools fetch succeeds)
      const pollForResult = async () => {
        console.log(`[pollForResult] Polling for GUID: ${guid}`);
        try {
          const statusRes = await fetch(`/api/playground-diagram/status?guid=${guid}`);
          const statusData = await statusRes.json();
          if (statusRes.status === 200 && Array.isArray(statusData.diagrams)) {
            setDiagrams(statusData.diagrams);
            setSelectedDiagramIdx(0);
            setLoading(false);
            clearInterval(pollInterval);
            DiagramCache.save(statusData.diagrams, email.trim(), qualifiedName);
            DiagramCache.saveByScanDescription(statusData.diagrams);
          } else if (statusData.status === 'pending') {
            // Do nothing, keep polling
          } else if (statusData.error) {
            setError("Error encountered, please try again");
            setLoading(false);
            clearInterval(pollInterval);
          }
          // else: keep polling if status is pending
        } catch {
          setError("Error encountered, please try again");
          setLoading(false);
          clearInterval(pollInterval);
        }
      };
      const pollInterval = setInterval(pollForResult, 5000);
      pollForResult();
    } catch {
      setError("Error encountered, please try again");
      setLoading(false);
    }
  };

  // Filtered diagrams for sidebar search
  const filteredDiagrams = diagrams
    .map((diagram, idx) => ({ diagram, idx }))
    .filter(({ diagram }) => {
      if (!search.trim()) return true;
      // Search in guardrails, mcpTools, node labels, and scan_description
      const guardrails = (diagram.guardrails || []).join(" ").toLowerCase();
      const mcpTools = (diagram.mcpTools || []).join(" ").toLowerCase();
      const nodeLabels = (diagram.nodes || []).map(n => n.data?.label || "").join(" ").toLowerCase();
      const scanDescription = (diagram.scan_description || "").toLowerCase();
      return (
        guardrails.includes(search.toLowerCase()) ||
        mcpTools.includes(search.toLowerCase()) ||
        nodeLabels.includes(search.toLowerCase()) ||
        scanDescription.includes(search.toLowerCase())
      );
    });

  const selectedDiagram = filteredDiagrams[selectedDiagramIdx]?.diagram || null;

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EmailValidator.validate(waitlistEmail.trim())) {
      setWaitlistMessage("Please enter a valid email address.");
      return;
    }
    setWaitlistLoading(true);
    setWaitlistMessage("");
    try {
      const res = await fetch("/api/waitlist_add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: waitlistEmail.trim() })
      });
      const data = await res.json();
      if (res.ok && !data.error) {
        setWaitlistMessage("Thank you! You are on the waitlist.");
        setWaitlistEmail("");
      } else {
        setWaitlistMessage(data.error || "Failed to join waitlist. Please try again later.");
      }
    } catch {
      setWaitlistMessage("Failed to join waitlist. Please try again later.");
    }
    setWaitlistLoading(false);
  };

  return (
    <DashboardShell>
      {/* Waitlist box fixed top right, improved style and dismissible */}
      {showWaitlist && (
        <div
          style={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 100,
            maxWidth: "18rem",
            minWidth: "14rem",
            background: "rgba(24,24,27,0.95)",
            border: "1px solid #27272a",
            borderRadius: "0.75rem",
            boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          {/* Close button */}
          <button
            type="button"
            aria-label="Close waitlist box"
            onClick={() => setShowWaitlist(false)}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "1.25rem",
              cursor: "pointer",
              lineHeight: 1
            }}
          >
            ×
          </button>
          <form
            onSubmit={handleWaitlistSubmit}
            className="w-full flex flex-col items-center gap-2"
          >
            <Label
              htmlFor="waitlist-email"
              className="w-full text-center text-sm text-white flex items-center justify-center gap-2"
            >
              Hope you liked the scanner. Feel free to check out the rest of the dashboard and join our official launch waitlist for early access.
            </Label>
            <Input
              id="waitlist-email"
              type="email"
              placeholder="Enter email"
              className="w-full text-white placeholder-white bg-zinc-900 border border-zinc-700"
              required
              value={waitlistEmail}
              onChange={e => setWaitlistEmail(e.target.value)}
              disabled={waitlistLoading}
            />
            <Button type="submit" className="w-full mt-2" disabled={waitlistLoading}>
              {waitlistLoading ? "Joining..." : "Join Waitlist"}
            </Button>
            {waitlistMessage && (
              <div className="w-full text-center text-sm mt-2 text-white">
                {waitlistMessage}
              </div>
            )}
          </form>
        </div>
      )}
      <DashboardHeader
        heading="Scan for control flow, data flow exploits in popular MCP servers"
        text="You can find the qualified name from the Smithery server page&rsquo;s url: https://smithery.ai/server/&lt;qualifiedName&gt;"
      />
      <div className="flex flex-col md:flex-row gap-0 md:gap-8 mt-4">
        {/* Sidebar for searching/selecting investigations, only if diagrams exist */}
        {diagrams.length > 0 && (
          <div className="w-full md:w-56 mb-4 md:mb-0">
            <div className="p-4 border-b">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-muted bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredDiagrams.length === 0 && (
                <div className="p-4 text-muted-foreground text-sm">No diagrams found.</div>
              )}
              <ul className="divide-y">
                {filteredDiagrams.map(({ diagram, idx }) => (
                  <li key={idx}>
                    <button
                      onClick={() => {
                        setSelectedDiagramIdx(idx);
                      }}
                      className={`w-full text-left px-4 py-3 transition-all flex flex-col gap-1 hover:bg-primary/10 focus:bg-primary/10 focus:outline-none
                        ${selectedDiagramIdx === idx ? "bg-primary/10 border-l-4 border-primary" : ""}`}
                    >
                      <span className="font-medium text-base text-primary">
                        {diagram.scan_description || diagram.guardrails[0] || `Diagram ${idx + 1}`}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <main className="flex-1 px-0 md:px-4">
          <div className="mb-4 mt-2 flex flex-col md:flex-row md:items-center gap-4">
            <MCPServerSelector
              servers={MOCK_MCP_SERVERS}
              selected={selectedMcp}
              custom={customMcp}
              onSelect={setSelectedMcp}
              onCustomChange={val => {
                setCustomMcp(val);
                if (mcpServerError) setMcpServerError(null);
              }}
              onGenerate={handleGenerate}
              email={email}
              onEmailChange={e => {
                setEmail(e);
                if (emailError) setEmailError(false);
              }}
              emailError={emailError}
              mcpServerError={mcpServerError}
            />
          </div>
          {loading && (
            <div className="flex items-center justify-center my-8">
              <Clock className="mr-4 h-12 w-12 animate-spin text-primary" />
              <p className="text-2xl text-primary">Scanning for control flow, data flow exploit paths...</p>
            </div>
          )}
          {error && <div className="my-8 text-red-500">{error}</div>}
          {selectedDiagram && (
            <>
              <InvestigationDiagramScan nodes={selectedDiagram.nodes} edges={selectedDiagram.edges} />
              <div className="mt-8 flex flex-col md:flex-row gap-6 md:gap-0 md:space-x-6 items-stretch">
                <MCPToolsList tools={selectedDiagram.mcpTools} />
                <GuardrailsList guardrails={selectedDiagram.guardrails} />
              </div>
            </>
          )}
        </main>
      </div>
    </DashboardShell>
  );
} 