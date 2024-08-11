// //-----------------------------------------------------
// // 8-9
// // Middleware

// import { NextRequest, NextResponse } from 'next/server';
// import getSession from './lib/session';

// export async function middleware(request: NextRequest) {
//   const session = await getSession();
//   console.log(session);
//   if (request.nextUrl.pathname === "/profile") {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
// }
//-----------------------------------------------------
// 8-10
// Matcher
// 미들웨어가 특정 페이지에서만 실행되도록 하는 방법
// cookie 들을 설정하는 방법

import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';

export async function middleware(request: NextRequest) {
  console.log('hello');
  // 옵션 1 - if 그리고 URL을 확인
  // const pathname = request.nextUrl.pathname;
  // if (pathname === '/') {
  //   const response = NextResponse.next();
  //   response.cookies.set('middleware-cookie', 'hello');
  //   return response;
  // }
  // if (pathname === '/profile') {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }
}

// 옵션 2 - matcher 사용
export const config = {
  // matcher: ['/', '/profile', '/create-account', '/user/:path*'],
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

// cookie를 설정하려면, 먼저 우리가 user에게 실제로 제공할 response를 가져와야 함
// 왜냐하면 우리는 user에게 제공할 Response를 가져와서, 우리가 원하는 cookie를 그 Response에 넣기를 원하기 때문

// matcher: ['/', '/profile', '/create-account'],
// Middleware가 실행되어야 하는 페이지를 지정할 수 있다
