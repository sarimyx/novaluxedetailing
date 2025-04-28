export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      Bookings: {
        Row: {
          booking_id: string;
          created_at: string;
          customer_id: string | null;
          detailer_id: string | null;
          payment_id: string | null;
          scheduled_day: number;
          scheduled_hour: number;
          scheduled_month: number;
          scheduled_year: number;
          service_id: string | null;
          status: string | null;
        };
        Insert: {
          booking_id?: string;
          created_at?: string;
          customer_id?: string | null;
          detailer_id?: string | null;
          payment_id?: string | null;
          scheduled_day: number;
          scheduled_hour: number;
          scheduled_month: number;
          scheduled_year: number;
          service_id?: string | null;
          status?: string | null;
        };
        Update: {
          booking_id?: string;
          created_at?: string;
          customer_id?: string | null;
          detailer_id?: string | null;
          payment_id?: string | null;
          scheduled_day?: number;
          scheduled_hour?: number;
          scheduled_month?: number;
          scheduled_year?: number;
          service_id?: string | null;
          status?: string | null;
        };
        Relationships: [];
      };
      BookingsDeprecated: {
        Row: {
          created_at: string;
          customer_address: string | null;
          customer_name: string | null;
          customer_phone: string | null;
          detailer_id: string | null;
          estimated_hours: number | null;
          id: string;
          request_source: string | null;
          scheduled_day: string | null;
          scheduled_time: string | null;
          service_id: string | null;
          status: string | null;
          vehicle_type: string | null;
        };
        Insert: {
          created_at: string;
          customer_address?: string | null;
          customer_name?: string | null;
          customer_phone?: string | null;
          detailer_id?: string | null;
          estimated_hours?: number | null;
          id?: string;
          request_source?: string | null;
          scheduled_day?: string | null;
          scheduled_time?: string | null;
          service_id?: string | null;
          status?: string | null;
          vehicle_type?: string | null;
        };
        Update: {
          created_at?: string;
          customer_address?: string | null;
          customer_name?: string | null;
          customer_phone?: string | null;
          detailer_id?: string | null;
          estimated_hours?: number | null;
          id?: string;
          request_source?: string | null;
          scheduled_day?: string | null;
          scheduled_time?: string | null;
          service_id?: string | null;
          status?: string | null;
          vehicle_type?: string | null;
        };
        Relationships: [];
      };
      Customers: {
        Row: {
          address: string | null;
          created_at: string;
          customer_id: string;
          email: string | null;
          name: string | null;
          phone_number: string | null;
        };
        Insert: {
          address?: string | null;
          created_at?: string;
          customer_id: string;
          email?: string | null;
          name?: string | null;
          phone_number?: string | null;
        };
        Update: {
          address?: string | null;
          created_at?: string;
          customer_id?: string;
          email?: string | null;
          name?: string | null;
          phone_number?: string | null;
        };
        Relationships: [];
      };
      Detailers: {
        Row: {
          created_at: string;
          detailer_id: string;
          name: string;
          phone_number: string;
          standard_days: string | null;
        };
        Insert: {
          created_at?: string;
          detailer_id: string;
          name: string;
          phone_number: string;
          standard_days?: string | null;
        };
        Update: {
          created_at?: string;
          detailer_id?: string;
          name?: string;
          phone_number?: string;
          standard_days?: string | null;
        };
        Relationships: [];
      };
      DetailersDeprecated: {
        Row: {
          created_at: string;
          id: string;
          phone_number: string | null;
          standard_days: string | null;
          standard_hours: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          phone_number?: string | null;
          standard_days?: string | null;
          standard_hours?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          phone_number?: string | null;
          standard_days?: string | null;
          standard_hours?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      DetailersScheduleOverrides: {
        Row: {
          blocked_hours: string | null;
          blocked_reason: string | null;
          created_at: string;
          date: string;
          id: string;
          user_id: string | null;
        };
        Insert: {
          blocked_hours?: string | null;
          blocked_reason?: string | null;
          created_at?: string;
          date: string;
          id?: string;
          user_id?: string | null;
        };
        Update: {
          blocked_hours?: string | null;
          blocked_reason?: string | null;
          created_at?: string;
          date?: string;
          id?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      ServiceRequestFormSubmissions: {
        Row: {
          address: string | null;
          contact_preference: string | null;
          created_at: string;
          id: number;
          name: string | null;
          phone: string | null;
          selection: string | null;
          vehicle_type: string | null;
        };
        Insert: {
          address?: string | null;
          contact_preference?: string | null;
          created_at?: string;
          id?: number;
          name?: string | null;
          phone?: string | null;
          selection?: string | null;
          vehicle_type?: string | null;
        };
        Update: {
          address?: string | null;
          contact_preference?: string | null;
          created_at?: string;
          id?: number;
          name?: string | null;
          phone?: string | null;
          selection?: string | null;
          vehicle_type?: string | null;
        };
        Relationships: [];
      };
      Services: {
        Row: {
          active: boolean | null;
          category: string;
          created_at: string;
          description: string;
          display_order: number;
          estimated_hours: number;
          name: string;
          service_id: string;
          starting_price: number;
        };
        Insert: {
          active?: boolean | null;
          category: string;
          created_at?: string;
          description: string;
          display_order: number;
          estimated_hours: number;
          name: string;
          service_id: string;
          starting_price: number;
        };
        Update: {
          active?: boolean | null;
          category?: string;
          created_at?: string;
          description?: string;
          display_order?: number;
          estimated_hours?: number;
          name?: string;
          service_id?: string;
          starting_price?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
