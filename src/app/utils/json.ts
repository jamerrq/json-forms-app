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

// -621645908 -> example.json
