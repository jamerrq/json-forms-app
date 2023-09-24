// import { createClient } from '@supabase/supabase-js'

// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL as string,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
// )

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const supabase = createServerComponentClient({ cookies })
