//-----------------------------------------------------
// 5-0
// Route Handlers
// 여러 HTTP Method 처리하는 방법

import { NextRequest } from 'next/server';

// GET 요청
// NextJS 는 NextRequest 타입의 request 객체를 제공함
export async function GET(request: NextRequest) {
  console.log(request);
  return Response.json({
    ok: true,
  });
}

// POST 요청
export async function POST(request: NextRequest) {
  // request 의 body 읽어야 함
  // 그러기 위해서는 request의 body를 돌려주는 json 이라는 함수를 쓰면 됨
  // json은 Promise를 return 함
  // 그러니 json 에 await를 붙여서 data를 받아옴
  const data = await request.json();
  console.log('log the user in!!!');

  return Response.json(data);
}
