// 浏览器客户端
import { createBrowserClient } from '@supabase/ssr'

// 您提供的Supabase URL
const supabaseUrl = 'https://lysweuannqyqmwskylsu.supabase.co'

export function createClient() {
  return createBrowserClient(
    supabaseUrl,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )
} 