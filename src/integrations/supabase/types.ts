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
      acquisition_requests: {
        Row: {
          answered_at: string | null
          artwork_ids: string[]
          catalogue_slug: string | null
          created_at: string
          email: string
          id: string
          lang: string | null
          message: string | null
          name: string
          page_url: string | null
          phone: string | null
          selection_slug: string | null
          status: string
        }
        Insert: {
          answered_at?: string | null
          artwork_ids: string[]
          catalogue_slug?: string | null
          created_at?: string
          email: string
          id?: string
          lang?: string | null
          message?: string | null
          name: string
          page_url?: string | null
          phone?: string | null
          selection_slug?: string | null
          status?: string
        }
        Update: {
          answered_at?: string | null
          artwork_ids?: string[]
          catalogue_slug?: string | null
          created_at?: string
          email?: string
          id?: string
          lang?: string | null
          message?: string | null
          name?: string
          page_url?: string | null
          phone?: string | null
          selection_slug?: string | null
          status?: string
        }
        Relationships: []
      }
      admin_secrets: {
        Row: {
          key: string
          value: string
        }
        Insert: {
          key: string
          value: string
        }
        Update: {
          key?: string
          value?: string
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
      artwork_attention: {
        Row: {
          acquires: number
          artwork_id: string
          collects: number
          day: string
          dwell_ms: number
          image_steps: number
          session_id: string
          updated_at: string
          zooms: number
        }
        Insert: {
          acquires?: number
          artwork_id: string
          collects?: number
          day?: string
          dwell_ms?: number
          image_steps?: number
          session_id: string
          updated_at?: string
          zooms?: number
        }
        Update: {
          acquires?: number
          artwork_id?: string
          collects?: number
          day?: string
          dwell_ms?: number
          image_steps?: number
          session_id?: string
          updated_at?: string
          zooms?: number
        }
        Relationships: [
          {
            foreignKeyName: "artwork_attention_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
        ]
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
      drop01_rsvps: {
        Row: {
          created_at: string
          day: string
          email: string
          guests: number
          id: string
          lang: string | null
          name: string
          newsletter: boolean
          times_updated: number
          updated_at: string
          version: string | null
        }
        Insert: {
          created_at?: string
          day: string
          email: string
          guests?: number
          id?: string
          lang?: string | null
          name: string
          newsletter?: boolean
          times_updated?: number
          updated_at?: string
          version?: string | null
        }
        Update: {
          created_at?: string
          day?: string
          email?: string
          guests?: number
          id?: string
          lang?: string | null
          name?: string
          newsletter?: boolean
          times_updated?: number
          updated_at?: string
          version?: string | null
        }
        Relationships: []
      }
      film_guide_clips: {
        Row: {
          end_s: number
          key: string
          start_s: number
          updated_at: string
          video_path: string
        }
        Insert: {
          end_s?: number
          key: string
          start_s?: number
          updated_at?: string
          video_path: string
        }
        Update: {
          end_s?: number
          key?: string
          start_s?: number
          updated_at?: string
          video_path?: string
        }
        Relationships: []
      }
      film_guide_leads: {
        Row: {
          admin_note: string | null
          answers: Json
          contact: string | null
          contact_via: string | null
          created_at: string
          created_by: string | null
          custom_offer: Json | null
          estimate_eur: number | null
          furthest_step: number
          guests: string | null
          id: string
          lang: string | null
          last_step: string | null
          location: string | null
          names: string | null
          opened_at: string | null
          package_hint: string | null
          sent_at: string | null
          sent_via: string | null
          source: string
          status: string
          step_times: Json
          story: string | null
          token: string
          updated_at: string
          wedding_date: string | null
        }
        Insert: {
          admin_note?: string | null
          answers?: Json
          contact?: string | null
          contact_via?: string | null
          created_at?: string
          created_by?: string | null
          custom_offer?: Json | null
          estimate_eur?: number | null
          furthest_step?: number
          guests?: string | null
          id?: string
          lang?: string | null
          last_step?: string | null
          location?: string | null
          names?: string | null
          opened_at?: string | null
          package_hint?: string | null
          sent_at?: string | null
          sent_via?: string | null
          source?: string
          status?: string
          step_times?: Json
          story?: string | null
          token: string
          updated_at?: string
          wedding_date?: string | null
        }
        Update: {
          admin_note?: string | null
          answers?: Json
          contact?: string | null
          contact_via?: string | null
          created_at?: string
          created_by?: string | null
          custom_offer?: Json | null
          estimate_eur?: number | null
          furthest_step?: number
          guests?: string | null
          id?: string
          lang?: string | null
          last_step?: string | null
          location?: string | null
          names?: string | null
          opened_at?: string | null
          package_hint?: string | null
          sent_at?: string | null
          sent_via?: string | null
          source?: string
          status?: string
          step_times?: Json
          story?: string | null
          token?: string
          updated_at?: string
          wedding_date?: string | null
        }
        Relationships: []
      }
      film_guide_settings: {
        Row: {
          data: Json
          id: number
          updated_at: string
        }
        Insert: {
          data: Json
          id?: number
          updated_at?: string
        }
        Update: {
          data?: Json
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      gallery_configs: {
        Row: {
          active: boolean
          couple_name: string
          cover_path: string | null
          created_at: string
          dropbox_path: string
          film_image_paths: string[]
          films: Json
          has_photos: boolean
          highlight_paths: string[]
          id: string
          location: string
          slug: string
          story_heading_de: string
          story_heading_en: string
          story_label_de: string
          story_label_en: string
          updated_at: string
          wedding_date: string
        }
        Insert: {
          active?: boolean
          couple_name: string
          cover_path?: string | null
          created_at?: string
          dropbox_path: string
          film_image_paths?: string[]
          films?: Json
          has_photos?: boolean
          highlight_paths?: string[]
          id?: string
          location?: string
          slug: string
          story_heading_de?: string
          story_heading_en?: string
          story_label_de?: string
          story_label_en?: string
          updated_at?: string
          wedding_date?: string
        }
        Update: {
          active?: boolean
          couple_name?: string
          cover_path?: string | null
          created_at?: string
          dropbox_path?: string
          film_image_paths?: string[]
          films?: Json
          has_photos?: boolean
          highlight_paths?: string[]
          id?: string
          location?: string
          slug?: string
          story_heading_de?: string
          story_heading_en?: string
          story_label_de?: string
          story_label_en?: string
          updated_at?: string
          wedding_date?: string
        }
        Relationships: []
      }
      gallery_products: {
        Row: {
          active: boolean
          coming_soon: boolean
          created_at: string
          description_de: string
          description_en: string
          id: string
          image_url: string
          sizes: Json
          slug: string
          sort_index: number
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          coming_soon?: boolean
          created_at?: string
          description_de?: string
          description_en?: string
          id?: string
          image_url?: string
          sizes?: Json
          slug: string
          sort_index?: number
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          coming_soon?: boolean
          created_at?: string
          description_de?: string
          description_en?: string
          id?: string
          image_url?: string
          sizes?: Json
          slug?: string
          sort_index?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      jr_early_access: {
        Row: {
          created_at: string
          drops: string[]
          email: string | null
          id: string
          name: string
          note: string | null
          phone: string | null
          source: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          drops?: string[]
          email?: string | null
          id?: string
          name: string
          note?: string | null
          phone?: string | null
          source?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          drops?: string[]
          email?: string | null
          id?: string
          name?: string
          note?: string | null
          phone?: string | null
          source?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_shares: {
        Row: {
          artwork_ids: string[]
          created_at: string
          id: string
          kind: string
          slug: string
        }
        Insert: {
          artwork_ids: string[]
          created_at?: string
          id?: string
          kind?: string
          slug: string
        }
        Update: {
          artwork_ids?: string[]
          created_at?: string
          id?: string
          kind?: string
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
          seo_description: string | null
          seo_title: string | null
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
          seo_description?: string | null
          seo_title?: string | null
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
          seo_description?: string | null
          seo_title?: string | null
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
      site_admins: {
        Row: {
          email: string
        }
        Insert: {
          email: string
        }
        Update: {
          email?: string
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
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
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
      admin_create_catalogue_share: {
        Args: { p_ids: string[]; p_slug: string; p_token: string }
        Returns: undefined
      }
      admin_list_requests: {
        Args: { p_token: string }
        Returns: {
          answered_at: string | null
          artwork_ids: string[]
          catalogue_slug: string | null
          created_at: string
          email: string
          id: string
          lang: string | null
          message: string | null
          name: string
          page_url: string | null
          phone: string | null
          selection_slug: string | null
          status: string
        }[]
        SetofOptions: {
          from: "*"
          to: "acquisition_requests"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      admin_token_ok: { Args: { p_token: string }; Returns: boolean }
      admin_update_request: {
        Args: {
          p_catalogue_slug?: string
          p_id: string
          p_status: string
          p_token: string
        }
        Returns: undefined
      }
      artwork_attention_scores: {
        Args: never
        Returns: {
          artwork_id: string
          avg_seconds: number
          score: number
          visits_30d: number
        }[]
      }
      drop01_rsvp_submit: {
        Args: {
          p_day: string
          p_email: string
          p_guests: number
          p_lang?: string
          p_name: string
          p_newsletter: boolean
          p_version?: string
        }
        Returns: Json
      }
      film_guide_is_admin: { Args: never; Returns: boolean }
      get_portfolio_artwork_ids: { Args: { p_slug: string }; Returns: string[] }
      get_portfolio_share: {
        Args: { p_slug: string }
        Returns: {
          artwork_ids: string[]
          kind: string
        }[]
      }
      is_site_admin: { Args: never; Returns: boolean }
      track_attention: {
        Args: {
          p_acquire?: boolean
          p_artwork: string
          p_collect?: boolean
          p_dwell_ms?: number
          p_session: string
          p_steps?: number
          p_zooms?: number
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
