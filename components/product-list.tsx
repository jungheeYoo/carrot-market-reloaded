// // --------------------------------------------------------
// // Products
// // 10-7
// // Pagination Action

// 'use client';

// import { InitialProducts } from '@/app/(tabs)/products/page';
// import ListProduct from './list-product';
// import { useState } from 'react';
// import getMoreProducts from '@/app/(tabs)/products/actions';

// // tabs products에 가서 initialProducts에 마우스 대서 복사해서 가져오거나
// // interface ProductListProps {
// //   id: number;
// //   title: string;
// //   price: number;
// //   photo: string;
// //   created_at: Date;
// // }[]

// interface ProductListProps {
//   initialProducts: InitialProducts;
// }

// export default function ProductList({ initialProducts }: ProductListProps) {
//   const [products, setProducts] = useState(initialProducts);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [isLastPage, setIsLastPage] = useState(false);
//   const onLoadMorClick = async () => {
//     setIsLoading(true);
//     const newProducts = await getMoreProducts(page + 1);
//     if (newProducts.length !== 0) {
//       setPage((prev) => prev + 1);
//       setProducts((prev) => [...prev, ...newProducts]);
//     } else {
//       setIsLastPage(true);
//     }
//     setIsLoading(false);
//   };
//   return (
//     <div className="p-5 flex flex-col gap-5">
//       {products.map((product) => (
//         <ListProduct key={product.id} {...product} />
//       ))}
//       {isLastPage ? (
//         'No more items'
//       ) : (
//         <button
//           onClick={onLoadMorClick}
//           disabled={isLoading}
//           className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
//         >
//           {isLoading ? '로딩 중' : 'Load more'}
//         </button>
//       )}
//     </div>
//   );
// }

// // --------------------------------------------------------
// // Products
// // 10-9
// // Infinite Scrolling

// 'use client';

// import { InitialProducts } from '@/app/(tabs)/products/page';
// import ListProduct from './list-product';
// import { useEffect, useRef, useState } from 'react';
// import getMoreProducts from '@/app/(tabs)/products/actions';

// // tabs products에 가서 initialProducts에 마우스 대서 복사해서 가져오거나
// // interface ProductListProps {
// //   id: number;
// //   title: string;
// //   price: number;
// //   photo: string;
// //   created_at: Date;
// // }[]

// interface ProductListProps {
//   initialProducts: InitialProducts;
// }

// export default function ProductList({ initialProducts }: ProductListProps) {
//   const [products, setProducts] = useState(initialProducts);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [isLastPage, setIsLastPage] = useState(false);
//   const trigger = useRef<HTMLSpanElement>(null);
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       async (
//         entries: IntersectionObserverEntry[],
//         observer: IntersectionObserver
//       ) => {
//         const element = entries[0];
//         if (element.isIntersecting && trigger.current) {
//           observer.unobserve(trigger.current);
//           setIsLoading(true);
//           const newProducts = await getMoreProducts(page + 1);
//           if (newProducts.length !== 0) {
//             setPage((prev) => prev + 1);
//             setProducts((prev) => [...prev, ...newProducts]);
//           } else {
//             setIsLastPage(true);
//           }
//           setIsLoading(false);
//         }
//       },
//       {
//         threshold: 1.0,
//         rootMargin: '0px 0px -100px 0px',
//       }
//     );
//     if (trigger.current) {
//       observer.observe(trigger.current);
//     }
//     return () => {
//       observer.disconnect();
//     };
//   }, [page]);

//   return (
//     <div className="p-5 flex flex-col gap-5">
//       {products.map((product) => (
//         <ListProduct key={product.id} {...product} />
//       ))}
//       {!isLastPage ? (
//         <span
//           ref={trigger}
//           style={{
//             marginTop: `${page + 1 * 900}vh`,
//           }}
//           className=" mb-96 text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
//         >
//           {isLoading ? '로딩 중' : 'Load more'}
//         </span>
//       ) : null}
//     </div>
//   );
// }

// // --------------------------------------------------------
// // Products
// // 10-10
// // Recap

// 'use client';

// import { InitialProducts } from '@/app/(tabs)/products/page';
// import ListProduct from './list-product';
// import { useEffect, useRef, useState } from 'react';
// import getMoreProducts from '@/app/(tabs)/products/actions';

// // tabs products에 가서 initialProducts에 마우스 대서 복사해서 가져오거나
// // interface ProductListProps {
// //   id: number;
// //   title: string;
// //   price: number;
// //   photo: string;
// //   created_at: Date;
// // }[]

// interface ProductListProps {
//   initialProducts: InitialProducts;
// }

// export default function ProductList({ initialProducts }: ProductListProps) {
//   const [products, setProducts] = useState(initialProducts);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [isLastPage, setIsLastPage] = useState(false);
//   const trigger = useRef<HTMLSpanElement>(null);
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       async (
//         entries: IntersectionObserverEntry[],
//         observer: IntersectionObserver
//       ) => {
//         const element = entries[0];
//         if (element.isIntersecting && trigger.current) {
//           observer.unobserve(trigger.current);
//           setIsLoading(true);
//           const newProducts = await getMoreProducts(page + 1);
//           if (newProducts.length !== 0) {
//             setPage((prev) => prev + 1);
//             setProducts((prev) => [...prev, ...newProducts]);
//           } else {
//             setIsLastPage(true);
//           }
//           setIsLoading(false);
//         }
//       },
//       {
//         threshold: 1.0,
//         rootMargin: '0px 0px -100px 0px',
//       }
//     );
//     if (trigger.current) {
//       observer.observe(trigger.current);
//     }
//     return () => {
//       observer.disconnect();
//     };
//   }, [page]);

//   return (
//     <div className="p-5 flex flex-col gap-5">
//       {products.map((product) => (
//         <ListProduct key={product.id} {...product} />
//       ))}
//       {!isLastPage ? (
//         <span
//           ref={trigger}
//           className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
//         >
//           {isLoading ? '로딩 중' : 'Load more'}
//         </span>
//       ) : null}
//     </div>
//   );
// }

// --------------------------------------------------------
// Caching
// 13-0
// Introduction

'use client';

import { InitialProducts } from '@/app/(tabs)/products/page';
import ListProduct from './list-product';
import { useEffect, useRef, useState } from 'react';
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
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newProducts = await getMoreProducts(page + 1);
          if (newProducts.length !== 0) {
            setPage((prev) => prev + 1);
            setProducts((prev) => [...prev, ...newProducts]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
        rootMargin: '0px 0px -100px 0px',
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      {/* {!isLastPage ? (
        <span
          ref={trigger}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? '로딩 중' : 'Load more'}
        </span>
      ) : null} */}
    </div>
  );
}
