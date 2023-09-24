import { getFormFromSupabase, uploadAnswerToSupabase } from '@/app/utils/supabaseActions'
// import Swal from 'sweetalert2'

function createItem (item: { type: string, name: string, label: string, required: boolean, options?: Array<Record<string, string>> }) {
  const generalStyle = 'bg-slate-400 rounded font-semibold p-2'
  const labelStyle = 'font-semibold text-blue-500'
  const inputStyle = 'bg-teal-500 rounded font-semibold p-2 disabled:bg-gray-400 disabled:cursor-not-allowed'
  switch (item.type) {
    case 'text':
      return (
        <div className="flex flex-col gap-2">
          <label htmlFor={item.name} className={labelStyle}>{item.label}</label>
          <input type="text" name={item.name} id={item.name} required={item.required} className={generalStyle}/>
        </div>
      )
    case 'textarea':
      return (
        <div className="flex flex-col gap-2">
          <label htmlFor={item.name} className={labelStyle}>{item.label}</label>
          <textarea name={item.name} id={item.name} required={item.required} className={generalStyle}/>
        </div>
      )
    case 'select':
      return (
        <div className="flex flex-col gap-2">
          <label htmlFor={item.name} className={labelStyle}>{item.label}</label>
          <select name={item.name} id={item.name} required={item.required} className={generalStyle}>
            {item.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>
      )
    case 'radio':
      return (
        <div className="flex flex-col gap-2">
          <label htmlFor={item.name} className={labelStyle}>{item.label}</label>
          {item.options?.map((option) => (
            <div key={option.value} className="flex flex-row gap-2">
              <input type="radio" name={item.name} id={item.name} required={item.required} value={option.value} />
              <label htmlFor={item.name}>{option.label}</label>
            </div>
          ))}
        </div>
      )
    case 'checkbox':
      return (
        <div className="flex flex-col gap-2">
          {
            item.options !== undefined
              ? (
                  item.options.map((option) => (
                  <div key={option.value} className="flex flex-row gap-2">
                    <input type="checkbox" name={item.name} id={item.name} required={item.required} value={option.value} className={generalStyle}/>
                    <label htmlFor={item.name} className={labelStyle}>{option.label}</label>
                  </div>
                  ))
                )
              : (
                <div className="flex flex-row gap-2">
                  <input type="checkbox" name={item.name} id={item.name} required={item.required} className={generalStyle}/>
                  <label htmlFor={item.name} className={labelStyle}>{item.label}</label>
                </div>
                )
          }
        </div>
      )
    case 'date':
      return (
        <div className="flex flex-col gap-2">
          <label htmlFor={item.name} className={labelStyle}>{item.label}</label>
          <input type="date" name={item.name} id={item.name} required={item.required} className={generalStyle}/>
        </div>
      )
    case 'tel':
      return (
        <div className="flex flex-col gap-2">
          <label htmlFor={item.name} className={labelStyle}>{item.label}</label>
          <input type="tel" name={item.name} id={item.name} required={item.required} className={generalStyle}/>
        </div>
      )
    case 'submit':
      return (
        <div className="flex flex-col gap-2">
          <input type="submit" name={item.name} id={item.name} required={item.required} value={item.label} className={inputStyle} disabled={
            !!item.required
          }/>
        </div>
      )
    default:
      return <p>Tipo desconocido: {item.type}</p>
  }
}

export default async function HashedForm ({ params }: { params: { hash: string } }) {
  const { hash } = params
  const form = await getFormFromSupabase(hash)
  // const postAction = async (formData: FormData) => {
  //   'use server'
  //   const status = await uploadAnswerToSupabase(formData)
  //   // revalidatePath(`/forms/${hash}`)
  //   if (status === 200) {
  //     await Swal.fire({
  //       title: '¡Éxito!',
  //       text: 'Respuesta enviada correctamente',
  //       icon: 'success',
  //       confirmButtonText: 'Ok'
  //     })
  //   } else {
  //     await Swal.fire({
  //       title: '¡Error!',
  //       text: 'Hubo un error al enviar la respuesta',
  //       icon: 'error',
  //       confirmButtonText: 'Ok'
  //     })
  //   }
  // }
  return (
    <div className="grid place-content-center">
      <form action={uploadAnswerToSupabase} className="flex flex-col items-center justify-center p-6 gap-3">
        <h1 className="font-semibold text-lime-600">Hash: {hash}</h1>
        <input type="hidden" name="hash" id="hash" value={hash} />
        {form?.items?.map((item) => createItem(item))}
      </form>
      <a href={`/answers/${hash}`} className="flex flex-col gap-2 bg-green-500 py-2 rounded text-center justify-items-center items-center font-semibold hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer px-1 w-80 self-center mx-auto" title="Ver Respuestas">
        VER RESPUESTAS
      </a>
    </div>
  )
}
