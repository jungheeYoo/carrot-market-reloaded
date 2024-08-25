// export default function Profile() {
//   return <h1>welcome to your profile</h1>;
// }

// //-----------------------------------------------------
// // 8-7
// // Log Out
// // 이메일과 비밀번호로 로그인 하기

// import db from '@/lib/db';
// import getSession from '@/lib/session';
// import { notFound, redirect } from 'next/navigation';

// async function getUser() {
//   const session = await getSession();
//   if (session.id) {
//     const user = await db.user.findUnique({
//       where: {
//         id: session.id,
//       },
//     });
//     if (user) {
//       return user;
//     }
//   }
//   notFound();
// }

// export default async function Profile() {
//   const user = await getUser();
//   const logOut = async () => {
//     'use server';
//     const session = await getSession();
//     await session.destroy();
//     redirect('/');
//   };
//   return (
//     <div>
//       <h1>Welcome! {user?.username}!</h1>
//       <form action={logOut}>
//         <button>Log out</button>
//       </form>
//     </div>
//   );
// }

// --------------------------------------------------------
// Caching
// 13-9
// Recap part Two

import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

async function Username() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  const user = await getUser();
  return <h1>Welcome! {user?.username}!</h1>;
}

export default async function Profile() {
  const logOut = async () => {
    'use server';
    const session = await getSession();
    await session.destroy();
    redirect('/');
  };
  return (
    <div>
      <Suspense fallback={'Welcome!'}>
        <Username />
      </Suspense>
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  );
}
