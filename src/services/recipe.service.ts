

import {  RecipeForm, UserForm } from '@/app/create-recipe/page'
import { RecipeFormUpdate } from '@/app/edit-recipe/[recipeId]/page'
import { api } from '@/lib/axios'
import { getSession } from 'next-auth/react'

export type User = {
  id: string
  firstName: string
  lastName: string
  imageUrl: string
  nickName: string
}

type CookingDuration = {
  id: number
  name: string
}

type Difficulty = {
  id: number
  name: string
}

export type Recipe = {
  id: string
  name: string
  imageUrl: string
  description: string
  rating: Rating
  favorite: Favorite
  cookingDuration: CookingDuration
  difficulty: Difficulty
  user: User
}

export type Rating = {
  foodRecipeID: number
  id: number
  score: number
  UserID: string
}

export type Favorite = {
  foodRecipeID: number
  id: number
  UserID: string
}

type RecipeDetails = {
  id: number
  name: string
  description: string
  ingredient: string
  instruction: string
  imageUrl: string
  cookingDuration: CookingDuration
  difficulty: Difficulty
  rating: Rating
  favorite: Favorite
  createdAt: string
  updatedAt: string
  averageRating: number
  user: User
}

type fetchRecipeRequest = {
  page: number
  limit: number
  search: string
}

export const fetchRecipes = async (data: fetchRecipeRequest) => {
  const recipesFetch = await api.get<{ results: Recipe[]; total: number }>(
    `/api/v1/food-recipes?page=${data.page}&limit=${data.limit}&search=${data.search}`
  )
  return recipesFetch.data
}

export const fetchRecipeDetails = async (id: number) => {
  const recipeDetails = await api.get<RecipeDetails>(
    `/api/v1/food-recipes/${id}`
  )
  return recipeDetails
}
export const deleteMyRecipe = async (id: number) => {
  const recipeDetails = await api.delete<RecipeDetails>(
    `/api/v1/food-recipes/${id}`
  )
  return recipeDetails
}
export const updateMyRecipe = async (data: RecipeFormUpdate) => {
  const recipeDetails = await api.put<RecipeFormUpdate>(
    `/api/v1/food-recipes/${data.id}`,
    {
      name: data.name,
      description: data.description,
      ingredient: data.ingredient,
      instruction: data.instruction,
      imageURL: data.imageURL ?? '',
      difficultyID: Number(data.difficulty),
      cookingDurationID: Number(data.duration),
    }
  )
  return recipeDetails
}

export const createRecipe = async (data: RecipeForm) => {
  const recipeDetails = await api.post<RecipeForm>('/api/v1/food-recipes', {
    name: data.name,
    description: data.description,
    ingredient: data.ingredient,
    instruction: data.instruction,
    imageURL: data.imageURL ?? '',
    difficultyID: Number(data.difficulty),
    cookingDurationID: Number(data.duration),
  })
  return recipeDetails
}

