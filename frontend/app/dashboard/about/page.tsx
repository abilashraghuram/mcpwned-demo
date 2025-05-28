import { DashboardShell } from "@/components/dashboard-shell"

export default function AboutPage() {
  return (
    <DashboardShell>
      <div className="flex justify-center items-start min-h-[60vh] pt-12">
        <div className="bg-card text-card-foreground rounded-xl shadow-lg p-10 max-w-2xl w-full">
          <h1 className="text-3xl mb-4 text-center">About Us</h1>
          <p className="mb-4 text-lg text-center">
            We are the founders of <span className="font-semibold">codeintegrity.ai</span>, a company based in San Francisco and backed by <span className="font-semibold">Antler VC</span>, <span className="font-semibold">Boost VC</span>, and <span className="font-semibold">NEC VC</span>
          </p>
          <p className="mb-4 text-base text-center">
            As adoption of the Model Context Protocol (MCP) accelerates, it becomes crucial to defend against all forms of MCP hijacks—from simple prompt injection to advanced data-flow and control-flow exploits.
          </p>
          <p className="mb-4 text-base text-center">
            To address this growing threat landscape, we&#39;re launching <span className="font-semibold">Mcpwned</span>—a platform purpose-built to provide deep observability and granular, configurable security for MCP environments.
          </p>
          <p className="mb-4 text-base text-center">
            Our platform proxies all communication to MCP and enforces highly specific guardrails. This approach ensures robust security against malicious behavior while preserving the usability developers expect.
          </p>
          <p className="mb-4 text-base text-center text-muted-foreground">More information coming soon.</p>
          <p className="text-base text-center font-semibold mt-6">Contact: <a href="mailto:abi@codeintegrity.ai" className="underline">abi@codeintegrity.ai</a></p>
        </div>
      </div>
    </DashboardShell>
  )
} 