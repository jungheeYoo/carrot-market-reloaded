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

// --------------------------------------------------------
// Products
// 10-2
// Skeletons
// products page 작업

async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
}

export default async function products() {
  const products = await getProducts();
  return (
    <div>
      <h1 className="text-white text-4xl">Products!</h1>
    </div>
  );
}
