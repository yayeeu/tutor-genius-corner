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
      aku_blog: {
        Row: {
          author_name: string
          content: string
          created_at: string
          featured_image: string | null
          id: string
          is_featured: boolean | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          author_name: string
          content: string
          created_at?: string
          featured_image?: string | null
          id?: string
          is_featured?: boolean | null
          slug: string
          status: string
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          content?: string
          created_at?: string
          featured_image?: string | null
          id?: string
          is_featured?: boolean | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      answers: {
        Row: {
          answer: string | null
          assignment_id: string | null
          created_at: string | null
          id: string
          is_correct: boolean | null
          question_id: string | null
          time_taken_seconds: number | null
          user_id: string | null
        }
        Insert: {
          answer?: string | null
          assignment_id?: string | null
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          question_id?: string | null
          time_taken_seconds?: number | null
          user_id?: string | null
        }
        Update: {
          answer?: string | null
          assignment_id?: string | null
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          question_id?: string | null
          time_taken_seconds?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "answers_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions_generated"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          completed: boolean | null
          course_id: string | null
          created_at: string | null
          id: string
          score: number | null
          type: string | null
          unit_id: string | null
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          score?: number | null
          type?: string | null
          unit_id?: string | null
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          score?: number | null
          type?: string | null
          unit_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          grade_level: number
          id: string
          name: string
        }
        Insert: {
          grade_level: number
          id?: string
          name: string
        }
        Update: {
          grade_level?: number
          id?: string
          name?: string
        }
        Relationships: []
      }
      learning_activity: {
        Row: {
          created_at: string | null
          date: string
          id: string
          minutes_spent: number
          questions_answered: number
          topics_viewed: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date?: string
          id?: string
          minutes_spent?: number
          questions_answered?: number
          topics_viewed?: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          minutes_spent?: number
          questions_answered?: number
          topics_viewed?: number
          user_id?: string
        }
        Relationships: []
      }
      marketing: {
        Row: {
          blog_updates: boolean
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          product_releases: boolean
        }
        Insert: {
          blog_updates?: boolean
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          product_releases?: boolean
        }
        Update: {
          blog_updates?: boolean
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          product_releases?: boolean
        }
        Relationships: []
      }
      post_categories: {
        Row: {
          category_id: number
          post_id: string
        }
        Insert: {
          category_id: number
          post_id: string
        }
        Update: {
          category_id?: number
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "aku_blog"
            referencedColumns: ["id"]
          },
        ]
      }
      questions_generated: {
        Row: {
          correct_answer: string | null
          course_id: string | null
          created_at: string | null
          id: string
          options: Json | null
          question: string
          source_text: string | null
          unit_id: string | null
          user_id: string | null
        }
        Insert: {
          correct_answer?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          options?: Json | null
          question: string
          source_text?: string | null
          unit_id?: string | null
          user_id?: string | null
        }
        Update: {
          correct_answer?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          options?: Json | null
          question?: string
          source_text?: string | null
          unit_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_generated_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_generated_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_generated_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_topic_mastery: {
        Row: {
          difficulty_pref: string | null
          id: string
          last_updated: string | null
          mastery_score: number | null
          unit_id: string | null
          user_id: string | null
        }
        Insert: {
          difficulty_pref?: string | null
          id?: string
          last_updated?: string | null
          mastery_score?: number | null
          unit_id?: string | null
          user_id?: string | null
        }
        Update: {
          difficulty_pref?: string | null
          id?: string
          last_updated?: string | null
          mastery_score?: number | null
          unit_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_topic_mastery_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_topic_mastery_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          grade_level: number | null
          id: string
          last_name: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          grade_level?: number | null
          id: string
          last_name?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          grade_level?: number | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      textbook_chunks: {
        Row: {
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          summary: string | null
          unit_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          summary?: string | null
          unit_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          summary?: string | null
          unit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "textbook_chunks_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      topics_covered: {
        Row: {
          created_at: string | null
          id: string
          last_studied_at: string | null
          mastery_level: number | null
          subject_name: string
          topic_name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_studied_at?: string | null
          mastery_level?: number | null
          subject_name: string
          topic_name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_studied_at?: string | null
          mastery_level?: number | null
          subject_name?: string
          topic_name?: string
          user_id?: string
        }
        Relationships: []
      }
      tutor_sessions: {
        Row: {
          created_at: string | null
          duration_minutes: number
          id: string
          questions_asked: number | null
          subject: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          duration_minutes?: number
          id?: string
          questions_asked?: number | null
          subject?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number
          id?: string
          questions_asked?: number | null
          subject?: string | null
          user_id?: string
        }
        Relationships: []
      }
      units: {
        Row: {
          course_id: string | null
          created_at: string
          id: string
          name: string
          summary: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          id?: string
          name: string
          summary?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string
          id?: string
          name?: string
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "units_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      match_text_chunks_with_unit: {
        Args: { query_embedding: string; match_count: number }
        Returns: {
          content: string
          metadata: Json
          unit_name: string
        }[]
      }
      match_text_chunks_with_unit2: {
        Args: { query_embedding: string; match_count: number }
        Returns: {
          content: string
          metadata: Json
          unit_name: string
          distance: number
        }[]
      }
      match_textbook_chunks: {
        Args: { query_embedding: string; match_count?: number }
        Returns: {
          content: string
          metadata: Json
        }[]
      }
      match_textbook_chunks_score: {
        Args: { query_embedding: string; match_count?: number }
        Returns: {
          content: string
          metadata: Json
          distance: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
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
