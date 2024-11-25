// import { NextResponse } from 'next/server';
// export function middleware(request) {
//   return NextResponse.redirect(new URL('/about', request.url));
// }

// import { NextResponse } from 'next/server';
// import { auth } from './app/_lib/auth';
// export default auth((req) => {
//   return NextResponse.redirect(new URL('/about', req.url));
// });

// import { auth } from './app/_lib/auth';
// export const middleware = auth;

export { auth as middleware } from './app/_lib/auth';

export const config = {
  matcher: ['/account'],
};
