import { useDropzone } from 'react-dropzone'
import { useCallback, useState } from 'react'
import LoadingSpinner from './loading-spinner'

export default function MyDropzone () {
  const [isProcessing, setIsProcessing] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      alert('Nombre del archivo: ' + acceptedFiles[0].name + '\n' + 'Tamaño del archivo: ' + acceptedFiles[0].size + ' bytes')
    }, 5000)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false })

  return (
    <div {...getRootProps()} className="border-4 border-dashed rounded px-4 py-6 grid font-semibold items-center place-content-center">
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
  )
}
