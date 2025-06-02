import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { createLog, createMcpServer, createTool, getToolByNameAndMcpServerId, listMcpServers, getMcpServer, getLog, listLogsByMcpServer, listAllTools, getMcpServerTools, listAllLogs, clearLogs, createWaitlistEmail, getMcpServerByName, createReportGeneration, getReportGeneration, listReportGenerations, updateReportGeneration, createReportGenerator } from './db.js';
import { cors } from 'hono/cors';
import fs from 'fs/promises';
import path from 'path';
import { b } from "../baml_client/index.js";
import axios from 'axios';
const app = new Hono();
app.get('/', (c) => {
    return c.text('Hello Hono!');
});
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
    const mcpServer = body;
    const result = await createMcpServer(mcpServer);
    return c.json(result);
});
app.get('/api/mcp-server/:id', async (c) => {
    const id = c.req.param("id");
    const result = await getMcpServer(id);
    return c.json(result);
});
app.get('/api/mcp-servers/list', async (c) => {
    const result = await listMcpServers();
    return c.json(result);
});
app.post('/api/tool', async (c) => {
    const body = await c.req.json();
    const tool = body;
    const result = await createTool(tool);
    return c.json(result);
});
app.get('/api/tools/list', async (c) => {
    const result = await listAllTools();
    return c.json(result);
});
app.get('/api/tools/:mcpServerId', async (c) => {
    const mcpServerId = c.req.param("mcpServerId");
    const result = await getMcpServerTools(mcpServerId);
    return c.json(result);
});
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
    const tool = data;
    const dbLog = {
        tool_id: tool.id,
        tool_input: log.toolInput,
        tool_response: log.toolResponse,
        status: log.status,
        api_key: log.apiKey,
        mcp_server_id: tool.mcp_server_id,
    };
    return c.json(await createLog(dbLog));
});
app.get('/api/logs/:id', async (c) => {
    const id = c.req.param("id");
    const result = await getLog(id);
    return c.json(result);
});
app.get('/api/logs/list/all', async (c) => {
    // Run the populate_api logic first
    // Clear logs table first
    // await clearLogs();
    // const logFilePath = '/Users/abilashraghuram/CodeIntegrity/mcp-gateway-logs';
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
    return c.json(result);
});
app.get('/api/logs/list/:mcpServerId', async (c) => {
    const mcpServerId = c.req.param("mcpServerId");
    const result = await listLogsByMcpServer(mcpServerId);
    return c.json(result);
});
app.post('/api/populate_api', async (c) => {
    // Clear logs table first
    await clearLogs();
    const logFilePath = '/Users/abilashraghuram/CodeIntegrity/mcp-gateway-logs';
    let fileContent;
    try {
        fileContent = await fs.readFile(logFilePath, 'utf-8');
    }
    catch (err) {
        return c.json({ error: 'Failed to read log file', details: err }, 500);
    }
    // Split lines and parse pairs
    const lines = fileContent.split(/\r?\n/).filter(Boolean);
    const clientLines = lines.filter(l => l.startsWith('[INFO] client -> server:'));
    const toolCallLines = lines.filter(l => l.startsWith('[MCP_TOOL_CALL message]'));
    // Build a map from id to client line
    const clientMap = {};
    for (const line of clientLines) {
        const match = line.match(/b'(\{.*\})'/);
        if (!match)
            continue;
        try {
            const json = JSON.parse(match[1]);
            if (json.id !== undefined) {
                clientMap[json.id] = json;
            }
        }
        catch { }
    }
    // Build a map from call_id to tool call line
    const toolCallMap = {};
    for (const line of toolCallLines) {
        const match = line.match(/\{.*\}$/);
        if (!match)
            continue;
        try {
            const json = JSON.parse(match[0]);
            if (json.tool_call_id) {
                // call_id is like 'call_14' -> id is 14
                const idMatch = json.tool_call_id.match(/call_(\d+)/);
                if (idMatch) {
                    toolCallMap[idMatch[1]] = json;
                }
            }
        }
        catch { }
    }
    // For each id in clientMap, try to find a matching toolCallMap entry
    const mcp_server_id = 'e29ca92e-b049-4ad8-acd5-526061dda5bb';
    const api_key = 'api_1234';
    const status = 'success';
    const inserted = [];
    for (const id in clientMap) {
        const client = clientMap[id];
        const toolCall = toolCallMap[id];
        if (!toolCall)
            continue;
        const toolName = client.params?.name;
        const toolInput = JSON.stringify(client.params ?? {});
        let toolResponse = '';
        if (Array.isArray(toolCall.content) &&
            toolCall.content.length > 0 &&
            toolCall.content[0].type === 'text') {
            toolResponse = toolCall.content[0].text;
        }
        // Get tool_id from DB
        const { data, error } = await getToolByNameAndMcpServerId(toolName, mcp_server_id);
        if (error || !data)
            continue;
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
app.post('/api/waitlist_add', async (c) => {
    const body = await c.req.json();
    const email = body.email;
    if (!email || typeof email !== 'string') {
        return c.json({ error: 'Invalid email' }, 400);
    }
    const result = await createWaitlistEmail({ email });
    return c.json(result);
});
app.post('/api/mcp-tools', async (c) => {
    // Get MCP server name from frontend
    const body = await c.req.json();
    const mcpServerName = body.name || 'exa'; // fallback to 'exa' if not provided
    console.log('[mcp-tools] Input body:', body);
    console.log('[mcp-tools] Using mcpServerName:', mcpServerName);
    let tools = [];
    try {
        const response = await axios.get(`https://registry.smithery.ai/servers/${encodeURIComponent(mcpServerName)}`, {
            headers: {
                'Authorization': 'Bearer a818dfa8-1b79-4497-9787-4573028c208c',
                'Accept': 'application/json',
            },
        });
        // Map to array of tool names (strings)
        tools = (response.data.tools || []).map((tool) => typeof tool === 'string' ? tool : tool.name);
        console.log('[mcp-tools] Output tools:', tools);
        return c.json({ tools });
    }
    catch (err) {
        console.error('Error fetching tools from smithery.ai:', err);
        console.log('[mcp-tools] Output error:', err?.message || String(err));
        return c.json({ error: 'Failed to fetch tools from smithery registry', details: err?.message || String(err) }, 500);
    }
});
app.post('/api/playground-diagram', async (c) => {
    // Now expects a list of tools, email, and mcp_qualified_name from the frontend
    const body = await c.req.json();
    const tools = Array.isArray(body.tools) ? body.tools : [];
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const mcpQualifiedName = typeof body.mcp_qualified_name === 'string' ? body.mcp_qualified_name.trim() : '';
    if (!tools.length) {
        return c.json({ error: 'No tools provided' }, 400);
    }
    if (!email || !mcpQualifiedName) {
        return c.json({ error: 'Missing email or mcp_qualified_name' }, 400);
    }
    const playgroundToolsInput = { tools };
    let mockList;
    try {
        mockList = await b.GenerateThreePlaygroundDiagramMocks(playgroundToolsInput);
        console.log('scan_description', mockList.diagrams[0].scan_description);
    }
    catch (err) {
        console.error('Error generating playground diagram mock list:', err);
        return c.json({ error: 'Failed to generate playground diagram mock list', details: err }, 500);
    }
    // Save the diagrams to report_generator
    let dbResult;
    try {
        dbResult = await createReportGenerator({
            email,
            report_json: mockList.diagrams,
            mcp_qualified_name: mcpQualifiedName
        });
    }
    catch (err) {
        console.error('Error saving playground diagram to report_generator:', err);
        dbResult = { error: 'Failed to save to report_generator', details: err };
    }
    // Return the list of diagrams and DB result
    return c.json({ diagrams: mockList.diagrams, dbResult });
});
app.post('/api/mcp-qualified-name', async (c) => {
    const body = await c.req.json();
    let githubUrl = body.githubUrl;
    if (!githubUrl || typeof githubUrl !== 'string') {
        return c.json({ error: 'Missing or invalid githubUrl' }, 400);
    }
    // Remove leading '@' if present
    if (githubUrl.startsWith('@')) {
        githubUrl = githubUrl.slice(1);
    }
    // Parse owner and repo from the URL
    try {
        console.log('[mcp-qualified-name] Input githubUrl:', githubUrl);
        const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/?#]+)/);
        if (!match) {
            return c.json({ error: 'Invalid GitHub URL format' }, 400);
        }
        const owner = match[1];
        const repo = match[2];
        const query = `repo:${repo}+owner:${owner}`;
        const queryUrl = `https://registry.smithery.ai/servers?q=${query}`;
        console.log('[mcp-qualified-name] Parsed owner:', owner, 'repo:', repo);
        console.log('[mcp-qualified-name] Output queryUrl:', queryUrl);
        // Make request to Smithery registry
        let response;
        try {
            response = await axios.get(queryUrl, {
                headers: {
                    'Authorization': 'Bearer a818dfa8-1b79-4497-9787-4573028c208c',
                    'Accept': 'application/json',
                },
            });
        }
        catch (err) {
            console.error('[mcp-qualified-name] Error fetching from Smithery:', err);
            return c.json({ error: 'Failed to fetch from Smithery registry', details: err?.message || String(err) }, 500);
        }
        const servers = response.data.servers || [];
        if (!servers.length) {
            return c.json({ error: 'No qualified server found for this repo' }, 404);
        }
        const qualifiedName = servers[0].qualifiedName;
        console.log('[mcp-qualified-name] Output qualifiedName:', qualifiedName);
        return c.json({ qualifiedName });
    }
    catch (err) {
        return c.json({ error: 'Failed to parse GitHub URL', details: err?.message || String(err) }, 500);
    }
});
// Report Generation Endpoints
app.post('/api/report-generation', async (c) => {
    const body = await c.req.json();
    const result = await createReportGeneration(body);
    return c.json(result);
});
app.get('/api/report-generation/:id', async (c) => {
    const id = c.req.param('id');
    const result = await getReportGeneration(id);
    return c.json(result);
});
app.get('/api/report-generation/list', async (c) => {
    const result = await listReportGenerations();
    return c.json(result);
});
app.patch('/api/report-generation/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const result = await updateReportGeneration(id, body);
    return c.json(result);
});
serve({
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3001
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
