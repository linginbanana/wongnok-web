// recipe service
import axios from "axios"

type User = {
  id: string
  firstName: string
  lastName: string
}

type Recipe = {
  id: string
  name: string
  imageUrl: string
  description: string
  cookingDuration: {
    id: number
    name: string
  }
  difficulty: {
    id: number
    name: string
  }
  user: User
}

export const fetchRecipes = async () => {
  const recipesFetch = await axios.get<Recipe[]>('http://localhost:5000/recipes')
  return recipesFetch


  
}