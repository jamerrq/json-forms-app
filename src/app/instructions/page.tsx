export default function InstructionsPage () {
  return (
    <main className="flex flex-col items-left p-6 mb-8 gap-2 [&>h1]:font-bold [&>h1]:text-accent [&>h1]:text-xl">
      <h1>
        Instrucciones de uso
      </h1>
      <p className="text-left text-base">
        En la sección convertidor encontrarás una sección para poder subir un
        archivo tipo JSON con el siguiente formato:
      </p>
      <pre className="text-left text-xs p-2">
{`{
  "items": [
    {
      "label": "¿Cómo nos encontraste?",
      "name": "how_found",
      "options": [
        {
          "label": "Amigos",
          "value": "friends"
        },
        {
          "label": "Búsqueda en línea",
          "value": "online_search"
        },
        {
          "label": "Publicidad",
          "value": "advertisement"
        }
      ],
      "required": true,
      "type": "radio"
    },
    {
      "label": "Enviar",
      "type": "submit"
    }
  ]
}
`}
      </pre>
      <p className="text-left text-base">
        El archivo debe tener una propiedad <code>items</code> que contenga un
        arreglo de objetos con las siguientes propiedades:
      </p>
      <ul className="text-left text-base [&>li>code]:text-accent">
        <li>
          <code>label</code>: El texto que se mostrará en el formulario
        </li>
        <li>
          <code>name</code>: El nombre del campo, debe ser único
        </li>
        <li>
          <code>options</code>: Las opciones de un campo de tipo <code>radio</code> o <code>select</code>
        </li>
        <li>
          <code>required</code>: Si el campo es requerido o no
        </li>
        <li>
          <code>type</code>: El tipo de campo, puede ser <code>text</code>, <code>textarea</code>, <code>radio</code>, <code>select</code> o <code>submit</code>
        </li>
      </ul>
      <p className="text-left text-base">
        El formulario generado se puede compartir con el hash que se muestra
        en la parte superior de la página.
      </p>
      <p className="text-left text-base">
        En la sección de formularios encontrarás una lista de todos los
        formularios públicos que se han creado, puedes hacer click en el
        hash de cada formulario para ver el formulario y enviar respuestas.
        Así mismo, al lado de cada hash se encuentra un botón para copiar
        el hash al portapapeles y otro para ver sus respuestas.
      </p>
      <h1>
        Más información
      </h1>
      <p>
        Esta aplicación se desarrolló con el propósito de cumplir un desafío
        Full Stack y a modo de aprender y reforzar conocimientos en tecnologías
        como Next.js, TypeScript, TailwindCSS, Supabase y Vercel.
      </p>
      <p>
        Es totalmente de código abierto y puedes encontrar el código fuente
        en <a href="https://github.com/jamerrq/json-forms-app/tree/main"
         target="_blank" rel="noopener noreferrer" className="text-accent font-bold">Github</a> así como el desafío original (PDF) en <a className="text-accent font-bold" href="/challenge.pdf">
          este enlace
         </a>
      </p>
      <h2 className="text-accent text-xl font-semibold">
        Temas relacionados
      </h2>
      <ul>
        <li>
          <p>
            - Server Actions (Next.js)
          </p>
        </li>
        <li>
          <p>
            - Server & Client Actions (Supabase)
          </p>
        </li>
        <li>
          <p>
            - Authentication (Supabase - GitHub)
          </p>
        </li>
        <li>
          <p>
            - File Upload (React Dropzone)
          </p>
        </li>
      </ul>
    </main>
  )
}
