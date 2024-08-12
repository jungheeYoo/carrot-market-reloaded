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

// //-----------------------------------------------------
// // 8-10
// // Matcher
// // 미들웨어가 특정 페이지에서만 실행되도록 하는 방법
// // cookie 들을 설정하는 방법

// import { NextRequest, NextResponse } from 'next/server';
// import getSession from './lib/session';

// export async function middleware(request: NextRequest) {
//   console.log('hello');
//   // 옵션 1 - if 그리고 URL을 확인
//   // const pathname = request.nextUrl.pathname;
//   // if (pathname === '/') {
//   //   const response = NextResponse.next();
//   //   response.cookies.set('middleware-cookie', 'hello');
//   //   return response;
//   // }
//   // if (pathname === '/profile') {
//   //   return NextResponse.redirect(new URL('/', request.url));
//   // }
// }

// // 옵션 2 - matcher 사용
// export const config = {
//   // matcher: ['/', '/profile', '/create-account', '/user/:path*'],
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

// // cookie를 설정하려면, 먼저 우리가 user에게 실제로 제공할 response를 가져와야 함
// // 왜냐하면 우리는 user에게 제공할 Response를 가져와서, 우리가 원하는 cookie를 그 Response에 넣기를 원하기 때문

// // matcher: ['/', '/profile', '/create-account'],
// // Middleware가 실행되어야 하는 페이지를 지정할 수 있다

//-----------------------------------------------------
// 8-12
// Authentication Middleware
// 인증된 사용자만 접근할 수 있도록 하는 미들웨어 만들기

/* import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';

interface Routes {
  [key: string]: boolean;
}

// 인증되지 않은 유저가 갈 수 있는 URL을 저장
const publicOnlyUrls: Routes = {
  '/': true,
  '/login': true,
  '/sms': true,
  '/create-account': true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL('/', request.url));
    } else {
      if (exists) {
        return NextResponse.redirect(new URL('/products', request.url));
      }
    }
  }
}

export const config = {
  // matcher: ['/', '/profile', '/create-account', '/user/:path*'],
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; */

import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  '/': true,
  '/login': true,
  '/sms': true,
  '/create-account': true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL('/products', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

// 세션 가져오고 사용자가 쿠키에 ID를 갖고 있는지 확인
// 세션 아이디가 없다면 유저는 로그아웃 상태
// 그렇다면 다음 단계는 유저가 어디로 가려고 하는지 알아내는 것
// 퍼블릭으로 접근 가능한 url을 담은 오브젝트 만들기
// 유저가 로그인 상태가 아니라면 publicOnlyUrls 이동하지 못함
// 유저가 이동하려는 URL이나 pathname은 publicOnlyUrls의 오브젝트에 없음
// 즉, 여기에 없는 페이지로 이동하려고 한다는 뜻, 유저는 로그아웃 상태라는 것을 의미
// 유저를 redirect 해야함
