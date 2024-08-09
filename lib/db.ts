// //-----------------------------------------------------
// // 7-2
// // Prisma Client
// // Client 사용 방법

// import { PrismaClient } from '@prisma/client';

// const db = new PrismaClient();

// async function test() {
//   const user = await db.user.create({
//     data: {
//       username: 'test',
//     },
//   });
//   console.log(user);
// }
// test();

// // async function test() {
// //   const users = await db.user.findMany({
// //     where: {
// //       username: {
// //         contains: 'est',
// //       },
// //     },
// //   });
// //   console.log(users);
// // }

// // test();

// export default db;

// // Typescript를 사용해서 만들었고, 그건 SQL로서 DB로 전달 되었음
// // DB는 SQL 객체로 응답했다
// // 그러면 Prisma는 그걸 Typescript 객체로 변경한다

//-----------------------------------------------------
// 7-4
// Relationships
// SMSToken 모델 만들기
// 이 모델은 User 모델과 연결 됨. 그리고 SMS 인증을 위해서 사용할 것임

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function test() {
  const token = await db.sMSToken.findUnique({
    where: {
      id: 2,
    },
    include: {
      user: true,
    },
  });
  console.log(token);
}
test();

export default db;
