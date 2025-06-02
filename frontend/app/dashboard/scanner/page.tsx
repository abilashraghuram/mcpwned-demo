"use client";
import { DashboardShell } from "@/components/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard-header";
import InvestigationDiagram from "../investigations/components/InvestigationDiagram";
import { useState, useEffect } from "react";
import type { Node as XYNode, Edge as XYEdge } from "@xyflow/react";
import MCPServerSelector from "@/components/MCPServerSelector";
import MCPToolsList from "@/components/MCPToolsList";
import GuardrailsList from "@/components/GuardrailsList";
import { Clock } from "lucide-react";
import { DiagramCache, PlaygroundDiagram } from "@/utils/cache";
import * as EmailValidator from "email-validator";


const MOCK_MCP_SERVERS = [
  { id: "mock1", name: "Mock MCP Server 1" },
  { id: "mock2", name: "Mock MCP Server 2" },
  { id: "mock3", name: "Mock MCP Server 3" },
];

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
  // const [waitlistEmail, setWaitlistEmail] = useState("");


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
      setSearch(diagramsTyped[0]?.scan_description || ""); // Set search bar to first scan_description
    }
  }, []);

  // New handler for Generate button
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
    try {
      // Step 1: Get tools for MCP server
      const toolsRes = await fetch("/api/mcp-tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: qualifiedName }),
      });
      const toolsData = await toolsRes.json();
      if (toolsRes.status !== 200 || !Array.isArray(toolsData.tools) || toolsData.tools.length === 0) {
        setMcpServerError("Invalid MCP qualified name or no tools found. Please check and try again.");
        setLoading(false);
        return;
      }
      // Step 2: Generate diagrams with tools
      const diagramRes = await fetch("/api/playground-diagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tools: toolsData.tools,
          email: email.trim(),
          mcp_qualified_name: qualifiedName
        }),
      });
      const diagramData = await diagramRes.json();
      if (diagramRes.status !== 200 || diagramData.error) {
        setError("Error encountered, please try again");
        setLoading(false);
        return;
      }
      const diagramsArr = Array.isArray(diagramData.diagrams) ? diagramData.diagrams : [];
      setDiagrams(diagramsArr);
      setSelectedDiagramIdx(0);
      setLoading(false);
      // Save to cache
      DiagramCache.save(diagramsArr, email.trim(), qualifiedName);
      DiagramCache.saveByScanDescription(diagramsArr); // Save each by scan_description
      setSearch(diagramsArr[0]?.scan_description || ""); // Set search bar to first scan_description
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

  // const handleWaitlistSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!EmailValidator.validate(waitlistEmail.trim())) {
  //     setWaitlistMessage("Please enter a valid email address.");
  //     return;
  //   }
  //   setWaitlistLoading(true);
  //   setWaitlistMessage("");
  //   setTimeout(() => {
  //     setWaitlistLoading(false);
  //     setWaitlistMessage("Thank you! You are on the waitlist.");
  //     setWaitlistEmail("");
  //   }, 1200);
  //   // Here you could add API call to actually submit the email
  // };

  return (
    <DashboardShell>
      {/* Waitlist box fixed top right */}
      {/* <div style={{ position: "fixed", top: 32, right: 32, zIndex: 100, maxWidth: '16rem' }}>
        <form
          onSubmit={handleWaitlistSubmit}
          className="bg-black border border-white rounded-lg shadow-lg p-4 w-64 flex flex-col items-center gap-2"
        >
          <Label htmlFor="waitlist-email" className="w-full text-center text-sm text-white flex items-center justify-center gap-2">
            Welcome to Mcpwned — Early access preview. Join our official launch waitlist.
          </Label>
          <Input
            id="waitlist-email"
            type="email"
            placeholder="Enter email"
            className="w-full text-white placeholder-white bg-black border border-white"
            required
            value={waitlistEmail}
            onChange={e => setWaitlistEmail(e.target.value)}
            disabled={waitlistLoading}
          />
          <Button type="submit" className="w-full mt-2" disabled={waitlistLoading}>
            {waitlistLoading ? "Joining..." : "Join Waitlist"}
          </Button>
          {waitlistMessage && <div className="w-full text-center text-sm mt-2 text-white">{waitlistMessage}</div>}
        </form>
      </div> */}
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
              <InvestigationDiagram nodes={selectedDiagram.nodes} edges={selectedDiagram.edges} />
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