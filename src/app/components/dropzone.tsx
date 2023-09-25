'use client'

import { useDropzone } from 'react-dropzone'
import { useCallback, useState } from 'react'
import LoadingSpinner from './loading-spinner'
import { generateUniqueHash, validateJsonContentForm } from '@/app/utils/json'
import { JsonViewer } from '@textea/json-viewer'
import { uploadFormToSupabase } from '@/app/utils/supabaseActions'
import Swal from 'sweetalert2'

type Document = Record<string, any>
const ViewerComponent = (object: Document) => <JsonViewer value={object} defaultInspectDepth={1} displayDataTypes={false} rootName={'raíz'} />

export default function Dropzone () {
  const [isProcessing, setIsProcessing] = useState(false)
  const [innerContent, setInnerContent] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [hash, setHash] = useState('')

  const [form, setForm] = useState<FormData>(new FormData())

  const fileWasUploaded = () => {
    return innerContent !== ''
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const [file] = acceptedFiles
    if (file === null || file.type !== 'application/json') {
      alert('Solo se permiten archivos JSON')
      return
    }
    const reader = new FileReader()
    setIsProcessing(true)
    reader.onabort = () => { console.log('file reading was aborted') }
    reader.onerror = () => { console.log('file reading has failed') }
    reader.onload = () => {
      const binaryStr = reader.result
      // console.log(binaryStr)
      // validate json
      const isValid = validateJsonContentForm(binaryStr as string)
      if (!isValid) {
        alert('El archivo JSON no tiene el formato correcto')
        return
      }
      setInnerContent(binaryStr as string)
      // update form
      // const jsonFile = new File([binaryStr as string], file.name, { type:
      // file.type })
      const hash = generateUniqueHash(binaryStr as string)
      setHash(hash)
      setForm(new FormData())
      setForm((prev) => {
        prev.append('json', binaryStr as string)
        prev.append('hash', hash)
        return prev
      })
    }
    reader.readAsText(file)
    setIsProcessing(false)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false, accept: { 'text/html': ['.json'] } })

  const uploader = async () => {
    setIsUploading(true)
    const result = await uploadFormToSupabase(form)
    if (result >= 400) {
      if (result === 409) {
        // alert('Ya existe un formulario con ese hash')
        await Swal.fire({
          title: 'Ya existe un formulario con ese hash',
          text: '¿Deseas verlo?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            window.open(`/forms/${hash}`)
          }
        })
      } else {
        // alert(`Error ${result}`)
        await Swal.fire({
          title: 'Hubo un error!',
          text: `Error ${result}`,
          icon: 'error'
        })
      }
    } else {
      // alert(`Formulario con hash ${hash} creado con éxito`)
      // confirm(`Formulario con hash ${hash} creado con éxito\n¿Deseas verlo?`)
      // && window.open(`/forms/${hash}`)
      await Swal.fire({
        title: 'Formulario creado con éxito!',
        text: `Formulario con hash ${hash} creado con éxito`,
        icon: 'success'
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(`/forms/${hash}`)
        }
      })
    }
    setIsUploading(false)
  }

  return (
    <section className="bg-slate-50 flex gap-4 flex-col rounded p-4 text-[#000000aa]">
      <div {...getRootProps()} className="border-4 border-dashed rounded px-4 py-6 grid font-semibold items-center place-content-center border-[#bdbdbd] bg-[#fafafa] text-[#000000aa] ease-in-out transtiion-all">
        <input {...getInputProps()} />
        {
          isDragActive && !isProcessing
            ? <p>Arrastra tu archivo JSON aquí ...</p>
            : isProcessing
              ? <div className="grid justify-items-center"><LoadingSpinner /><p>Procesando...</p></div>
              : <div className="text-center">
            <p>Arrastra tu archivo JSON aquí</p>
            <p>o</p>
            <p> Haz clic para seleccionar un archivo</p>
          </div>
        }
      </div>
      <aside className="text-black">
        {
          fileWasUploaded() && document !== undefined
            ? (<>
              <p className="font-bold">Contenido</p>
              {
                ViewerComponent(JSON.parse(innerContent))
              }
              <p className="font-bold">Hash</p>
              <p className="font-semibold">{generateUniqueHash(innerContent)}</p>
            </>)
            : null
        }
      </aside>
      <form className="w-full grid" action={uploader}>
        <button disabled={
          !fileWasUploaded()
        } className='rounded bg-slate-950 text-white py-1 font-semibold disabled:bg-slate-400'>
          {
            isUploading && (
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>
            )
          }
          Generar Formulario
        </button>
      </form>
    </section>
  )
}
