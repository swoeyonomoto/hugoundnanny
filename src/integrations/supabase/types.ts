export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          id: string
          intro_1: string | null
          intro_2: string | null
          location: string | null
          principles_1: string | null
          principles_2: string | null
          studio_image: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          intro_1?: string | null
          intro_2?: string | null
          location?: string | null
          principles_1?: string | null
          principles_2?: string | null
          studio_image?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          intro_1?: string | null
          intro_2?: string | null
          location?: string | null
          principles_1?: string | null
          principles_2?: string | null
          studio_image?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      artist_settings: {
        Row: {
          id: string
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      artwork_images: {
        Row: {
          artwork_id: string | null
          created_at: string | null
          id: string
          image_url: string
          is_primary: boolean | null
          sort_index: number | null
        }
        Insert: {
          artwork_id?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          is_primary?: boolean | null
          sort_index?: number | null
        }
        Update: {
          artwork_id?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          is_primary?: boolean | null
          sort_index?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "artwork_images_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
        ]
      }
      artworks: {
        Row: {
          bibliography: string | null
          catalogue_number: string | null
          collection: string | null
          created_at: string | null
          currency: string | null
          depth_cm: number | null
          description: string | null
          dimensions: string | null
          exhibition_history: string | null
          height_cm: number | null
          id: string
          image_file: string | null
          image_url: string | null
          is_online: boolean | null
          is_sold: boolean
          medium: string | null
          medium_category: string | null
          medium_en: string | null
          price: number | null
          price_calculated: number | null
          price_eur: number | null
          price_index: number | null
          price_override: number | null
          production_costs: number | null
          provenance: string | null
          show_on_website: boolean | null
          sort_index: number | null
          status: string | null
          title: string
          title_en: string | null
          updated_at: string | null
          werk_text: string | null
          werk_text_en: string | null
          width_cm: number | null
          year: string | null
        }
        Insert: {
          bibliography?: string | null
          catalogue_number?: string | null
          collection?: string | null
          created_at?: string | null
          currency?: string | null
          depth_cm?: number | null
          description?: string | null
          dimensions?: string | null
          exhibition_history?: string | null
          height_cm?: number | null
          id?: string
          image_file?: string | null
          image_url?: string | null
          is_online?: boolean | null
          is_sold?: boolean
          medium?: string | null
          medium_category?: string | null
          medium_en?: string | null
          price?: number | null
          price_calculated?: number | null
          price_eur?: number | null
          price_index?: number | null
          price_override?: number | null
          production_costs?: number | null
          provenance?: string | null
          show_on_website?: boolean | null
          sort_index?: number | null
          status?: string | null
          title: string
          title_en?: string | null
          updated_at?: string | null
          werk_text?: string | null
          werk_text_en?: string | null
          width_cm?: number | null
          year?: string | null
        }
        Update: {
          bibliography?: string | null
          catalogue_number?: string | null
          collection?: string | null
          created_at?: string | null
          currency?: string | null
          depth_cm?: number | null
          description?: string | null
          dimensions?: string | null
          exhibition_history?: string | null
          height_cm?: number | null
          id?: string
          image_file?: string | null
          image_url?: string | null
          is_online?: boolean | null
          is_sold?: boolean
          medium?: string | null
          medium_category?: string | null
          medium_en?: string | null
          price?: number | null
          price_calculated?: number | null
          price_eur?: number | null
          price_index?: number | null
          price_override?: number | null
          production_costs?: number | null
          provenance?: string | null
          show_on_website?: boolean | null
          sort_index?: number | null
          status?: string | null
          title?: string
          title_en?: string | null
          updated_at?: string | null
          werk_text?: string | null
          werk_text_en?: string | null
          width_cm?: number | null
          year?: string | null
        }
        Relationships: []
      }
      collections: {
        Row: {
          created_at: string | null
          description: string | null
          description_en: string | null
          headline: string | null
          headline_en: string | null
          id: string
          is_active: boolean | null
          slug: string
          sort_index: number | null
          title: string
          title_en: string | null
          year_end: number | null
          year_start: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          headline?: string | null
          headline_en?: string | null
          id?: string
          is_active?: boolean | null
          slug: string
          sort_index?: number | null
          title: string
          title_en?: string | null
          year_end?: number | null
          year_start?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          headline?: string | null
          headline_en?: string | null
          id?: string
          is_active?: boolean | null
          slug?: string
          sort_index?: number | null
          title?: string
          title_en?: string | null
          year_end?: number | null
          year_start?: number | null
        }
        Relationships: []
      }
      portfolio_shares: {
        Row: {
          artwork_ids: string[]
          created_at: string
          id: string
          slug: string
        }
        Insert: {
          artwork_ids: string[]
          created_at?: string
          id?: string
          slug: string
        }
        Update: {
          artwork_ids?: string[]
          created_at?: string
          id?: string
          slug?: string
        }
        Relationships: []
      }
      project_images: {
        Row: {
          alt: string | null
          aspect_h: number | null
          aspect_w: number | null
          block_type: string
          caption_text: string | null
          created_at: string
          embed_id: string | null
          embed_provider: string | null
          height: number | null
          id: string
          kind: string | null
          layout: string
          poster_url: string | null
          project_id: string
          sort_order: number
          text_content: string | null
          text_heading: string | null
          text_style: string
          thumbnail_url: string | null
          url: string | null
          width: number | null
        }
        Insert: {
          alt?: string | null
          aspect_h?: number | null
          aspect_w?: number | null
          block_type?: string
          caption_text?: string | null
          created_at?: string
          embed_id?: string | null
          embed_provider?: string | null
          height?: number | null
          id?: string
          kind?: string | null
          layout?: string
          poster_url?: string | null
          project_id: string
          sort_order?: number
          text_content?: string | null
          text_heading?: string | null
          text_style?: string
          thumbnail_url?: string | null
          url?: string | null
          width?: number | null
        }
        Update: {
          alt?: string | null
          aspect_h?: number | null
          aspect_w?: number | null
          block_type?: string
          caption_text?: string | null
          created_at?: string
          embed_id?: string | null
          embed_provider?: string | null
          height?: number | null
          id?: string
          kind?: string | null
          layout?: string
          poster_url?: string | null
          project_id?: string
          sort_order?: number
          text_content?: string | null
          text_heading?: string | null
          text_style?: string
          thumbnail_url?: string | null
          url?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          banner2_image: string
          banner3_image: string
          category: string
          client: string
          content1_heading: string | null
          content1_image: string
          content1_style: string
          content1_text: string
          content2_heading: string | null
          content2_image: string
          content2_style: string
          content2_text: string
          created_at: string
          featured_home: boolean
          grid_aspect_ratio: string
          grid_crop: Json | null
          grid_object_position: string
          header_kind: string
          header_video_aspect_h: number | null
          header_video_aspect_w: number | null
          header_video_embed_id: string | null
          header_video_poster: string | null
          header_video_provider: string | null
          header_video_url: string | null
          hero_image: string
          home_position: number | null
          id: string
          intro_paragraph: string
          landing_crop: Json | null
          project_name: string | null
          published: boolean
          real_page_path: string | null
          services: string[]
          show_in_grid: boolean
          show_in_index: boolean
          slug: string
          sort_order: number
          title: string
          updated_at: string
          year: string
        }
        Insert: {
          banner2_image?: string
          banner3_image?: string
          category?: string
          client?: string
          content1_heading?: string | null
          content1_image?: string
          content1_style?: string
          content1_text?: string
          content2_heading?: string | null
          content2_image?: string
          content2_style?: string
          content2_text?: string
          created_at?: string
          featured_home?: boolean
          grid_aspect_ratio?: string
          grid_crop?: Json | null
          grid_object_position?: string
          header_kind?: string
          header_video_aspect_h?: number | null
          header_video_aspect_w?: number | null
          header_video_embed_id?: string | null
          header_video_poster?: string | null
          header_video_provider?: string | null
          header_video_url?: string | null
          hero_image?: string
          home_position?: number | null
          id?: string
          intro_paragraph?: string
          landing_crop?: Json | null
          project_name?: string | null
          published?: boolean
          real_page_path?: string | null
          services?: string[]
          show_in_grid?: boolean
          show_in_index?: boolean
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
          year?: string
        }
        Update: {
          banner2_image?: string
          banner3_image?: string
          category?: string
          client?: string
          content1_heading?: string | null
          content1_image?: string
          content1_style?: string
          content1_text?: string
          content2_heading?: string | null
          content2_image?: string
          content2_style?: string
          content2_text?: string
          created_at?: string
          featured_home?: boolean
          grid_aspect_ratio?: string
          grid_crop?: Json | null
          grid_object_position?: string
          header_kind?: string
          header_video_aspect_h?: number | null
          header_video_aspect_w?: number | null
          header_video_embed_id?: string | null
          header_video_poster?: string | null
          header_video_provider?: string | null
          header_video_url?: string | null
          hero_image?: string
          home_position?: number | null
          id?: string
          intro_paragraph?: string
          landing_crop?: Json | null
          project_name?: string | null
          published?: boolean
          real_page_path?: string | null
          services?: string[]
          show_in_grid?: boolean
          show_in_index?: boolean
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      seo_settings: {
        Row: {
          description: string | null
          id: string
          og_image: string | null
          page: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          og_image?: string | null
          page: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          og_image?: string | null
          page?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          background_color: string
          favicon_url: string | null
          id: string
          share_image_url: string | null
          text_color: string
          updated_at: string
        }
        Insert: {
          background_color?: string
          favicon_url?: string | null
          id?: string
          share_image_url?: string | null
          text_color?: string
          updated_at?: string
        }
        Update: {
          background_color?: string
          favicon_url?: string | null
          id?: string
          share_image_url?: string | null
          text_color?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string
          id: string
          name: string
          photo_url: string | null
          published: boolean
          role: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string
          photo_url?: string | null
          published?: boolean
          role?: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          photo_url?: string | null
          published?: boolean
          role?: string
          sort_order?: number
        }
        Relationships: []
      }
      techpacks: {
        Row: {
          created_at: string | null
          data: Json
          id: string
          model_name: string
          version: string
        }
        Insert: {
          created_at?: string | null
          data: Json
          id?: string
          model_name: string
          version: string
        }
        Update: {
          created_at?: string | null
          data?: Json
          id?: string
          model_name?: string
          version?: string
        }
        Relationships: []
      }
      website_writings: {
        Row: {
          broadcast_id: string
          created_at: string | null
          id: string
          sort_index: number | null
        }
        Insert: {
          broadcast_id: string
          created_at?: string | null
          id?: string
          sort_index?: number | null
        }
        Update: {
          broadcast_id?: string
          created_at?: string | null
          id?: string
          sort_index?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_portfolio_artwork_ids: { Args: { p_slug: string }; Returns: string[] }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
