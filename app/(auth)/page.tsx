// // 4-0
// // Home Screen
// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-between min-h-screen p-6">
//       <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
//         <span className="text-9xl">🥕</span>
//         <h1 className="text-4xl">당근</h1>
//         <h2 className="text-2xl">당근 마켓에 어서오세요!</h2>
//       </div>
//       <div className="flex flex-col items-center gap-3 w-full">
//         <Link href="/create-account" className="primary-btn text-lg py-2.5 ">
//           시작하기
//         </Link>
//         <div className="flex gap-2">
//           <span>이미 계정이 있나요?</span>
//           <Link href="/login" className="hover:underline">
//             로그인
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// //-----------------------------------------------------
// // 7-2
// // Prisma Client
// // Client 사용 방법

// import Link from 'next/link';
// // DB 파일을 이런식으로 불러오면 새로고침할 때, 최소 한 번 실행되도록 할 수 있다
// // import '@/lib/db';

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-between min-h-screen p-6">
//       <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
//         <span className="text-9xl">🥕</span>
//         <h1 className="text-4xl">당근</h1>
//         <h2 className="text-2xl">당근 마켓에 어서오세요!</h2>
//       </div>
//       <div className="flex flex-col items-center gap-3 w-full">
//         <Link href="/create-account" className="primary-btn text-lg py-2.5 ">
//           시작하기
//         </Link>
//         <div className="flex gap-2">
//           <span>이미 계정이 있나요?</span>
//           <Link href="/login" className="hover:underline">
//             로그인
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

//-----------------------------------------------------
// 7-4
// Relationships
// SMSToken 모델 만들기
// 이 모델은 User 모델과 연결 됨. 그리고 SMS 인증을 위해서 사용할 것임

import Link from 'next/link';
import '@/lib/db';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <span className="text-9xl">🥕</span>
        <h1 className="text-4xl">당근</h1>
        <h2 className="text-2xl">당근 마켓에 어서오세요!</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link href="/create-account" className="primary-btn text-lg py-2.5 ">
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link href="/login" className="hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
