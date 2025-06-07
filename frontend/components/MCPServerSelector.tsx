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
  userQuery?: string;
  onUserQueryChange?: (val: string) => void;
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
  userQuery,
  onUserQueryChange,
}) => (
  <div className="w-full flex flex-col items-center">
    <div className="flex flex-row items-end gap-6 w-full max-w-4xl mt-2 mb-2">
      {/* GitHub README URL */}
      <div className="flex flex-col w-full max-w-xs">
        <label className="mb-1 text-sm font-medium text-muted-foreground">GitHub README URL</label>
        <input
          type="text"
          className="rounded-md border px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-background w-full"
          placeholder="https://github.com/user/repo/blob/main/README.md"
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
    {/* User Query full row, only if props provided */}
    {userQuery !== undefined && onUserQueryChange && (
      <div className="flex flex-col w-full max-w-4xl mt-2">
        <label className="mb-1 text-sm font-medium text-muted-foreground">Describe the rule you want to generate</label>
        <input
          type="text"
          className="rounded-md border px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-background w-full"
          placeholder="Describe your scenario here"
          value={userQuery}
          onChange={e => onUserQueryChange(e.target.value)}
        />
      </div>
    )}
  </div>
);

export default MCPServerSelector; 