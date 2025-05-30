import React from "react";

export function AffectedMcp({ affectedMcp }: { affectedMcp: { name: string; tools: string[] } }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow max-w-md w-full">
      <h1 className="text-3xl md:text-4xl mb-3 text-primary tracking-tight text-left">{affectedMcp.name}</h1>
      <div className="text-sm text-muted-foreground mb-2 font-medium text-left">Affected Tools:</div>
      <ul className="list-none ml-0 space-y-1">
        {affectedMcp.tools.map(tool => (
          <li key={tool} className="flex items-center text-sm text-foreground pl-1 text-left font-normal">
            <span className="inline-block h-2 w-2 rounded-full bg-red-700 mr-2 animate-pulse-dot"></span>
            {tool}
          </li>
        ))}
      </ul>
    </div>
  );
} 