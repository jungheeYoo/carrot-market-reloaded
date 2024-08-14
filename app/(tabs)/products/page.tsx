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

// --------------------------------------------------------
// Products
// 11-0
// Introduction

// 제품 업로드 할 페이지로 이동하는 버튼 만들기

import ProductList from '@/components/product-list';
import db from '@/lib/db';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Prisma } from '@prisma/client';
import Link from 'next/link';

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 1,
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
  const initialProducts = await getInitialProducts();
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/products/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
