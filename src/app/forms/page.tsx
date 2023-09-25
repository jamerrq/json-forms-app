import { getFormsFromSupabase } from '@/app/utils/supabaseActions'
import { IconEye } from '@tabler/icons-react'

export default async function FormsPage () {
  const forms = await getFormsFromSupabase()
  return (
    <main className="flex flex-col items-center justify-center p-12 gap-3">
      {
        forms?.map((form: any) => {
          return (
            <div className="grid grid-cols-[1fr,30px] w-full gap-1" key={form.id}>
              <a href={`/forms/${form.id}`} key={form.id} className="flex flex-col gap-2 bg-slate-500 py-2 rounded text-center justify-items-center items-center font-semibold hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer">
                <p>{form.id}</p>
              </a>
              <a href={`/answers/${form.id}`} className="flex flex-col gap-2 bg-green-500 py-2 rounded text-center justify-items-center items-center font-semibold hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer px-1" title="Ver Respuestas">
                <IconEye />
              </a>
            </div>
          )
        })
      }
    </main>
  )
}
