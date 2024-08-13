// --------------------------------------------------------
// Products
// 10-7
// Pagination Action
// 유저가 더 많은 products를 원할 때, 첫 번째 항목은 건너 뒤고 두 번째 item을 가져옴

'use server';

import db from '@/lib/db';

export default async function getMoreProducts(page: number) {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    skip: 1,
    take: 1,
    orderBy: {
      created_at: 'desc',
    },
  });
  return products;
}
