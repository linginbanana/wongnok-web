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
          /icons/av_timer.svg
          <p>{difficulty.name}</p>
        </div>
        <div className='flex items-center gap-1'>
          /icons/level.svg
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
