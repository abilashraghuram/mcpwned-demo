import React from "react";

interface MCPToolsListProps {
  tools: string[];
}

const MCPToolsList: React.FC<MCPToolsListProps> = ({ tools }) => (
  <div className="rounded-xl border bg-card p-4 shadow max-w-md w-full">
    <h1 className="text-3xl md:text-4xl mb-3 text-primary tracking-tight text-left">MCP Tools</h1>
    <ul className="list-none ml-0 space-y-1">
      {Array.isArray(tools) && tools.length > 0 ? tools.map((tool) => (
        <li key={tool} className="flex items-center text-sm text-foreground pl-1 text-left font-normal">
          <span className="inline-block h-2 w-2 rounded-full bg-red-700 mr-2 animate-pulse-dot"></span>
          {tool}
        </li>
      )) : <li className="text-sm text-foreground pl-1 text-left font-normal">No tools found.</li>}
    </ul>
  </div>
);

export default MCPToolsList; 