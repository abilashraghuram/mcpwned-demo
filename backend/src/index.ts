import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { createLog, createMcpServer, createTool, getToolByNameAndMcpServerId, listMcpServers, getMcpServer, getLog, listLogsByMcpServer, listAllTools, getMcpServerTools, listAllLogs, clearLogs } from './db.js'
import type { Database } from '../types/database.types.js'
import { cors } from 'hono/cors'
import fs from 'fs/promises'
import path from 'path'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use('/api/*', cors({
  origin: '*',
  allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
}));

app.post('/api/mcp-server', async (c) => {
  const body = await c.req.json();
  const mcpServer = body as Database["public"]["Tables"]["mcp_servers"]["Insert"];
  const result = await createMcpServer(mcpServer)
  return c.json(result)
})

app.get('/api/mcp-server/:id', async (c) => {
  const id = c.req.param("id");
  const result = await getMcpServer(id);
  return c.json(result)
})

app.get('/api/mcp-servers/list', async (c) => {
  const result = await listMcpServers();
  return c.json(result)
})

app.post('/api/tool', async (c) => {
  const body = await c.req.json();
  const tool = body as Database["public"]["Tables"]["tools"]["Insert"];
  const result = await createTool(tool);
  return c.json(result);
})

app.get('/api/tools/list', async (c) => {
  const result = await listAllTools();
  return c.json(result)
})

app.get('/api/tools/:mcpServerId', async (c) => {
  const mcpServerId = c.req.param("mcpServerId");
  const result = await getMcpServerTools(mcpServerId);
  return c.json(result)
})

interface LogInput {
  mcpServerId: string,
  toolName: string,
  toolInput: string,
  toolResponse: string,
  status: string, 
  apiKey?: string,
}

app.post('/api/log', async (c) => {
  const logInput = await c.req.json();
  const log = {
    mcpServerId: logInput.mcpServerId,
    toolName: logInput.toolName,
    toolInput: logInput.toolInput,
    toolResponse: logInput.toolResponse,
    status: logInput.status,
    apiKey: logInput.apiKey,
  };

  const { data, error } = await getToolByNameAndMcpServerId(log.toolName, log.mcpServerId);
  if (error) {
    return c.json({ error: error }, 404);
  }
  const tool = data as Database["public"]["Tables"]["tools"]["Row"];

  const dbLog : Omit<Database["public"]["Tables"]["logs"]["Insert"], "id"> = {
    tool_id: tool.id,
    tool_input: log.toolInput,
    tool_response: log.toolResponse,
    status: log.status,
    api_key: log.apiKey,
    mcp_server_id: tool.mcp_server_id,
  };

  return c.json(await createLog(dbLog))
});

app.get('/api/logs/:id', async (c) => {
  const id = c.req.param("id") as string;
  const result = await getLog(id);
  return c.json(result)
});

app.get('/api/logs/list/all', async (c) => {
  // Run the populate_api logic first
  // Clear logs table first
  // await clearLogs();
  // const logFilePath = 'mcp_gateway_logs';
  // let fileContent;
  // try {
  //   fileContent = await fs.readFile(logFilePath, 'utf-8');
  // } catch (err) {
  //   return c.json({ error: 'Failed to read log file', details: err }, 500);
  // }

  // // Split lines and parse pairs
  // const lines = fileContent.split(/\r?\n/).filter(Boolean);
  // const clientLines = lines.filter(l => l.startsWith('[INFO] client -> server:'));
  // const toolCallLines = lines.filter(l => l.startsWith('[MCP_TOOL_CALL message]'));

  // // Build a map from id to client line
  // const clientMap: Record<string, any> = {};
  // for (const line of clientLines) {
  //   const match = line.match(/b'(\{.*\})'/);
  //   if (!match) continue;
  //   try {
  //     const json = JSON.parse(match[1]);
  //     if (json.id !== undefined) {
  //       clientMap[json.id] = json;
  //     }
  //   } catch {}
  // }

  // // Build a map from call_id to tool call line
  // const toolCallMap: Record<string, any> = {};
  // for (const line of toolCallLines) {
  //   const match = line.match(/\{.*\}$/);
  //   if (!match) continue;
  //   try {
  //     const json = JSON.parse(match[0]);
  //     if (json.tool_call_id) {
  //       // call_id is like 'call_14' -> id is 14
  //       const idMatch = json.tool_call_id.match(/call_(\d+)/);
  //       if (idMatch) {
  //         toolCallMap[idMatch[1]] = json;
  //       }
  //     }
  //   } catch {}
  // }

  // // For each id in clientMap, try to find a matching toolCallMap entry
  // const mcp_server_id = 'e29ca92e-b049-4ad8-acd5-526061dda5bb';
  // const api_key = 'api_1234';
  // const status = 'success';
  // for (const id in clientMap) {
  //   const client = clientMap[id];
  //   console.log(`[DEBUG] Parsed client line for id ${id}:`, client);
  //   const toolCall = toolCallMap[id];
  //   if (!toolCall) {
  //     console.log(`[DEBUG] No matching toolCall for id ${id}`);
  //     continue;
  //   }
  //   console.log(`[DEBUG] Parsed toolCall line for id ${id}:`, toolCall);
  //   const toolName = client.params?.name;
  //   const toolInput = JSON.stringify(client.params ?? {});
  //   let toolResponse = '';
  //   if (
  //     Array.isArray(toolCall.content) &&
  //     toolCall.content.length > 0 &&
  //     toolCall.content[0].type === 'text'
  //   ) {
  //     toolResponse = toolCall.content[0].text;
  //   }
  //   // Get tool_id from DB
  //   const { data, error } = await getToolByNameAndMcpServerId(toolName, mcp_server_id);
  //   if (error || !data) {
  //     console.log(`[DEBUG] Tool not found for name '${toolName}' and mcp_server_id '${mcp_server_id}'`);
  //     continue;
  //   }
  //   const tool = data;
  //   const dbLog = {
  //     tool_id: tool.id,
  //     tool_input: toolInput,
  //     tool_response: toolResponse,
  //     status,
  //     api_key,
  //     mcp_server_id,
  //   };
  //   console.log(`[DEBUG] Inserting log for tool '${toolName}' (id: ${tool.id}) with input:`, toolInput, 'and response:', toolResponse);
  //   await createLog(dbLog);
  //   console.log(`[DEBUG] Log inserted for id ${id}`);
  // }

  // Now return the logs
  const result = await listAllLogs();
  return c.json(result)
});

