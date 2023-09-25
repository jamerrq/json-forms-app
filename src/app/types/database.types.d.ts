export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      answers: {
        Row: {
          created_at: string
          fields: Json | null
          form_id: string | null
          id: number
        }
        Insert: {
          created_at?: string
          fields?: Json | null
          form_id?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          fields?: Json | null
          form_id?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'answers_form_id_fkey'
            columns: ['form_id']
            referencedRelation: 'forms'
            referencedColumns: ['id']
          }
        ]
      }
      forms: {
        Row: {
          created_at: string
          id: string
          json_content: Json | null
        }
        Insert: {
          created_at?: string
          id: string
          json_content?: Json | null
        }
        Update: {
          created_at?: string
          id?: string
          json_content?: Json | null
        }
        Relationships: []
      }
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
