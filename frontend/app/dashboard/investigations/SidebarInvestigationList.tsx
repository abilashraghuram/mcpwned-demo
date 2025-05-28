import { useState, useMemo } from "react";
import { investigations } from "./InvestigationDiagramConfig";

function SidebarInvestigationList({ selected, setSelected }: { selected: string; setSelected: (key: string) => void }) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    if (!search.trim()) return Object.entries(investigations);
    return Object.entries(investigations).filter(([, config]) =>
      config.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);
  return (
    <aside className="w-full md:w-56 border-r bg-background flex flex-col h-full min-h-[500px] max-h-[700px] md:max-h-[calc(100vh-120px)]">
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search investigations..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-muted bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <div className="p-4 text-muted-foreground text-sm">No investigations found.</div>
        )}
        <ul className="divide-y">
          {filtered.map(([key, config]) => (
            <li key={key}>
              <button
                onClick={() => setSelected(key)}
                className={`w-full text-left px-4 py-3 transition-all flex flex-col gap-1 hover:bg-primary/10 focus:bg-primary/10 focus:outline-none
                  ${selected === key ? "bg-primary/10 border-l-4 border-primary" : ""}`}
              >
                <span className="font-medium text-base text-primary">{config.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default SidebarInvestigationList; 