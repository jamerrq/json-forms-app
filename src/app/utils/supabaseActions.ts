'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'

export const getForms = async (): Promise<Form[]> => {
  const supabase = createServerActionClient({ cookies })
  const { data, error } = await supabase.from('forms').select('*')
  if (error !== null) {
    console.info('Error getting forms')
    console.error(error)
    throw new Error(error.message)
  }
  // if (data === null) {
  //   throw new Error('data is null')
  // }
  return data
}

export const uploadForm = async (formData: FormData) => {
  const supabase = createServerActionClient({ cookies })
  // get user id from owner
  const owner = formData.get('owner')
  if (owner === null) {
    throw new Error('owner is null')
  }
  const id = formData.get('hash')
  const jsonContent = formData.get('json') as string
  if (id === null || jsonContent === null) {
    throw new Error('hash or json is null')
  }
  const rawJson = JSON.stringify(JSON.parse(jsonContent))
  const result = await supabase.from('forms').upsert({ id, json_content: rawJson, user_id: owner })
  return result.status
}

export const getFormById = async (id: string): Promise<Form> => {
  const supabase = createServerActionClient({ cookies })
  const { data, error } = await supabase.from('forms').select('json_content').eq('id', id).single()
  if (error !== null) {
    throw new Error(error.message)
  }
  if (data === null) {
    throw new Error('data is null')
  }
  return JSON.parse(data.json_content)
}

export const uploadAnswers = async (formData: FormData) => {
  const supabase = createServerActionClient({ cookies })
  const fields = Object.fromEntries(formData.entries())
  const { hash, owner, ...filteredFields } = Object.fromEntries(Object.entries(fields).filter(([key, value]) => key !== 'formId' && value !== '' && !key.startsWith('$')))
  const result = await supabase.from('answers').insert({ form_id: hash, fields: filteredFields, user_id: owner })
  return result.status
}

export const getAnswersByFormId = async (formId: string): Promise<Answer[]> => {
  const supabase = createServerActionClient({ cookies })
  const { data, error } = await supabase.from('answers').select('*').eq('form_id', formId)
  // console.log(data)
  if (error !== null) {
    throw new Error(error.message)
  }
  if (data === null) {
    throw new Error('data is null')
  }
  return data.map((answer) => { return { id: answer.id, fields: answer.fields, created_at: new Date(answer.created_at) } })
}

export const getAnswerByIdFormId = async (formId: string, id: string): Promise<Answer> => {
  const supabase = createServerActionClient({ cookies })
  const { data, error } = await supabase.from('answers').select('*').eq('form_id', formId).eq('id', id).single()
  if (error !== null) {
    throw new Error(error.message)
  }
  if (data === null) {
    throw new Error('data is null')
  }
  return data
}
