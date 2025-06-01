import React from "react";

interface GuardrailsListProps {
  guardrails: string[];
}

const GuardrailsList: React.FC<GuardrailsListProps> = ({ guardrails }) => (
  <div className="rounded-xl border bg-card p-4 shadow max-w-md w-full">
    <h1 className="text-3xl md:text-4xl mb-3 text-primary tracking-tight text-left">Guardrails</h1>
    <ul className="list-none ml-0 space-y-2">
      {Array.isArray(guardrails) && guardrails.length > 0 ? guardrails.map((g, i) => (
        <li key={i} className="flex items-center text-sm text-foreground text-left font-normal">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse-dot"></span>
          {g}
        </li>
      )) : <li className="text-sm text-foreground text-left font-normal">No guardrails found.</li>}
    </ul>
  </div>
);

export default GuardrailsList; 