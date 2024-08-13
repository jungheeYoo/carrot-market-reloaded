// --------------------------------------------------------
// Products
// 10-7
// Pagination Action

'use client';

import { InitialProducts } from '@/app/(tabs)/products/page';
import ListProduct from './list-product';
import { useState } from 'react';
import getMoreProducts from '@/app/(tabs)/products/actions';

// tabs products에 가서 initialProducts에 마우스 대서 복사해서 가져오거나
// interface ProductListProps {
//   id: number;
//   title: string;
//   price: number;
//   photo: string;
//   created_at: Date;
// }[]

interface ProductListProps {
  initialProducts: InitialProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const onLoadMorClick = async () => {
    setIsLoading(true);
    const newProducts = await getMoreProducts(1);
    setProducts((prev) => [...prev, ...newProducts]);
    setIsLoading(false);
  };
  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      <button
        onClick={onLoadMorClick}
        disabled={isLoading}
        className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
      >
        {isLoading ? '로딩 중' : 'Load more'}
      </button>
    </div>
  );
}
