//โค้ตที่เพิ่มเติม
export const config = {
  matcher: [
    '/my-recipe',
    '/create-recipe',
    '/profile',
    '/favorites',
    //'/recipe-detail',
  ],
}


export { default } from 'next-auth/middleware'

/*export const config = {
    matcher: ['/my-recipe']
}
*/
/*import { NextResponse } from 'next/server';

export function middleware(request: any) {
  const isLoggedIn = true;
  if (!isLoggedIn && request.nextUrl.pathname.startsWith('/create-recipe')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

//middleware.ts
//import withAuth from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized({ token }) {
      const roles: string[] = token?.roles ?? []
      const isAdminRecipe = roles.includes('admin-recipe')
      return isAdminRecipe
    },
  },
})*/

/*export const config = {
  matcher: ['/'], // '/my-recipe'
}*/