import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mskatcocdrnabgkiamha.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1za2F0Y29jZHJuYWJna2lhbWhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MTUzMjYsImV4cCI6MjA2OTA5MTMyNn0.aALIPDTLgNqZN4ojONFPAo8jMWBseJ31dhp8_ZzEbSo";



export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});