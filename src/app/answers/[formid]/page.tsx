import { getAnswersFromSupabase } from '@/app/utils/supabaseActions'

function getFields (answers: Array<Record<string, any>>) {
  const fields: string[] = []
  answers.forEach((answer) => {
    Object.keys(answer).forEach((key) => {
      if (!fields.includes(key)) {
        fields.push(key)
      }
    })
  })
  return fields
}

export default async function AnswersPage ({ params }: { params: { formid: string } }) {
  const { formid } = params
  const answers = await getAnswersFromSupabase(formid)
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
            answers.map((answer) => (
              <tr key={answer.id}>
                {
                  getFields(answers).map((field) => (
                    <td key={field} className="px-1 border-r-2 border-b-2">{answer[field]}</td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </main>
  )
}
