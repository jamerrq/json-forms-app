// import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
// import { type NextApiRequest, type NextApiResponse } from 'next'
// import cookie from 'cookie'

// export default async function handler (req: NextApiRequest, res: NextApiResponse) {
//   const cookies = cookie.parse(req.headers.cookie ?? '')
//   const cookiesFunction = () => cookies as ReadonlyRequestCookies
//   const supabase = createServerActionClient({ cookies: cookiesFunction })
//   // ...
// }