app.get('/api/logs/list/:mcpServerId', async (c) => {
  const mcpServerId = c.req.param("mcpServerId") as string;
  const result = await listLogsByMcpServer(mcpServerId);
  return c.json(result)
});

app.post('/api/populate_api', async (c) => {
  // Clear logs table first
  await clearLogs();
  const logFilePath = 'mcp_gateway_logs';
  let fileContent;
  try {
    fileContent = await fs.readFile(logFilePath, 'utf-8');
  } catch (err) {
    return c.json({ error: 'Failed to read log file', details: err }, 500);
  }

  // Split lines and parse pairs
  const lines = fileContent.split(/\r?\n/).filter(Boolean);
  const clientLines = lines.filter(l => l.startsWith('[INFO] client -> server:'));
  const toolCallLines = lines.filter(l => l.startsWith('[MCP_TOOL_CALL message]'));

  // Build a map from id to client line
  const clientMap: Record<string, any> = {};
  for (const line of clientLines) {
    const match = line.match(/b'(\{.*\})'/);
    if (!match) continue;
    try {
      const json = JSON.parse(match[1]);
      if (json.id !== undefined) {
        clientMap[json.id] = json;
      }
    } catch {}
  }

  // Build a map from call_id to tool call line
  const toolCallMap: Record<string, any> = {};
  for (const line of toolCallLines) {
    const match = line.match(/\{.*\}$/);
    if (!match) continue;
    try {
      const json = JSON.parse(match[0]);
      if (json.tool_call_id) {
        // call_id is like 'call_14' -> id is 14
        const idMatch = json.tool_call_id.match(/call_(\d+)/);
        if (idMatch) {
          toolCallMap[idMatch[1]] = json;
        }
      }
    } catch {}
  }

  // For each id in clientMap, try to find a matching toolCallMap entry
  const mcp_server_id = 'e29ca92e-b049-4ad8-acd5-526061dda5bb';
  const api_key = 'api_1234';
  const status = 'success';
  const inserted = [];
  for (const id in clientMap) {
    const client = clientMap[id];
    const toolCall = toolCallMap[id];
    if (!toolCall) continue;
    const toolName = client.params?.name;
    const toolInput = JSON.stringify(client.params ?? {});
    let toolResponse = '';
    if (
      Array.isArray(toolCall.content) &&
      toolCall.content.length > 0 &&
      toolCall.content[0].type === 'text'
    ) {
      toolResponse = toolCall.content[0].text;
    }
    // Get tool_id from DB
    const { data, error } = await getToolByNameAndMcpServerId(toolName, mcp_server_id);
    if (error || !data) continue;
    const tool = data;
    const dbLog = {
      tool_id: tool.id,
      tool_input: toolInput,
      tool_response: toolResponse,
      status,
      api_key,
      mcp_server_id,
    };
    await createLog(dbLog);
    inserted.push({ toolName, tool_id: tool.id, toolInput, toolResponse });
  }
  return c.json({ insertedCount: inserted.length, inserted });
});

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
