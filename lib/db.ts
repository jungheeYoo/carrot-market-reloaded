//-----------------------------------------------------
// 7-2
// Prisma Client
// Client 사용 방법

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

// async function test() {
//   const users = await db.user.findMany({
//     where: {
//       username: {
//         contains: 'est',
//       },
//     },
//   });
//   console.log(users);
// }

// test();

export default db;

// Typescript를 사용해서 만들었고, 그건 SQL로서 DB로 전달 되었음
// DB는 SQL 객체로 응답했다
// 그러면 Prisma는 그걸 Typescript 객체로 변경한다
