import React from "react";

export function RecommendedGuardrails({ guardrails }: { guardrails: string[] }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow max-w-md w-full">
      <h1 className="text-3xl md:text-4xl mb-3 text-primary tracking-tight text-left">Guardrails</h1>
      <div className="text-sm text-muted-foreground mb-2 font-medium text-left">Build guardrails that enforce the following</div>
      <ul className="list-none ml-0 space-y-2">
        {guardrails.map((g, i) => (
          <li key={i} className="flex items-center text-sm text-foreground pl-1 text-left font-normal">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse-dot"></span>
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
} 