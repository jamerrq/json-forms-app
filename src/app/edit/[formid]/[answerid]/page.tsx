// import Form from '../../forms/[hash]/client'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getAnswerByIdFormId, getFormById } from '@/app/utils/supabaseActions'

export default async function EditFormPage ({ params }: { params: { formid: string, answerid: string } }) {
  // const supabase = createServerActionClient({ cookies })
  // const { data: { session } } = await supabase.auth.getSession()
  // const { formid } = params
  // console.log(formid)
  // const form = await getFormById(formid)
  // if (session?.user?.id === undefined) {
  //   return (
  //   <div className="grid place-content-center mb-[100px]">
  //     <h1 className="text-4xl font-semibold text-center">Debes iniciar sesión para editar un formulario</h1>
  //   </div>
  //   )
  // }
  // const answers = await getAnswerByIdFormId(hash, session?.user?.id)
  // return (
  //   <>
  //   {
  //     answers
  //   }
  //   </>
  // )
  return (
    <div>
      <h1>Editar respuesta</h1>
      {
        JSON.stringify(params)
      }
    </div>
  )
}
