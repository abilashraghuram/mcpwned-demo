import type { Database } from "../types/database.types.js";
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
  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
}

export const createLog = async (log: Omit<Database["public"]["Tables"]["logs"]["Insert"], "id">) => {
  const id = uuid();
  const { data, error } = await supabaseClient().from("logs").insert({ ...log, id });
  if (error) {
    console.log(error);
    return { error };
  }
  return { data };
};

export const getLog = async (id: string) => {
  const { data, error } = await supabaseClient().from("logs").select().eq("id", id).single();
  if (error) {
    console.log(error);
    return { error };
  }
  return { data };
};

export const listAllLogs = async () => {
  const { data, error } = await supabaseClient().from("logs").select(`*, tools(name)`);
  if (error) {
    console.log(error);
    return { error };
  }
  return { data };
}

export const listLogsByMcpServer = async (mcpServerId: string) => {
  const { data, error } = await supabaseClient()
    .from("logs")
    .select(`*, tools(name)`)
    .eq("mcp_server_id", mcpServerId)
  if (error) {
    console.log(error);
    return { error };
  }
  return { data };
};

export const createMcpServer = async (mcpServer: Database["public"]["Tables"]["mcp_servers"]["Insert"]) => {
  const id = uuid();
  const { data, error } = await supabaseClient().from("mcp_servers").insert({ ...mcpServer, id });
  if (error) {
    console.log(error);
    return { error };
  }
  return { id };
};

export const getMcpServer = async (id: string) => {
  const { data, error } = await supabaseClient().from("mcp_servers").select().eq("id", id).single();
  if (error) {
    console.log(error);
    return { error };
  }
  return { data };
};

export const updateMcpServer = async (id: string, mcpServer: Database["public"]["Tables"]["mcp_servers"]["Update"]) => {
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

export const createTool = async (tool: Database["public"]["Tables"]["tools"]["Insert"]) => {
  const id = uuid();
  const { data, error } = await supabaseClient().from("tools").insert({ ...tool, id });
  if (error) {
    console.log(error);
    return { error };
  }
  return { id };
};

export const getToolById = async (id: string) => {
  const { data, error } = await supabaseClient().from("tools").select().eq("id", id).single();
  if (error) {
    console.log(error);
    return { error };
  }
  return { data };
};

export const getToolByNameAndMcpServerId = async (name: string, mcpServerId: string) => {
  const { data, error } = await supabaseClient().from("tools").select().eq("name", name).eq("mcp_server_id", mcpServerId).single();
  if (error) {
    console.log(error);
    return { error };
  }
  return { data };
};

export const getMcpServerTools = async (mcpServerId: string) => {
  const { data, error } = await supabaseClient().from("tools").select().eq("mcp_server_id", mcpServerId);
  if (error) {
    console.log(error);
    return { error };
  }
  return { data };
};

export const listAllTools = async () => {
  const { data, error } = await supabaseClient().from("tools").select();
  if (error) {
    console.log(error);
    return { error };
  }
  return { data };
};

export const clearLogs = async () => {
  const { error } = await supabaseClient().from("logs").delete().not('id', 'is', null);
  if (error) {
    console.log('Error clearing logs:', error);
    return { error };
  }
  return { success: true };
};

export const createWaitlistEmail = async (waitlist: Omit<Database["public"]["Tables"]["waitlist_emails"]["Insert"], "id" | "created_at">) => {
  const { data, error } = await supabaseClient().from("waitlist_emails").insert({ ...waitlist });
  if (error) {
    console.log(error);
    return { error };
  }
  return { data };
};

export const getMcpServerByName = async (name: string) => {
  const { data, error } = await supabaseClient().from("mcp_servers").select().eq("name", name).single();
  if (error) {
    console.log(error);
    return { error };
  }
  return { data };
};

// Report Generation functions
export const createReportGeneration = async (report: Database["public"]["Tables"]["report_generation"]["Insert"]) => {
  const { data, error } = await supabaseClient().from("report_generation").insert({ ...report });
  if (error) {
    console.log(error);
    return { error };
  }
  return { data };
};

export const getReportGeneration = async (id: string) => {
  const { data, error } = await supabaseClient().from("report_generation").select().eq("id", id).single();
  if (error) {
    console.log(error);
    return { error };
  }
  return { data };
};

export const listReportGenerations = async () => {
  const { data, error } = await supabaseClient().from("report_generation").select();
  if (error) {
    console.log(error);
    return { error };
  }
  return { data };
};

export const updateReportGeneration = async (id: string, report: Database["public"]["Tables"]["report_generation"]["Update"]) => {
  const { data, error } = await supabaseClient().from("report_generation").update({ ...report }).eq("id", id);
  if (error) {
    console.log(error);
    return { error };
  }
  return { data };
};

// Report Generator functions
export const createReportGenerator = async (entry: { email: string, report_json: any, mcp_qualified_name: string, created_at?: string }) => {
  // Direct insert since this table is not in the Database type
  const client = supabaseClient();
  const { data, error } = await client.from('report_generator').insert([{ ...entry }]);
  if (error) {
    console.log(error);
    return { error };
  }
  return { data };
};