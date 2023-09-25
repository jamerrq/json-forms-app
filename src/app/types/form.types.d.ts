interface FormItem {
  type: string
  name: string
  label: string
  required: boolean
  options?: Array<Record<string, string>>
}

interface Form {
  items: FormItem[]
}

type Answer = Record<string, string>

