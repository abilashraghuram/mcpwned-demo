import React from "react";

interface MCPServerSelectorProps {
  servers: { id: string; name: string }[];
  selected: string;
  custom: string;
  onSelect: (name: string) => void;
  onCustomChange: (val: string) => void;
  onGenerate: () => void;
  email: string;
  onEmailChange: (val: string) => void;
  emailError?: boolean;
  mcpServerError?: string | null;
}

const MCPServerSelector: React.FC<MCPServerSelectorProps> = ({
  // servers,
  // selected,
  // onSelect,
  custom,
  onCustomChange,
  onGenerate,
  email,
  onEmailChange,
  emailError = false,
  mcpServerError = null,
}) => (
  <div className="w-full flex justify-center">
    <div className="flex flex-row items-end gap-6 w-full max-w-4xl mt-2 mb-2">
      {/* MCP Qualified Name */}
      <div className="flex flex-col w-full max-w-xs">
        <label className="mb-1 text-sm font-medium text-muted-foreground">MCP Qualified Name</label>
        <input
          type="text"
          className="rounded-md border px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-background w-full"
          placeholder="eg. @smithery/notion"
          value={custom}
          onChange={e => onCustomChange(e.target.value)}
        />
        {mcpServerError && (
          <span className="text-red-500 text-xs mt-1">{mcpServerError}</span>
        )}
      </div>
      {/* Email */}
      <div className="flex flex-col w-full max-w-xs">
        <label className="mb-1 text-sm font-medium text-muted-foreground">Email</label>
        <input
          type="email"
          className={`rounded-md border px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-background w-full ${emailError ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Enter email id"
          value={email}
          onChange={e => onEmailChange(e.target.value)}
        />
        {emailError && (
          <span className="text-red-500 text-xs mt-1">Email is required</span>
        )}
      </div>
      {/* Generate Button */}
      <div className="flex flex-col justify-end h-full">
        <label className="mb-1 invisible">Generate</label>
        <button
          className="h-11 px-6 rounded-md bg-black text-white font-medium hover:bg-neutral-900 transition-colors border border-white"
          style={{ minWidth: 120 }}
          onClick={onGenerate}
        >
          Generate
        </button>
      </div>
    </div>
    {/* Move the help text below the row */}
  </div>
);

export default MCPServerSelector; 