import { Recipe, fetchRecipes } from '@services/recipes.service'
import { useState, useEffect } from 'react'

export const useFetch = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    ;(async () => {
      const recipesFetch = await fetchRecipes()
      setRecipes(recipesFetch.data)
    })()
  }, [])

  return recipes
}