
/*
import { CardRecipeProps } from "@/app/page";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from 'next/image';
import { Button } from "@/components/ui/button";

const CardRecipe = ({
  name,
  imageUrl,
  description,
  difficulty,
  cookingDuration,
  user,
  isAdmin,
  isMyEmail
}: CardRecipeProps) => (
  <Card className='w-[276px] h-[390px]'>
    <div>
      <div className='h-[158px] relative rounded-t-lg pb-4'>
        <Image
          src={imageUrl}
          alt={`${name} image`}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <CardContent>
        <h1 className='font-bold'>{name}</h1>
        <p className='text-secondary line-clamp-3'>{description}</p>
      </CardContent>
    </div>

    <CardFooter className="flex flex-col items-start gap-2">
      <div className='flex w-full items-center justify-between'>
        <div className='flex items-center gap-1'>
           <Image src='/icons/av_timer.svg' alt='av timer' width={24} height={24} />
          <p>{difficulty.name}</p>
        </div>
        <div className='flex items-center gap-1'>
          <Image src='/icons/level.svg' alt='level' width={24} height={24} />
          <p>{cookingDuration.name}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Avatar>
          https://github.com/shadcn.png
          <AvatarFallback>{user.firstName}</AvatarFallback>
        </Avatar>
      </div>
    </CardFooter>

    {isAdmin && <Button className="bg-red-700 text-white">Delete</Button>}
    {isMyEmail && <Button className="bg-green-700 text-white">Edit</Button>}
  </Card>
);

export default CardRecipe;
*/

'use client'
import { CardRecipeProps } from "@/app/page";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from 'next/image'
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Heart, HeartCrack} from "lucide-react";
import { toggleFavoriteMenu } from "@/lib/favorite";


const CardRecipe = ({
  id,  name,  imageUrl,  description,  difficulty,  cookingDuration,  user,  isActive,
}: CardRecipeProps) => {
  const { data: session } = useSession()
  async function favorite (id: string,isActive:boolean = true) {
    console.log(id,isActive)
    const result = await toggleFavoriteMenu(id,isActive)
    console.log(result)
    if (result) {
       window.location.reload()
    }
  }
  return (
    <Card className='w-[276px] h-[390px] relative'>
      <Link key={id} href={`recipe-details/${id}`}>
      <div>
        <div className='h-[158px] relative rounded-t-lg pb-4'>
          <Image src={imageUrl} alt={`${name} image`} fill objectFit='cover' />
        </div>
        <div>
          <CardContent>
            <h1 className='font-bold'>{name}</h1>
            <p className='text-secondary line-clamp-3'>{description}</p>
          </CardContent>
        </div>
      </div></Link>
      <div>
        <CardFooter className="flex justify-between items-center">
          <div className='flex w-full items-center'>
            <div className='flex p-1 grow items-center gap-1'>
              <img src='/icons/av_timer.svg' alt='av timer' />
              <p>{difficulty.name}</p>
            </div>
            <div className='flex p-1 grow items-center gap-1'>
              <img src='/icons/level.svg' alt='level' />
              <p>{cookingDuration.name}</p>
            </div >
          </div>
          
          <div className="items-left mr-50">  
              <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>{user.firstName}</AvatarFallback>
            </Avatar>
          </div>
          
          {session && (
        <div className="absolute bottom-2 right-2">
          
            <Button size="icon" variant="outline" 
            onClick={() => favorite(id,!isActive)}
            className="text-primary-500 text-sm">
            {isActive ? <Heart className="text-red-500"/> : <HeartCrack className="text-gray-500"/>}
            </Button>
          
        </div>
        
   
      )}
        </CardFooter>
      </div>
      
    </Card>
  )
}
export default CardRecipe