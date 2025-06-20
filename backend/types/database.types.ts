export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      logs: {
        Row: {
          api_key: string | null
          created_at: string
          duration: number | null
          id: string
          mcp_server_id: string
          status: string | null
          tool_id: string
          tool_input: string | null
          tool_response: string | null
        }
        Insert: {
          api_key?: string | null
          created_at?: string
          duration?: number | null
          id: string
          mcp_server_id: string
          status?: string | null
          tool_id: string
          tool_input?: string | null
          tool_response?: string | null
        }
        Update: {
          api_key?: string | null
          created_at?: string
          duration?: number | null
          id?: string
          mcp_server_id?: string
          status?: string | null
          tool_id?: string
          tool_input?: string | null
          tool_response?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_mcp_server_id_fkey"
            columns: ["mcp_server_id"]
            isOneToOne: false
            referencedRelation: "mcp_servers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "logs_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      mcp_servers: {
        Row: {
          id: string
          name: string
          number_of_tools: number | null
          url: string | null
        }
        Insert: {
          id: string
          name: string
          number_of_tools?: number | null
          url?: string | null
        }
        Update: {
          id?: string
          name?: string
          number_of_tools?: number | null
          url?: string | null
        }
        Relationships: []
      }
      tools: {
        Row: {
          id: string
          mcp_server_id: string
          name: string
        }
        Insert: {
          id: string
          mcp_server_id: string
          name: string
        }
        Update: {
          id?: string
          mcp_server_id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tools_mcp_server_id_fkey"
            columns: ["mcp_server_id"]
            isOneToOne: false
            referencedRelation: "mcp_servers"
            referencedColumns: ["id"]
          },
        ]
      },
      waitlist_emails: {
        Row: {
          id: number
          created_at: string
          email: string
        }
        Insert: {
          id?: number
          created_at?: string
          email: string
        }
        Update: {
          id?: number
          created_at?: string
          email?: string
        }
        Relationships: []
      },
      report_generation: {
        Row: {
          id: string
          mcp_server_id: string
          report_data: Json
          created_at: string
          status: string
        }
        Insert: {
          id: string
          mcp_server_id: string
          report_data: Json
          created_at?: string
          status: string
        }
        Update: {
          id?: string
          mcp_server_id?: string
          report_data?: Json
          created_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_generation_mcp_server_id_fkey",
            columns: ["mcp_server_id"],
            isOneToOne: false,
            referencedRelation: "mcp_servers",
            referencedColumns: ["id"]
          }
        ]
      },
      report_generator: {
        Row: {
          id: number
          created_at: string
          email: string
          report_json: Json
          mcp_qualified_name: string
          guid: string
        }
        Insert: {
          id?: number
          created_at?: string
          email: string
          report_json: Json
          mcp_qualified_name: string
          guid: string
        }
        Update: {
          id?: number
          created_at?: string
          email?: string
          report_json?: Json
          mcp_qualified_name?: string
          guid?: string
        }
        Relationships: []
      },
      rules_generated: {
        Row: {
          id: number
          created_at: string
          email: string
          report_json: Json
          mcp_qualified_name: string
          guid: string
        }
        Insert: {
          id?: number
          created_at?: string
          email: string
          report_json: Json
          mcp_qualified_name: string
          guid: string
        }
        Update: {
          id?: number
          created_at?: string
          email?: string
          report_json?: Json
          mcp_qualified_name?: string
          guid?: string
        }
        Relationships: []
      },
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
