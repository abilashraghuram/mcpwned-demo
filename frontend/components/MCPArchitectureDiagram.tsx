'use client';
import React from "react";
import {
  ReactFlow,
  Background,
  Handle,
  Position,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

function ColoredNode({ data }: NodeProps) {
  const { label, color } = data as { label: string; color: string };
  return (
    <div style={{
      background: color,
      color: '#000',
      padding: 12,
      borderRadius: 12,
      minWidth: 120,
      textAlign: 'center',
      fontWeight: 500,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }}>
      {label}
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
}

const nodeTypes = {
  colored: ColoredNode,
};

const nodes = [
  { id: "agent", type: "colored", position: { x: 0, y: 0 }, data: { label: "Agent or AI system", color: "#FDE68A" } },
  { id: "proxy", type: "colored", position: { x: 100, y: 120 }, data: { label: "mcpwned gateway", color: "#A5B4FC" } },
  { id: "llm", type: "colored", position: { x: 0, y: 240 }, data: { label: "LLM or MCP server", color: "#6EE7B7" } },
  { id: "rules", type: "colored", position: { x: 300, y: 120 }, data: { label: "mcpwned heuristics and rule enforcement engine", color: "#F87171" } },
];

const edges = [
  { id: "e1", source: "agent", target: "proxy", animated: true, style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '6 3' } },
  { id: "e2", source: "proxy", target: "llm", animated: true, style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '6 3' } },
  { id: "e3", source: "proxy", target: "rules", animated: true, style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '2 2' } },
  { id: "e4", source: "rules", target: "proxy", animated: true, style: { stroke: '#22c55e', strokeWidth: 2, strokeDasharray: '4 2' } },
  { id: "e5", source: "llm", target: "proxy", animated: true, style: { stroke: '#22c55e', strokeWidth: 2, strokeDasharray: '6 3' } },
  { id: "e6", source: "proxy", target: "agent", animated: true, style: { stroke: '#22c55e', strokeWidth: 2, strokeDasharray: '6 3' } },
];

export default function MCPArchitectureDiagram({ height = 350 }: { height?: number }) {
  return (
    <>
      <style>{`
        .react-flow__node, .react-flow__node-default, .react-flow__node-input, .react-flow__node-output {
          color: #000 !important;
        }
        .react-flow__controls, 
        .react-flow__controls button, 
        .react-flow__controls svg {
          color: #000 !important;
          fill: #000 !important;
        }
      `}</style>
      <div style={{ width: "100%", height, background: "#222", borderRadius: 8, marginTop: 24 }}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          fitView
        >
          <Background color="#444" />
        </ReactFlow>
      </div>
    </>
  );
} 