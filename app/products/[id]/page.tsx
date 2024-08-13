// // --------------------------------------------------------
// // Products
// // 10-4
// // Detail Skeleton

// // 상세 화면에 탭바가 나오길 원하지 않아 products 폴더 따로 만듦
// async function getProduct() {
//   await new Promise((resolve) => setTimeout(resolve, 10000));
// }

// export default async function ProductDetail({
//   params: { id },
// }: {
//   params: { id: string };
// }) {
//   const product = await getProduct();
//   return <span>Product detail of the product {id}</span>;
// }

// // --------------------------------------------------------
// // Products
// // 10-5
// // Product Detail
// // 제품 가져오기

// import db from '@/lib/db';
// import getSession from '@/lib/session';
// import { formatToWon } from '@/lib/utils';
// import { UserIcon } from '@heroicons/react/24/solid';
// import Image from 'next/image';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';

// // 사용자가 소유자인지 아닌지 확인
// async function getIsOwner(userId: number) {
//   const session = await getSession();
//   if (session.id) {
//     return session.id === userId;
//   }
//   return false;
// }

// // 상세 화면에 탭바가 나오길 원하지 않아 products 폴더 따로 만듦
// async function getProduct(id: number) {
//   // await new Promise((resolve) => setTimeout(resolve, 10000));
//   const product = await db.product.findUnique({
//     where: {
//       id: id,
//     },
//     include: {
//       user: {
//         select: {
//           username: true,
//           avatar: true,
//         },
//       },
//     },
//   });
//   console.log(product);
//   return product;
// }

// export default async function ProductDetail({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const id = Number(params.id);
//   if (isNaN(id)) {
//     return notFound();
//   }
//   const product = await getProduct(id);
//   if (!product) {
//     return notFound();
//   }
//   const isOwner = await getIsOwner(product.userId);
//   return (
//     <div>
//       <div className="relative aspect-square">
//         <Image fill src={product.photo} alt={product.title} />
//       </div>
//       <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
//         <div className="size-10 overflow-hidden rounded-full">
//           {product.user.avatar !== null ? (
//             <Image
//               src={product.user.avatar}
//               width={40}
//               height={40}
//               alt={product.user.username}
//             />
//           ) : (
//             <UserIcon />
//           )}
//         </div>
//         <div>
//           <h3>{product.user.username}</h3>
//         </div>
//       </div>
//       <div className="p-5">
//         <h1 className="text-2xl font-semibold">{product.title}</h1>
//         <p>{product.description}</p>
//       </div>
//       <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
//         <span className="font-semibold text-xl">
//           {formatToWon(product.price)}원
//         </span>
//         {isOwner ? (
//           <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
//             Delete product
//           </button>
//         ) : null}
//         <Link
//           className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
//           href={``}
//         >
//           채팅하기
//         </Link>
//       </div>
//     </div>
//   );
// }

// --------------------------------------------------------
// Products
// 10-7
// Pagination Actions

import db from '@/lib/db';
import getSession from '@/lib/session';
import { formatToWon } from '@/lib/utils';
import { UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 사용자가 소유자인지 아닌지 확인
async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

// 상세 화면에 탭바가 나오길 원하지 않아 products 폴더 따로 만듦
async function getProduct(id: number) {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  const product = await db.product.findUnique({
    where: {
      id: id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  console.log(product);
  return product;
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }
  const isOwner = await getIsOwner(product.userId);
  return (
    <div>
      <div className="relative aspect-square">
        <Image
          fill
          className="object-cover"
          src={product.photo}
          alt={product.title}
        />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 overflow-hidden rounded-full">
          {product.user.avatar !== null ? (
            <Image
              src={product.user.avatar}
              width={40}
              height={40}
              alt={product.user.username}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-xl">
          {formatToWon(product.price)}원
        </span>
        {isOwner ? (
          <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
            Delete product
          </button>
        ) : null}
        <Link
          className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
          href={``}
        >
          채팅하기
        </Link>
      </div>
    </div>
  );
}

// 무한 스크롤 구현

// 첫 번째 단계
// 버튼 만들어서 그 버튼을 클릭하면 더 많은 product를 가져옴
// 그래서 유저가 product page에 도착했을 때, 유저는 첫 번째 product만 보도록 함
// 그 다음 버튼을 클릭해서 두 번째 상품 보여줌.. 세 번째 상품
// page를 변경하지 않음 이 목록에 새로운 product를 추가

// 두 번째 단계
// 유저의 클릭을 절약함
// 유저가 클릭하는 대신, 유저가 아래로 스크롤하는 것을 감지함. 그럼 버튼이 보일 것임
// 그리고 더 많은 product를 얻기 위해 즉시 요청을 실행
// 그래서 먼저 버튼을 갖고 하고, 클릭해서 더 많은 상품을 조회할 수 있도록
// 이렇게 한 다음 스크롤링으로 바꿈
