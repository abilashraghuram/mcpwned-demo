// frontend/lib/api.ts
import type { Tables, TablesInsert, TablesUpdate } from "../../backend/types/database.types";
import axios from 'axios';

// --- Configuration ---
const API_BASE_URL = "https://backend-cold-dawn-201.fly.dev/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    
  },
  
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error Request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// --- Type Definitions ---
export type McpServer = Tables<"mcp_servers">;
export type McpServerInsert = Omit<TablesInsert<"mcp_servers">, "id">;
export type McpServerUpdate = Partial<Omit<TablesUpdate<"mcp_servers">, "id">>;

export type Tool = Tables<"tools">;
export type ToolInsert = Omit<TablesInsert<"tools">, "id">;

export type Log = Tables<"logs">;

export interface LogInputApi {
  mcpServerId: string;
  toolName: string;
  toolInput: string;
  toolResponse: string;
  status: string;
}

// --- MCP Server API Functions ---
export async function getAllMcpServers(): Promise<McpServer[]> {
  // Expect the API to return an object like { data: McpServer[] }
  const response = await api.get<{ data: McpServer[] }>('/mcp-servers/list');
  return response.data.data; // Extract the actual array of servers
}

export async function getMcpServerById(id: string): Promise<McpServer> {
  const response = await api.get<McpServer>(`/mcp-server/${id}`);
  return response.data;
}

export async function createMcpServer(mcpServerData: McpServerInsert): Promise<{ id: string }> {
  const response = await api.post<{ id: string }>('/mcp-server', mcpServerData);
  return response.data;
}

// --- Tool API Functions ---
export async function createTool(toolData: ToolInsert): Promise<{ id: string }> {
  const response = await api.post<{ id: string }>('/tool', toolData);
  return response.data;
}

export async function getToolByNameAndMcpServerId(mcpServerId: string, toolName: string): Promise<Tool> {
  const response = await api.get<Tool>(`/mcp-server/${mcpServerId}/tool/${encodeURIComponent(toolName)}`);
  return response.data;
}

// --- Log API Functions ---
export async function createLog(logData: LogInputApi): Promise<{ id: string }> {
  const response = await api.post<{ id: string }>('/log', logData);
  return response.data;
}

export async function getLogById(id: string): Promise<Log> {
  const response = await api.get<Log>(`/logs/${id}`);
  return response.data;
}

export async function getLogsByMcpServerId(mcpServerId: string): Promise<Log[]> {
  const response = await api.get<Log[]>(`/logs/list/${mcpServerId}`);
  return response.data;
}

export async function getAllLogs(): Promise<Log[]> {
  const response = await api.get<Log[]>('/logs/list/all'); // Assuming this endpoint
  return response.data;
}

export async function listAllTools(): Promise<Tool[]> {
  const response = await api.get<Tool[]>('/tools/list');
  return response.data;
}

