// --------------------------------------------------------
// Products
// 11-1
// Form Action

// 제품 업로드 할 페이지 만들기

'use server';

export async function uploadProduct(formData: FormData) {
  const data = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    price: formData.get('price'),
    description: formData.get('description'),
  };
  console.log(data);
}
