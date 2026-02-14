import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ブラウザ側で使い回す Supabase クライアントを生成する。
let browserClient: SupabaseClient | null = null;

export function createSupabaseBrowserClient() {
  // 既存インスタンスがあれば再利用して多重生成を防ぐ。
  if (browserClient) {
    return browserClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 必須環境変数が不足していれば初期化を止める。
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase browser env vars are missing.");
  }

  // ブラウザ用 Supabase クライアントを生成して保持する。
  browserClient = createClient(supabaseUrl, supabaseAnonKey);
  return browserClient;
}
