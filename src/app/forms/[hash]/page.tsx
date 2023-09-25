import { getFormFromSupabase } from '@/app/utils/supabaseActions'
import Form from './client'

export default async function HashedForm ({ params }: { params: { hash: string } }) {
  const { hash } = params
  const form = await getFormFromSupabase(hash)
  return (
    <div className="grid place-content-center">
      <Form items={form?.items} hash={hash} />
      <a href={`/answers/${hash}`} className="flex flex-col gap-2 bg-green-500 py-2 rounded text-center justify-items-center items-center font-semibold hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer px-1 w-80 self-center mx-auto" title="Ver Respuestas">
        VER RESPUESTAS
      </a>
    </div>
  )
}
