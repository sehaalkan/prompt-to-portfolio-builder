export const cleanDescription = (description: string): string => {
  let clean = description.trim()

  clean = clean.split('Read through a')[0].split('Read through')[0].trim()
  clean = clean.split(/Captured through a/i)[0].split(/Captured through/i)[0].trim()
  clean = clean.split(/Through a .+ lens\.?/i)[0].trim()

  return clean.replace(/\s{2,}/g, ' ').replace(/\.\.+$/, '.').trim()
}
