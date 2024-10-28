export function useFavorite () {
  const favoriteTools = useState('favoriteTools', (): string[] => [])

  const calcFavorite = (id: string) => {
    return favoriteTools.value.includes(id)
  }

  const toggleFavorite = (id: string) => {
    const isFavorite = calcFavorite(id)
    if (isFavorite) {
      const findIndex = favoriteTools.value.findIndex(item => item === id)
      favoriteTools.value.splice(findIndex, 1)
    } else {
      favoriteTools.value.push(id)
    }

    localStorage.setItem('favoriteTools', favoriteTools.value.toString())
  }

  return { favoriteTools, calcFavorite, toggleFavorite }
}
