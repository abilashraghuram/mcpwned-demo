import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { createLog, createMcpServer, createTool, getToolByNameAndMcpServerId, listMcpServers, getMcpServer, getLog, listLogsByMcpServer } from './db.js';
import { cors } from 'hono/cors';
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
app.get('/api/logs/list/:mcpServerId', async (c) => {
    const mcpServerId = c.req.param("mcpServerId");
    const result = await listLogsByMcpServer(mcpServerId);
    return c.json(result);
});
serve({
    fetch: app.fetch,
    port: 5050
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
