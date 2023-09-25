export function generateUniqueHash (jsonFileContent: string): string {
  let hash = 0
  if (jsonFileContent.length === 0) {
    return hash.toString()
  }
  const lines = jsonFileContent.split('\n')
  // for (let i = 0; i < jsonFileContent.length; i++) {
  //   const char = jsonFileContent.charCodeAt(i)
  //   hash = ((hash << 5) - hash) + char
  //   hash = hash & hash
  // }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    for (let j = 0; j < line.length; j++) {
      const char = line.charCodeAt(j)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
  }
  return hash.toString()
}

function validateItem (item: FormItem): boolean {
  if (item.type === undefined || item.label === undefined) {
    return false
  }
  if (item.name === undefined) {
    if (item.type !== 'submit') {
      return false
    }
  }
  const haveValidOptions = item.options === undefined || Array.isArray(item.options)
  if (item.type === 'radio' || item.type === 'select') {
    return haveValidOptions
  }
  if (item.type === 'checkbox') {
    return haveValidOptions || item.label !== undefined
  }
  return true
}

// -621645908 -> example.json
export function validateJsonContentForm (jsonContent: string): boolean {
  /*
    1. It has to be a valid JSON
    2. It has to have a items array
    3. Each item has to have a type, name and label (required is optional)
    4. Each item has to have a unique name
    5. Each item has to have a unique label
    6. If the item is a checkbox, it could have a options array or just a label
    7. If the item is a radio, it has to have a options array
    8. If the item is a select, it has to have a options array
  */
  // console.log(jsonContent)
  // It has to be a valid JSON
  try {
    JSON.parse(jsonContent)
  } catch (error) {
    console.error(error)
    return false
  }
  // It has to have a items array
  const json = JSON.parse(jsonContent) as Form
  console.log(json)
  if (json.items === undefined || !Array.isArray(json.items)) {
    return false
  }
  const names = [] as string[]
  const labels = [] as string[]
  const validation = json.items.every((item) => {
    // Each item has to have a type, name and label (required is optional)
    if (!validateItem(item)) {
      console.log(item)
      return false
    }
    // Each item has to have a unique name
    if (names.includes(item.name)) {
      return false
    }
    // Each item has to have a unique label
    if (labels.includes(item.label)) {
      return false
    }
    names.push(item.name)
    labels.push(item.label)
    return true
  })
  console.log(names, labels)
  return validation
}
