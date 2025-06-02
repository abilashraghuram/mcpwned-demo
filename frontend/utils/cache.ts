import type { Node as XYNode, Edge as XYEdge } from "@xyflow/react";
// Utility class for caching diagrams in localStorage
export type PlaygroundDiagram = {
  nodes: XYNode[];
  edges: XYEdge[];
  guardrails: string[];
  mcpTools: string[];
  scan_description: string;
};

export class DiagramCache {
  private static readonly STORAGE_KEY = 'playground_diagrams_cache_v1';

  static save(diagrams: PlaygroundDiagram[], email: string, mcpQualifiedName: string) {
    const cacheData = {
      diagrams,
      email,
      mcpQualifiedName,
      timestamp: Date.now(),
    };
    try {
      localStorage.setItem(DiagramCache.STORAGE_KEY, JSON.stringify(cacheData));
    } catch {
      // Handle storage errors (e.g., quota exceeded)
      // Optionally log or ignore
    }
  }

  static load(): {
    diagrams: PlaygroundDiagram[];
    email: string;
    mcpQualifiedName: string;
    timestamp: number;
  } | null {
    try {
      const raw = localStorage.getItem(DiagramCache.STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  static clear() {
    try {
      localStorage.removeItem(DiagramCache.STORAGE_KEY);
    } catch {}
  }

  static saveByScanDescription(diagrams: PlaygroundDiagram[]) {
    try {
      diagrams.forEach(diagram => {
        if (diagram.scan_description) {
          localStorage.setItem(
            `diagram_${diagram.scan_description}`,
            JSON.stringify(diagram)
          );
        }
      });
    } catch {}
  }

  static loadByScanDescription(scanDescription: string): PlaygroundDiagram | null {
    try {
      const raw = localStorage.getItem(`diagram_${scanDescription}`);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
} 