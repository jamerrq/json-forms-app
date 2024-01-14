import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getAnswerByIdFormId, getFormById } from '@/app/utils/supabaseActions'
import Form from '@/app/components/form'

export default async function EditFormPage ({ params }: { params: { formid: string, answerid: string } }) {
  const supabase = createServerActionClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.user?.id === undefined) {
    return (
    <div className="grid place-content-center mt-10 my-auto mb-[100px] w-80 mx-auto">
      <h1 className="text-4xl font-semibold text-center">Debes iniciar sesión para editar un formulario</h1>
    </div>
    )
  }
  const { formid, answerid } = params
  const answer = await getAnswerByIdFormId(formid, answerid)
  // console.log(answers)
  const form = await getFormById(formid)
  // console.log(form)
  return (
    <div className="flex flex-col items-center justify-center p-6 gap-1">
      <h1>Editar respuesta #{answer.id}</h1>
      <Form items={form?.items} hash={formid} session={session} preload={answer.fields}/>
    </div>
  )
}
