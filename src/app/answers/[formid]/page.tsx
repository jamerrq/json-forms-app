import { getAnswersByFormId } from '@/app/utils/supabaseActions'
import { IconEdit } from '@tabler/icons-react'

function getFields (answers: Answer[]) {
  const fields: string[] = []
  answers.forEach((answer) => {
    Object.keys(answer.fields).forEach((key) => {
      if (!fields.includes(key)) {
        fields.push(key)
      }
    })
  })
  return fields
}

export default async function AnswersPage ({ params }: { params: { formid: string } }) {
  const { formid } = params
  const answers = await getAnswersByFormId(formid)
  console.log(answers)
  return (
    <main className="flex flex-col items-center justify-center p-12">
      <h1 className="text-xl font-semibold mb-2">
        Respuestas de {formid}
      </h1>
      {
        answers.length === 0
          ? (
            <p className="text-center text-gray-400">
              No hay respuestas aún
            </p>
            )
          : null
      }
      <table className="table-auto gap-5 text-right border-2 border-spacing-1 [&>th]:[border-r-1]">
        <thead>
          <tr className="border-2">
            {
              getFields(answers).map((field) => (
                <th key={field} className="px-2 border-r-2">{field}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            answers.map((answer, index) => (
              <tr key={index}>
                {
                  getFields(answers).map((field) => (
                    <td key={field} className="px-1 border-r-2 border-b-2">{answer.fields[field]}</td>
                  ))
                }
                <td>
                  <a title="Editar Respuestas" href={`/edit/${formid}/${answer.id}`}>
                    <IconEdit size={24} stroke={2} color="#10B981" />
                  </a>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </main>
  )
}
