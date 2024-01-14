import { getFormById } from '@/app/utils/supabaseActions'
import Form from '@/app/components/form'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function HashedForm ({ params }: { params: { hash: string } }) {
  const supabase = createServerActionClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  const { hash } = params
  const form = await getFormById(hash)
  return (
    <div className="grid place-content-center mb-[100px]">
      <Form items={form?.items} hash={hash} session={session}/>
      <a href={`/answers/${hash}`} className="flex flex-col gap-2 bg-[#22C55E] py-2 rounded text-center justify-items-center items-center font-semibold hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer px-1 w-80 self-center mx-auto" title="Ver Respuestas">
        VER RESPUESTAS
      </a>
    </div>
  )
}
