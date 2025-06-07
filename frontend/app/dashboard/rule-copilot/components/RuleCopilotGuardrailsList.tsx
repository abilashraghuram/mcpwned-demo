import React, { useState } from "react";

interface RuleCopilotGuardrailsListProps {
  guardrails: string[];
  guardrail_code?: string[];
  className?: string;
}

const RuleCopilotGuardrailsList: React.FC<RuleCopilotGuardrailsListProps> = ({ guardrails, guardrail_code, className }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const textToCopy = Array.isArray(guardrail_code) && guardrail_code.length > 0
      ? guardrail_code.join("\n\n")
      : (Array.isArray(guardrails) ? guardrails.join("\n") : "");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 350);
  };

  return (
    <div className={`rounded-xl border bg-card p-4 shadow max-w-3xl w-full relative ${className || ''}`}>
      <button
        onClick={handleCopy}
        className={`absolute top-4 right-4 bg-zinc-800 text-white px-3 py-1 rounded hover:bg-zinc-700 text-xs border border-zinc-600 transition-transform duration-200 ${copied ? 'scale-110 bg-green-600' : ''}`}
        title="Copy"
        style={{ outline: 'none' }}
      >
        {copied ? 'Copied!' : 'Copy Guardrails rule'}
      </button>
      <h1 className="text-3xl md:text-4xl mb-3 text-primary tracking-tight text-left">Guardrails generated</h1>
      <ul className="list-none ml-0 space-y-2">
        {Array.isArray(guardrails) && guardrails.length > 0 ? guardrails.map((g, i) => (
          <li key={i} className="flex items-center text-sm text-foreground text-left font-normal">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse-dot"></span>
            {g}
          </li>
        )) : <li className="text-sm text-foreground text-left font-normal">No guardrails found.</li>}
      </ul>
    </div>
  );
};

export default RuleCopilotGuardrailsList; 