export const fetchRecipesByUser = async (
  userId?: string,
  token: string = ''
) => {
  console.log('user', userId)
  const recipes = await api.get<{ results: Recipe[] }>(
    `/api/v1/users/${userId}/food-recipes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return recipes.data.results
}

export const createRating = async (data: Rating) => {
  const recipeRating = await api.post<Rating>(
    `/api/v1/food-recipes/${data.foodRecipeID}/ratings`,
    {
      score: data.score,
    }
  )
  return recipeRating
}

export const getFavorite = async (data: fetchRecipeRequest) => {
  const recipeFavorite = await api.get<{ results: Recipe[]; total: number }>(
    `/api/v1/food-recipes/favorites?page=${data.page}&limit=${data.limit}&search=${data.search}`
  )
  return recipeFavorite
}
export const getUser = async () => {
  const User = await api.get<User>(`/api/v1/users/`)
  return User.data
}
export const UpdateUser = async (data: UserForm) => {
  const User = await api.put<User>(`/api/v1/users/`, {
    nickName: data.nickName,
    imageUrl: data.imageUrl,
  })
  return User.data
}
export const CreateFavorite = async (foodRecipeID: number) => {
  const favorite = await api.post(`/api/v1/food-recipes/${foodRecipeID}/favorites`)
  return favorite
}
export const DeleteFavorite = async (foodRecipeID: number) => {
  const favorite = await api.delete(`/api/v1/food-recipes/${foodRecipeID}/favorites`)
  return favorite
}
//favorite menu get all
export const fetchFavoriteMenu = async () => {
  const session = await getSession()
  console.log('session servcie', session)
  const favoriteMenu = await api.get<Favorite[]>(`/api/v1/food-recipes/favorite`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
  return favoriteMenu.data
} 

/*
// All imports should be at the top.
import { RecipeForm } from '@/app/create-recipe/page'
import { auth } from '@/lib/auth'
import { api } from '@/lib/axios'
import axios from 'axios'
import type { Session } from 'next-auth'

// All type definitions in one place.
type User = {
  id: string
  firstName: string
  lastName: string
}

interface UpdateProfilePayload {
  nickname: string
  profileURL?: string
}

type CookingDuration = {
  id: number
  name: string
}

type Difficulty = {
  id: number
  name: string
}

export type Recipe = {
  id: string
  name: string
  imageUrl: string
  description: string
  cookingDuration: CookingDuration
  difficulty: Difficulty
  user: User
  isFavorite: boolean
}

export type RecipePayload = {
  name: string
  description: string
  ingredient: string
  instruction: string
  imageURL: string
  cookingDurationID: number
  difficultyID: number
}

export type RecipeDetails = {
  id: number
  name: string
  description: string
  ingredient: string
  instruction: string
  imageUrl: string
  cookingDuration: CookingDuration
  difficulty: Difficulty
  createdAt: string
  updatedAt: string
  averageRating: number
  user: User
  isFavorite: boolean
}

type fetchRecipeRequest = {
  page: number
  limit: number
  search: string
  userId?: string
}

export type CardRecipeProps = {
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
  isFavorite: boolean
}

export type FavoriteRecipesResponse = {
  results: CardRecipeProps[]
  total: number
}

// All API functions in one place.
export const fetchRecipes = async (data: fetchRecipeRequest) => {
  // สร้าง URLSearchParams เพื่อจัดการ query parameters
  const params = new URLSearchParams()
  params.append('page', String(data.page))
  params.append('limit', String(data.limit))

  // เพิ่มเงื่อนไขเพื่อ append search และ userId เมื่อมีค่า
  if (data.search) {
    params.append('search', data.search)
  }
  if (data.userId) {
    params.append('userId', data.userId)
  }

  const recipesFetch = await api.get<{
    results: Recipe[]
    total: number
  }>(`/api/v1/food-recipes?${params.toString()}`) // <--- ใช้ params.toString() ในการสร้าง URL

  return recipesFetch.data
}

export const fetchFavoriteRecipes = async () => {
  const session = await auth()

  if (!session?.user?.id || !session?.accessToken) {
    throw new Error('User not authenticated or session data is missing.')
  }

  const recipes = await axios.get<{ results: Recipe[] }>(
    `http://localhost:8000/api/v1/users/${session.user.id}/favorites`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  )
  // Map over the results to explicitly set isFavorite to true
  return recipes.data.results.map((recipe) => ({
    ...recipe,
    isFavorite: true,
  }))
}

export const fetchRecipeDetails = async (recipeId: string) => {
  const recipeDetails = await api.get<RecipeDetails>(
    `/api/v1/food-recipes/${recipeId}`
  )
  return recipeDetails
}

export const createRecipe = async (data: RecipePayload) => {
  const recipeDetails = await api.post<RecipeForm>('/api/v1/food-recipes', {
    ...data,
  })
  return recipeDetails
}

export const fetchRecipesByUser = async () => {
  const session = await auth()

  if (!session?.user?.id || !session?.accessToken) {
    throw new Error('User not authenticated or session data is missing.')
  }

  const recipes = await axios.get<{ results: Recipe[] }>(
    `http://localhost:8000/api/v1/users/${session.user.id}/food-recipes`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  )
  return recipes.data.results
}

export const fetchUserProfile = async (userId: string, accessToken: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/users/${userId}/profile`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    throw new Error('Failed to fetch user profile.')
  }
}

export const updateUserProfile = async (
  userId: string,
  payload: UpdateProfilePayload,
  accessToken: string
) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/api/v1/updateprofile/${userId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Failed to update profile:', error)
    throw new Error('Failed to update profile.')
  }
}

export const favoriteRecipe = async (id: string) => {
  const response = await api.post(`/api/v1/food-recipes/${id}/favorites`)
  return response.data
}

export const unfavoriteRecipe = async (id: string) => {
  const response = await api.delete(`/api/v1/food-recipes/${id}/favorites`)
  return response.data
}
*/