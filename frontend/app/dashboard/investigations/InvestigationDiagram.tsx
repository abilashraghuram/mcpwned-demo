'use client';
import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  type Edge,
  type EdgeTypes,
  type NodeTypes,
  type OnConnect,
  Handle,
  Position,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { investigations, type InvestigationDiagramConfig } from "./InvestigationDiagramConfig";

// Custom node with color
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

const nodeTypes: NodeTypes = {
  colored: ColoredNode,
};

const edgeTypes: EdgeTypes = {};

type InvestigationDiagramProps = {
  investigationKey: string;
};

export default function InvestigationDiagram({ investigationKey }: InvestigationDiagramProps) {
  const config: InvestigationDiagramConfig = investigations[investigationKey] || investigations["default"];
  const [nodes, setNodes, onNodesChange] = useNodesState(config.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(config.edges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds: Edge[]) => addEdge(connection, eds)),
    [setEdges]
  );

  useEffect(() => {
    setNodes(config.nodes);
    setEdges(config.edges);
  }, [investigationKey, setNodes, setEdges, config.nodes, config.edges]);

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
      <div style={{ width: "100%", height: 400, background: "#444444", borderRadius: 8, marginTop: 24 }}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background color="#222222" />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
} 