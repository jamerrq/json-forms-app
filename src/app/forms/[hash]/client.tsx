'use client'
import { uploadAnswers } from '@/app/utils/supabaseActions'
import { useRef } from 'react'
import Swal from 'sweetalert2'

function createItem (item: {
  type: string
  name: string
  label: string
  required: boolean
  options?: Array<Record<string, string>>
}, key?: number) {
  const generalStyle = 'bg-slate-400 rounded font-semibold p-2'
  const labelStyle = 'font-semibold text-blue-500'
  const inputStyle = 'bg-teal-500 rounded font-semibold p-2 disabled:bg-gray-400 disabled:cursor-not-allowed'
  switch (item.type) {
    case 'text':
      return (
        <div className="flex flex-col gap-2" key={key}>
          <label htmlFor={item.name} className={labelStyle}>{item.label}</label>
          <input type="text" name={item.name} id={item.name} required={item.required} className={generalStyle}/>
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
      return (
        <div className="flex flex-col gap-2" key={key}>
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

export default function Form ({ items, hash }: { items: FormItem[], hash: string }) {
  const formRef = useRef<HTMLFormElement>(null)
  const cleanForm = () => {
    formRef.current?.reset()
  }
  const submitForm = async (formData: FormData) => {
    const result = await uploadAnswers(formData)
    if (result >= 400) {
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
        window.location.href = `/answers/${hash}`
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
      {items.map((item, index) => createItem(item, index))}
    </form>
  )
}
