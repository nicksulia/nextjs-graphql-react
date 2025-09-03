export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return 'Invalid Date'
    }
    return date.toLocaleDateString()
  } catch {
    return 'Invalid Date'
  }
}

export function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return 'Invalid Date'
    }
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`
  } catch {
    return 'Invalid Date'
  }
}
