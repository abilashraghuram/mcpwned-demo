import { create } from 'zustand'
import { getAllMcpServers, getLogsByMcpServerId, getAllLogs, Log, Tool, listAllTools } from './api'

export interface McpServer {
  id: string
  name: string
  url: string | null
  tools?: Array<unknown>
  status?: string
  lastSeen?: string
  number_of_tools?: number
}

interface McpState {
  servers: McpServer[]
  isLoading: boolean
  error: string | null
  fetchServers: () => Promise<void>
  getServerById: (id: string) => McpServer | undefined
  getServerTools: (serverId: string) => number
  getServerStatus: (serverId: string) => 'online' | 'offline'
  getServerLastSeen: (serverId: string) => string

  // New state for logs
  logs: Log[]
  currentMcpServerIdForLogs: string | null
  logsLoading: boolean
  logsError: string | null
  fetchLogsByServerId: (serverId: string) => Promise<void>
  fetchAllLogs: () => Promise<void>

  // Tools state
  tools: Tool[]
  toolsLoading: boolean
  toolsError: string | null
  fetchAllTools: () => Promise<void>
}

export const useMcpStore = create<McpState>((set, get) => ({
  servers: [],
  isLoading: false,
  error: null,

  // Initialize new log states
  logs: [],
  currentMcpServerIdForLogs: null,
  logsLoading: false,
  logsError: null,

  // Initialize tools state
  tools: [],
  toolsLoading: false,
  toolsError: null,

  fetchServers: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await getAllMcpServers()
      type ApiMcpServer = Omit<McpServer, 'number_of_tools'> & { number_of_tools: number | null }
      const servers = (response as ApiMcpServer[]).map((server) => ({
        ...server,
        number_of_tools: server.number_of_tools === null ? undefined : server.number_of_tools,
      }))
      set({ servers, isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch servers',
        isLoading: false 
      })
    }
  },

  getServerById: (id: string) => {
    return get().servers.find(server => server.id === id)
  },

  getServerTools: (serverId: string) => {
    const server = get().getServerById(serverId)
    return server?.tools?.length || 0
  },

  getServerStatus: (serverId: string) => {
    const server = get().getServerById(serverId)
    return (server?.status as 'online' | 'offline') || 'offline'
  },

  getServerLastSeen: (serverId: string) => {
    const server = get().getServerById(serverId)
    return server?.lastSeen 
      ? new Date(server.lastSeen).toLocaleString()
      : 'Never'
  },

  // Implement fetchLogsByServerId
  fetchLogsByServerId: async (serverId: string) => {
    set({ logsLoading: true, logsError: null, currentMcpServerIdForLogs: serverId });
    try {
      const logsResponse = await getLogsByMcpServerId(serverId);
      set({ logs: logsResponse, logsLoading: false });
    } catch (error) {
      set({
        logsError: error instanceof Error ? error.message : 'Failed to fetch logs',
        logsLoading: false,
        logs: [], // Clear logs on error
      });
    }
  },

  // Add fetchAllLogs implementation
  fetchAllLogs: async () => {
    set({ logsLoading: true, logsError: null, currentMcpServerIdForLogs: null });
    try {
      const logsResponse = await getAllLogs();
      set({ logs: logsResponse, logsLoading: false });
    } catch (error) {
      set({
        logsError: error instanceof Error ? error.message : 'Failed to fetch logs',
        logsLoading: false,
        logs: [], // Clear logs on error
      });
    }
  },

  // Add fetchAllTools implementation
  fetchAllTools: async () => {
    set({ toolsLoading: true, toolsError: null });
    try {
      const toolsResponse = await listAllTools();
      set({ tools: toolsResponse, toolsLoading: false });
    } catch (error) {
      set({
        toolsError: error instanceof Error ? error.message : 'Failed to fetch tools',
        toolsLoading: false,
        tools: [], // Clear tools on error
      });
    }
  },
})) 