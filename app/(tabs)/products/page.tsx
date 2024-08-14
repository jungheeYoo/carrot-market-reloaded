// // --------------------------------------------------------
// // Products
// // 10-1
// // Tab Bar

// export default function products() {
//   return (
//     <div>
//       <h1 className="text-white text-4xl">Products!</h1>
//     </div>
//   );
// }

// // --------------------------------------------------------
// // Products
// // 10-2
// // Skeletons
// // products page 작업

// async function getProducts() {
//   await new Promise((resolve) => setTimeout(resolve, 10000));
// }

// export default async function products() {
//   const products = await getProducts();
//   return (
//     <div>
//       <h1 className="text-white text-4xl">Products!</h1>
//     </div>
//   );
// }

// // --------------------------------------------------------
// // Products
// // 10-3
// // Product Component

// import ListProduct from '@/components/list-product';
// import db from '@/lib/db';

// async function getProducts() {
//   const products = await db.product.findMany({
//     select: {
//       title: true,
//       price: true,
//       created_at: true,
//       photo: true,
//       id: true,
//     },
//   });
//   return products;
// }

// export default async function products() {
//   const products = await getProducts();
//   return (
//     <div className="p-5 flex flex-col gap-5">
//       {products.map((product) => (
//         <ListProduct key={product.id} {...product} />
//       ))}
//     </div>
//   );
// }

// // --------------------------------------------------------
// // Products
// // 10-7
// // Pagination Action

// // product page 기능 변경
// // product의 첫 번째 page만 가져오는 것
// // 처음에 보여줄 상품만 가져온다

// import ProductList from '@/components/product-list';
// import db from '@/lib/db';
// import { Prisma } from '@prisma/client';

// async function getInitialProducts() {
//   const products = await db.product.findMany({
//     select: {
//       title: true,
//       price: true,
//       created_at: true,
//       photo: true,
//       id: true,
//     },
//     take: 1,
//     orderBy: {
//       created_at: 'desc',
//     },
//   });
//   return products;
// }

// export type InitialProducts = Prisma.PromiseReturnType<
//   typeof getInitialProducts
// >;

// export default async function products() {
//   const initialProducts = await getInitialProducts();
//   return (
//     <div>
//       <ProductList initialProducts={initialProducts} />
//     </div>
//   );
// }

// // --------------------------------------------------------
// // Products
// // 11-0
// // Introduction

// // 제품 업로드 할 페이지로 이동하는 버튼 만들기

// import ProductList from '@/components/product-list';
// import db from '@/lib/db';
// import { PlusIcon } from '@heroicons/react/24/solid';
// import { Prisma } from '@prisma/client';
// import Link from 'next/link';

// async function getInitialProducts() {
//   const products = await db.product.findMany({
//     select: {
//       title: true,
//       price: true,
//       created_at: true,
//       photo: true,
//       id: true,
//     },
//     take: 1,
//     orderBy: {
//       created_at: 'desc',
//     },
//   });
//   return products;
// }

// export type InitialProducts = Prisma.PromiseReturnType<
//   typeof getInitialProducts
// >;

// export default async function products() {
//   const initialProducts = await getInitialProducts();
//   return (
//     <div>
//       <ProductList initialProducts={initialProducts} />
//       <Link
//         href="/products/add"
//         className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
//       >
//         <PlusIcon className="size-10" />
//       </Link>
//     </div>
//   );
// }

// // --------------------------------------------------------
// // Caching
// // 13-0
// // Introduction

// import ProductList from '@/components/product-list';
// import db from '@/lib/db';
// import { PlusIcon } from '@heroicons/react/24/solid';
// import { Prisma } from '@prisma/client';
// import Link from 'next/link';

// async function getInitialProducts() {
//   const products = await db.product.findMany({
//     select: {
//       title: true,
//       price: true,
//       created_at: true,
//       photo: true,
//       id: true,
//     },
//     /* take: 1, */
//     orderBy: {
//       created_at: 'desc',
//     },
//   });
//   return products;
// }

// export type InitialProducts = Prisma.PromiseReturnType<
//   typeof getInitialProducts
// >;

// export default async function products() {
//   const initialProducts = await getInitialProducts();
//   return (
//     <div>
//       <ProductList initialProducts={initialProducts} />
//       <Link
//         href="/products/add"
//         className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
//       >
//         <PlusIcon className="size-10" />
//       </Link>
//     </div>
//   );
// }

