// recipe service
import { api } from "@/lib/axios"
//import axios from "axios"

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
 
    const recipesFetch = await api.get<{results: Recipe[]}>(
      '/api/v1/food-recipes?page=1&limit=10'
    )

    console.log('res => ',recipesFetch)
  return recipesFetch.data.results
}