import { createClient } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
dotenv.config();
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const supabaseClient = () => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw new Error("Missing environment variables");
    }
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};
export const createLog = async (log) => {
    const id = uuid();
    const { data, error } = await supabaseClient().from("logs").insert({ ...log, id });
    if (error) {
        console.log(error);
        return { error };
    }
    return { data };
};
export const getLog = async (id) => {
    const { data, error } = await supabaseClient().from("logs").select().eq("id", id).single();
    if (error) {
        console.log(error);
        return { error };
    }
    return { data };
};
export const listLogsByMcpServer = async (mcpServerId) => {
    const { data, error } = await supabaseClient().from("logs").select().eq("mcp_server_id", mcpServerId);
    if (error) {
        console.log(error);
        return { error };
    }
    return { data };
};
export const createMcpServer = async (mcpServer) => {
    const id = uuid();
    const { data, error } = await supabaseClient().from("mcp_servers").insert({ ...mcpServer, id });
    if (error) {
        console.log(error);
        return { error };
    }
    return { id };
};
export const getMcpServer = async (id) => {
    const { data, error } = await supabaseClient().from("mcp_servers").select().eq("id", id).single();
    if (error) {
        console.log(error);
        return { error };
    }
    return { data };
};
export const updateMcpServer = async (id, mcpServer) => {
    const { data, error } = await supabaseClient().from("mcp_servers").update({ ...mcpServer }).eq("id", id);
    if (error) {
        console.log(error);
        return { error };
    }
    return { data };
};
export const listMcpServers = async () => {
    const { data, error } = await supabaseClient().from("mcp_servers").select();
    if (error) {
        console.log(error);
        return { error };
    }
    return { data };
};
export const createTool = async (tool) => {
    const id = uuid();
    const { data, error } = await supabaseClient().from("tools").insert({ ...tool, id });
    if (error) {
        console.log(error);
        return { error };
    }
    return { id };
};
export const getToolById = async (id) => {
    const { data, error } = await supabaseClient().from("tools").select().eq("id", id).single();
    if (error) {
        console.log(error);
        return { error };
    }
    return { data };
};
export const getToolByNameAndMcpServerId = async (name, mcpServerId) => {
    const { data, error } = await supabaseClient().from("tools").select().eq("name", name).eq("mcp_server_id", mcpServerId).single();
    if (error) {
        console.log(error);
        return { error };
    }
    return { data };
};
export const getMcpServerTools = async (mcpServerId) => {
    const { data, error } = await supabaseClient().from("tools").select().eq("mcp_server_id", mcpServerId);
    if (error) {
        console.log(error);
        return { error };
    }
    return { data };
};
