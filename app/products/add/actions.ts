// // --------------------------------------------------------
// // Products
// // 11-1
// // Form Action

// // 제품 업로드 할 페이지 만들기

// 'use server';

// export async function uploadProduct(formData: FormData) {
//   const data = {
//     photo: formData.get('photo'),
//     title: formData.get('title'),
//     price: formData.get('price'),
//     description: formData.get('description'),
//   };
//   console.log(data);
// }

// --------------------------------------------------------
// Products
// 11-2
// Product Upload

// Zod 사용 validation
// 유저가 보내는 정보를 데이터베이스에 실제로 저장해서
// uploadProduct 함수 완성하기

'use server';

import { z } from 'zod';
import fs from 'fs/promises';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

const productSchema = z.object({
  photo: z.string({
    required_error: 'Photo is required',
  }),
  title: z.string({
    required_error: 'Title is required',
  }),
  description: z.string({
    required_error: 'Description is required',
  }),
  price: z.coerce.number({
    required_error: 'Price is required',
  }),
});

export async function uploadProduct(_: any, formData: FormData) {
  const data = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    price: formData.get('price'),
    description: formData.get('description'),
  };
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer(); // 에러남 노드버전 20이상 필요
    // console.log(photoData);

    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }
  const result = productSchema.safeParse(data);
  // console.log(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const product = await db.product.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          price: result.data.price,
          photo: result.data.photo,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/products/${product.id}`);
      //redirect("/products")
    }
  }
}
