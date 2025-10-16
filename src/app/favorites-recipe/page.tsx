
/*
'use client'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Recipe } from '@/services/recipe.service'
import CardRecipe from '@/components/CardRecipe'
import { Button } from '@/components/ui/button'
import { getFavorite } from '@/services/recipe.service'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useDebouncedCallback } from 'use-debounce'
import SkeletonCardLoading from '@/components/SkeletonCardLoading'

type User = {
  id: string
  firstName: string
  lastName: string
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
}

const FavoriteRecipe = () => {
  // query path

  const [recipesData, setRecipesData] = useState<{
    results: Recipe[]
    total: number
  }>({
    results: [],
    total: 0,
  })
  const {
    mutateAsync: getRecipe,
    isPending: isRecipeLoading,
    isError: isRecipeError,
  } = useMutation({
    mutationFn: getFavorite,
    onError: () => {
      console.log('error fetching')
    },
    onSuccess: (data) => {
      if (
        Number(searchParams.get('page')) >
        Math.ceil(data.data.total / Number(searchParams.get('limit')))
      ) {
        params.set('search', searchParams.get('search') ?? '')
        params.set('page', '1')
        router.replace(`${pathname}?${params.toString()}`)
        setCurrentPage(1)
      }
      setRecipesData(data.data)
    },
  })
  const limitDataPerPage = 5
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  params.set('limit', String(limitDataPerPage))

  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page') ?? 1)
  )
  const [searchInput, setSearchInput] = useState<string>(
    searchParams.get('search') ?? ''
  )
  console.log(recipesData)
  useEffect(() => {
    params.set('page', String(currentPage))
    router.replace(`${pathname}?${params.toString()}`)
    getRecipe({
      page: Number(currentPage),
      limit: limitDataPerPage,
      search: searchInput,
    })
  }, [currentPage])

  const handleSearch = useDebouncedCallback((data) => {
    params.set('page', '1')
    if (searchInput === '') {
      params.delete('search')
    } else {
      params.set('search', searchInput)
    }
    router.replace(`${pathname}?${params.toString()}`)
    getRecipe({
      page: Number(currentPage),
      limit: limitDataPerPage,
      search: data,
    })
  }, 1000)

  if (isRecipeError)
    return (
      <>
        <div>
          <div className='w-full flex justify-center items-center my-8'>
            <div className='flex w-[584px] h-[40px] relative'>
              <div className='absolute mx-4 h-full flex justify-center items-center'>
                <Image
                  color='#E030F6'
                  src='/icons/search.svg'
                  alt='icon search'
                  width={18}
                  height={18}
                />
              </div>

              <Input
                className='rounded-3xl text-center'
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value)
                  handleSearch(e.target.value)
                }}
              />
            </div>
          </div>

          <h1 className='pt-6 pb-8 text-4xl font-bold '>สูตรอาหารทั้งหมด</h1>
          <div className='py-2 px-3 bg-pinklittle rounded-lg flex items-center'>
            <div className='mx-2'>
              <Image
                src='/icons/errorclound.svg'
                alt='error cluound'
                width={25}
                height={25}
              />
            </div>

            <div>
              ไม่สามารถดึงข้อมูลสูตรอาหารได้ กรุณา “รีเฟรช”
              หน้าจอเพื่อลองใหม่อีกครั้ง
            </div>
          </div>
        </div>
      </>
    )
  if (isRecipeLoading )
    return (
      <div>
        <div className='w-full flex justify-center items-center my-8'>
          <div className='flex w-[584px] h-[40px] relative'>
            <div className='absolute mx-4 h-full flex justify-center items-center'>
              <Image
                color='#E030F6'
                src='/icons/search.png'
                alt='icon search'
                width={20}
                height={20}
              />
            </div>

            <Input
              className='rounded-3xl text-center'
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value)
                handleSearch(e.target.value)
              }}
            />
          </div>
        </div>
        <div className='flex justify-between items-center py-8 '>
          <h1 className='font-bold text-4xl'>สูตรอาหารสุดโปรด</h1>
        </div>

        <div>
          <div className='flex flex-wrap gap-8 '>
            {[1, 2, 3, 4].map((i) => {
              return <SkeletonCardLoading key={i} />
            })}
          </div>
        </div>
      </div>
    )

  return (
    <div>
      <div className='w-full flex justify-center items-center my-8'>
        <div className='flex w-[584px] h-[40px] relative'>
          <div className='absolute mx-4 h-full flex justify-center items-center'>
            <Image
              color='#E030F6'
              src='/icons/search.svg'
              alt='icon search'
              width={18}
              height={18}
            />
          </div>
          <Input
            className='rounded-3xl text-center'
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value)
              handleSearch(e.target.value)
            }}
          />
        </div>
      </div>
      <div className='flex justify-between items-center py-8 '>
        <h1 className='font-bold text-4xl'>สูตรอาหารสุดโปรด</h1>
      </div>
      {!isRecipeLoading && !isRecipeError && recipesData.results.length > 0 ? (
        <div className='flex flex-wrap gap-8'>
          {recipesData.results.map((recipe) => {
            return (
              <Link key={recipe.id} href={`recipe-details/${recipe.id}`}>
                <CardRecipe key={recipe.id} {...recipe} />
              </Link>
            )
          })}
        </div>
      ) : (
        <div className='flex flex-col'>
          <div className='flex-1 flex justify-center items-center'>
            <div className='flex-1 flex flex-col justify-center items-center '>
              <Image
                src='/Food_butcher.png'
                alt='food butcher'
                width={290}
                height={282}
              />
              <div className='text-lg my-6'>ยังไม่มีรายการสูตรอาหารสุดโปรด</div>
              <Link href={'/'}>
                <Button className='bg-primary-500 cursor-pointer'>
                  กลับหน้าสูตรอาหาร
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className='cursor-pointer'
              onClick={() => {
                setCurrentPage((prev) => {
                  return prev <= 1 ? prev : prev - 1
                })
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{currentPage}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext className='cursor-pointer'
              onClick={() => {
                setCurrentPage((prev) => {
                  return prev >= Math.ceil(recipesData.total / limitDataPerPage)
                    ? prev
                    : prev + 1
                })
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default FavoriteRecipe
*/
'use client'

