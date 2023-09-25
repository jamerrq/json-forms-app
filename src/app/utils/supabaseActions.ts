'use server'
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
const supabase = createServerActionClient({ cookies })

export const getFormsFromSupabase = async (): Promise<Form[]> => {
  const { data, error } = await supabase.from('forms').select('*')
  if (error !== null) {
    throw new Error(error.message)
  }
  if (data === null) {
    throw new Error('data is null')
  }
  return data
}

export const uploadFormToSupabase = async (formData: FormData) => {
  const id = formData.get('hash')
  const jsonContent = formData.get('json') as string
  if (id === null || jsonContent === null) {
    throw new Error('hash or json is null')
  }
  const rawJson = JSON.stringify(JSON.parse(jsonContent))
  const result = await supabase.from('forms').insert({ id, json_content: rawJson })
  return result.status
}

export const getFormFromSupabase = async (id: string): Promise<Form> => {
  const { data, error } = await supabase.from('forms').select('json_content').eq('id', id).single()
  if (error !== null) {
    throw new Error(error.message)
  }
  if (data === null) {
    throw new Error('data is null')
  }
  return JSON.parse(data.json_content)
}

export const uploadAnswerToSupabase = async (formData: FormData) => {
  const fields = Object.fromEntries(formData.entries())
  const { hash, ...filteredFields } = Object.fromEntries(Object.entries(fields).filter(([key, value]) => key !== 'formId' && value !== '' && !key.startsWith('$')))
  const result = await supabase.from('answers').insert({ form_id: hash, fields: filteredFields })
  // return result.status
  revalidatePath(`/answers/${hash as string}`)
  return result.status
}

export const getAnswersFromSupabase = async (formId: string): Promise<Answer[]> => {
  const { data, error } = await supabase.from('answers').select('fields').eq('form_id', formId)
  if (error !== null) {
    throw new Error(error.message)
  }
  if (data === null) {
    throw new Error('data is null')
  }
  return data.map((answer) => answer.fields)
}
