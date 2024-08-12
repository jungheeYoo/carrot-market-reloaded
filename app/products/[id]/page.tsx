// --------------------------------------------------------
// Products
// 10-4
// Detail Skeleton

// 상세 화면에 탭바가 나오길 원하지 않아 products 폴더 따로 만듦
async function getProduct() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
}

export default async function ProductDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProduct();
  return <span>Product detail of the product {id}</span>;
}