import CardRecipe from "@/components/CardRecipe"
//import SkeletonCardLoading from '@/components/SkeletonCardLoading'
import { Button } from "@/components/ui/button"
import {fetchRecipeFavorite} from "@/lib/favorite"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import Image from 'next/image'
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Recipe } from "@/services/recipe.service"


type User = {
  id: string
  firstName: string
  lastName: string
}

type favorite = {
  foodRecipeID: number
  id: number
  UserID: string
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
  favorite : favorite
}

const FavoritesRecipe =  () => {

    const [recipesData, setRecipesData] = useState<{
    results: Recipe[]
    total: number
    }>({
        results: [],
        total: 0,
    })

    const {
        mutateAsync: getRecipe,
        isPending: isRecipeLoading,
        isError: isRecipeError,
    } = useMutation({
        mutationFn: fetchRecipeFavorite,
        onError: () => {
            console.log('error fetching')
        },
        onSuccess: (data) => {
            setRecipesData(data)
        },
    })

    const limitDataPerPage = 5
    const pathname = usePathname()

    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    params.set('limit', String(limitDataPerPage))
    
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState<number>(
        Number(searchParams.get('page') ?? 1)
    )
    const [searchInput, setSearchInput] = useState<string>(
    searchParams.get('search') ?? ''
  )

    useEffect(() => {
        params.set('page', String(currentPage))
        router.replace(`${pathname}?${params.toString()}`)
        getRecipe({
          page: Number(currentPage),
          limit: limitDataPerPage,
          search: searchInput,
        })
      }, [currentPage])

    const handleSearch = useDebouncedCallback((data) => {
        params.set('page', '1')
        if (searchInput === '') {
          params.delete('search')
        } else {
          params.set('search', searchInput)
        }
        router.replace(`${pathname}?${params.toString()}`)
        getRecipe({
          page: Number(currentPage),
          limit: limitDataPerPage,
          search: data,
        })
      }, 1000)

    if (isRecipeError) return <h1>Error</h1>

    return (
        <div>
        <div className='flex justify-between items-center py-8'>
            <h1 className='font-bold xl:text-4xl lg:text-3xl sm:text-sm'>สูตรอาหารสุดโปรด</h1>
            <Link href={'/create-recipe'}>
            <Button className='bg-primary-500'>​+ สร้างสูตรอาหาร</Button>
            </Link>
        </div>
        {recipesData && recipesData.results.length > 0 ? (
            <div className='flex flex-wrap gap-8'>
            {recipesData.results.map((recipe, i) => (
                <CardRecipe {...recipe} key={i} />
            ))}
            </div>
        ) : (
            <div className="flex items-center flex-col">
                <Image
                    src='/Food_butcher.png'
                    alt='Food_butcher'
                    width={323}
                    height={323}
                />
                <div className="text-2xl">ยังไม่มีรายการสูตรอาหารสุดโปรด</div>
                <Link href={'/'}>
                    <Button className='bg-primary-500'>กลับหน้าสูตรอาหารทั้งหมด</Button>
                </Link>
                  
            </div>
            
        )}
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                    onClick={() => {
                        setCurrentPage((prev) => {
                        return prev <= 1 ? prev : prev - 1
                        })
                    }}
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink>{currentPage}</PaginationLink>
                </PaginationItem>
                {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}
                <PaginationItem>
                    <PaginationNext
                    onClick={() => {
                        setCurrentPage((prev) => {
                        return prev >= Math.ceil(recipesData.total / limitDataPerPage)
                            ? prev
                            : prev + 1
                        })
                    }}
                    />
                </PaginationItem>
            </PaginationContent>
      </Pagination>
        </div>
    )
}

export default FavoritesRecipe