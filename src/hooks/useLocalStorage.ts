export const useLocalStorage = (key: string) => {
  if(key === "") throw new Error("Key cannot be empty")

  const getItem = () => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }

  const setItem = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  if(!getItem()) setItem("")

  return [getItem(), setItem]
}