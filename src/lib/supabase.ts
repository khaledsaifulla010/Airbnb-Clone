import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: "user" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin";
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          name_bn: string;
          icon: string | null;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_bn: string;
          icon?: string | null;
          slug: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_bn?: string;
          icon?: string | null;
          slug?: string;
          created_at?: string;
        };
      };
      properties: {
        Row: {
          id: string;
          title: string;
          title_bn: string;
          description: string | null;
          description_bn: string | null;
          category_id: string | null;
          price_per_night: number;
          location: string;
          location_bn: string;
          latitude: number | null;
          longitude: number | null;
          max_guests: number;
          bedrooms: number;
          bathrooms: number;
          rating: number;
          review_count: number;
          is_active: boolean;
          admin_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          title_bn: string;
          description?: string | null;
          description_bn?: string | null;
          category_id?: string | null;
          price_per_night: number;
          location: string;
          location_bn: string;
          latitude?: number | null;
          longitude?: number | null;
          max_guests: number;
          bedrooms: number;
          bathrooms: number;
          rating?: number;
          review_count?: number;
          is_active?: boolean;
          admin_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          title_bn?: string;
          description?: string | null;
          description_bn?: string | null;
          category_id?: string | null;
          price_per_night?: number;
          location?: string;
          location_bn?: string;
          latitude?: number | null;
          longitude?: number | null;
          max_guests?: number;
          bedrooms?: number;
          bathrooms?: number;
          rating?: number;
          review_count?: number;
          is_active?: boolean;
          admin_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      property_images: {
        Row: {
          id: string;
          property_id: string;
          image_url: string;
          alt_text: string | null;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          image_url: string;
          alt_text?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          image_url?: string;
          alt_text?: string | null;
          display_order?: number;
          created_at?: string;
        };
      };
      amenities: {
        Row: {
          id: string;
          name: string;
          name_bn: string;
          icon: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_bn: string;
          icon?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_bn?: string;
          icon?: string | null;
          created_at?: string;
        };
      };
      property_amenities: {
        Row: {
          id: string;
          property_id: string;
          amenity_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          amenity_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          amenity_id?: string;
          created_at?: string;
        };
      };
    };
  };
};
