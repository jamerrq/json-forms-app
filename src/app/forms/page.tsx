import { getForms } from '@/app/utils/supabaseActions'
import { IconEye } from '@tabler/icons-react'

export default async function FormsPage () {
  const forms = await getForms()
  return (
    <main className="flex flex-col items-center justify-center p-12 gap-3 max-w-[500px] mx-auto">
      {
        forms?.length === 0
          ? <p className="text-center">No hay formularios creados</p>
          : null
      }
      {
        forms?.map((form: any) => {
          return (
            <div className="grid grid-cols-[1fr,30px] w-full gap-1" key={form.id}>
              <main className="bg-[#16A34A] rounded-sm hover:scale-105 duration-200 ease-in-out">
                <a href={`/forms/${form.id}`} key={form.id} className="flex flex-col gap-2 bg-[#64748B] py-2 rounded text-center justify-items-center items-center font-semibold">
                  <p>{form.id}</p>
                </a>
              </main>
              <aside className="bg-[#14B8A6] rounded-sm hover:scale-105 duration-200 ease-in-out">
                <a href={`/answers/${form.id}`} className="flex flex-col py-2 rounded text-center justify-items-center items-center font-semibold px-1" title="Ver Respuestas">
                  <IconEye />
                </a>
              </aside>
            </div>
          )
        })
      }
    </main>
  )
}
