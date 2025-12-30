const KEY = 'pdf-highlights'

export const saveHighlights = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export const loadHighlights = () => {
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : []
}