// // --------------------------------------------------------
// // Caching
// // 13-1
// // nextCache

// // nextCache 함수 사용하기

// import ProductList from '@/components/product-list';
// import db from '@/lib/db';
// import { PlusIcon } from '@heroicons/react/24/solid';
// import { Prisma } from '@prisma/client';
// import { unstable_cache as nextCache } from 'next/cache';
// import Link from 'next/link';

// const getCachedProducts = nextCache(getInitialProducts, ['home-products']);

// async function getInitialProducts() {
//   console.log('hit!!!');

//   const products = await db.product.findMany({
//     select: {
//       title: true,
//       price: true,
//       created_at: true,
//       photo: true,
//       id: true,
//     },
//     /* take: 1, */
//     orderBy: {
//       created_at: 'desc',
//     },
//   });
//   return products;
// }

// export type InitialProducts = Prisma.PromiseReturnType<
//   typeof getInitialProducts
// >;

// export default async function products() {
//   const initialProducts = await getCachedProducts();
//   return (
//     <div>
//       <ProductList initialProducts={initialProducts} />
//       <Link
//         href="/products/add"
//         className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
//       >
//         <PlusIcon className="size-10" />
//       </Link>
//     </div>
//   );
// }

// // --------------------------------------------------------
// // Caching
// // 13-2
// // revalidate (갱신)- 만료 기간에 따라 데이터를 새로고침

// // 데이터를 어떻게 갱신하는지, 데이터를 어떻게 다시 새로고침해주는지
// // cache안에 있는 데이터를 새로고침 하는 방법에는 세 가지 옵션이 있다
// // 1. revalidate (갱신)

// import ProductList from '@/components/product-list';
// import db from '@/lib/db';
// import { PlusIcon } from '@heroicons/react/24/solid';
// import { Prisma } from '@prisma/client';
// import { unstable_cache as nextCache } from 'next/cache';
// import Link from 'next/link';

// const getCachedProducts = nextCache(getInitialProducts, ['home-products'], {
//   revalidate: 60,
//   // 60초마다가 아니고, 60초가 지난 후 새로운 요청이 있다면 그때 NextJS가 이 함수를 다시 호출할 것이라는 것
// });

// async function getInitialProducts() {
//   console.log('hit!!!');

//   const products = await db.product.findMany({
//     select: {
//       title: true,
//       price: true,
//       created_at: true,
//       photo: true,
//       id: true,
//     },
//     /* take: 1, */
//     orderBy: {
//       created_at: 'desc',
//     },
//   });
//   return products;
// }

// export type InitialProducts = Prisma.PromiseReturnType<
//   typeof getInitialProducts
// >;

// export default async function products() {
//   const initialProducts = await getCachedProducts();
//   return (
//     <div>
//       <ProductList initialProducts={initialProducts} />
//       <Link
//         href="/products/add"
//         className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
//       >
//         <PlusIcon className="size-10" />
//       </Link>
//     </div>
//   );
// }

// --------------------------------------------------------
// Caching
// 13-3
// revalidatePath (특정 경로(Path)) - 요청했을 때 데이터를 새로고침하는 방법

// 데이터를 어떻게 갱신하는지, 데이터를 어떻게 다시 새로고침해주는지
// cache안에 있는 데이터를 새로고침 하는 방법에는 세 가지 옵션이 있다
// 2. revalidatePath (특정 경로(Path)) 방법 두 가지
// 첫 번째 방법 URL을 타겟팅한다
// 'NextJS에게 /home 페이지에와 연결되어있는 모든 데이터를 새로고침 해라'

import ProductList from '@/components/product-list';
import db from '@/lib/db';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Prisma } from '@prisma/client';
import { unstable_cache as nextCache, revalidatePath } from 'next/cache';
import Link from 'next/link';

const getCachedProducts = nextCache(getInitialProducts, ['home-products']);

async function getInitialProducts() {
  console.log('hit!!!');

  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    /* take: 1, */
    orderBy: {
      created_at: 'desc',
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export default async function products() {
  const initialProducts = await getCachedProducts();
  const revalidate = async () => {
    'use server';
    revalidatePath('/products');
  };
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <form action={revalidate}>
        <button>Revalidate</button>
      </form>
      <Link
        href="/products/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
