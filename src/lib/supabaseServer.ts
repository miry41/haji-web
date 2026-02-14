import { createClient } from "@supabase/supabase-js";

// サーバー側データ取得用の Supabase クライアントを生成する。
export function createSupabaseServerClient() {
  // サーバー側で利用する接続情報を環境変数から取得する。
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 値不足時は null を返して呼び出し側にフォールバックを任せる。
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  // サーバー取得用途なのでセッション永続化は無効化する。
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
