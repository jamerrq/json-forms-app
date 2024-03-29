'use client'

import { uploadAnswers } from '@/app/utils/supabaseActions'
import { useRef } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { type Session } from '@supabase/auth-helpers-nextjs'

function createItem (item: FormItem, key?: number, preload?: Record<string, string>) {
  const generalStyle = 'bg-[#94A3B8] rounded font-semibold p-2'
  const labelStyle = 'font-semibold text-[#3B82F6]'
  const inputStyle = 'bg-[#14B8A6] rounded font-semibold p-2 disabled:bg-gray-400 disabled:cursor-not-allowed'
  // const preloadedValue = preload?.[item.name]
  // console.log(item, preloadedValue)
  switch (item.type) {
    case 'text':
      return (
        <div className="flex flex-col gap-2" key={key}>
          <label htmlFor={item.name} className={labelStyle}>{item.label}</label>
          <input type="text" name={item.name} id={item.name} required={item.required} className={generalStyle} />
        </div>
      )
    case 'textarea':
      return (
        <div className="flex flex-col gap-2" key={key}>
          <label htmlFor={item.name} className={labelStyle}>{item.label}</label>
          <textarea name={item.name} id={item.name} required={item.required} className={generalStyle}/>
        </div>
      )
    case 'select':
      return (
        <div className="flex flex-col gap-2" key={key}>
          <label htmlFor={item.name} className={labelStyle}>{item.label}</label>
          <select name={item.name} id={item.name} required={item.required} className={generalStyle}>
            {item.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>
      )
    case 'radio':
      // console.log(preloadedValue, item.options)
      return (
        <div className="flex flex-col gap-2" key={key}>
          <label htmlFor={item.name} className={labelStyle}>{item.label}</label>
          {item.options?.map((option) => (
            <div key={option.value} className="flex flex-row gap-2">
              <input type="radio" name={item.name} id={item.name} required={item.required} />
              <label htmlFor={item.name}>{option.label}</label>
            </div>
          ))}
        </div>
      )
    case 'checkbox':
      return (
        <div className="flex flex-col gap-2" key={key}>
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
                <div className="flex flex-row gap-2" key={key}>
                  <input type="checkbox" name={item.name} id={item.name} required={item.required} className={generalStyle}/>
                  <label htmlFor={item.name} className={labelStyle}>{item.label}</label>
                </div>
                )
          }
        </div>
      )
    case 'date':
      return (
        <div className="flex flex-col gap-2" key={key}>
          <label htmlFor={item.name} className={labelStyle}>{item.label}</label>
          <input type="date" name={item.name} id={item.name} required={item.required} className={generalStyle}/>
        </div>
      )
    case 'tel':
      return (
        <div className="flex flex-col gap-2" key={key}>
          <label htmlFor={item.name} className={labelStyle}>{item.label}</label>
          <input type="tel" name={item.name} id={item.name} required={item.required} className={generalStyle}/>
        </div>
      )
    case 'submit':
      return (
        <div className="flex flex-col gap-2 cursor-pointer" key={key}>
          <input type="submit" name={item.name} id={item.name} required={item.required} value={item.label} className={inputStyle + ' cursor-pointer'}/>
        </div>
      )
    default:
      return <p key={key}>Tipo desconocido: {item.type}</p>
  }
}

export default function Form ({ items, hash, session, preload }: { items: FormItem[], hash: string, session: Session | null, preload?: Record<string, string> }) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const cleanForm = () => {
    formRef.current?.reset()
  }
  const submitForm = async (formData: FormData) => {
    const result = await uploadAnswers(formData)
    if (result >= 400) {
      if (result === 401) {
        return await Swal.fire({
          title: 'Error de autenticación',
          text: 'Debes iniciar sesión para poder enviar una respuesta',
          icon: 'error'
        })
      }
      await Swal.fire({
        title: 'Error',
        text: 'No se pudo enviar el formulario. Por favor, intente nuevamente.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } else {
      const { isConfirmed } = await Swal.fire({
        title: 'Formulario enviado',
        text: 'Gracias por completar el formulario.',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Ir a la página de respuestas',
        cancelButtonText: 'Enviar otro formulario'
      })
      if (isConfirmed) {
        // window.location.href = `/answers/${hash}`
        router.push(`/answers/${hash}`)
      } else {
        cleanForm()
      }
    }
    cleanForm()
  }
  return (
    <form ref={formRef} action={async (FormData) => {
      await submitForm(FormData)
    }} className="flex flex-col items-center justify-center p-6 gap-3">
      <h1 className="font-semibold text-lime-600">Hash: {hash}</h1>
      <input type="hidden" name="hash" id="hash" value={hash} />
      <input type="hidden" name="owner" id="owner" value={session?.user?.id} />
      {preload !== null && JSON.stringify(preload)}
      {items.map((item, index) => createItem(item, index, preload))}
    </form>
  )
}
