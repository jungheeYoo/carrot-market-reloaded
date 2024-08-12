// // --------------------------------------------------------
// // Products
// // 10-3
// // Product Component

// import Link from 'next/link';
// import Image from 'next/image';

// interface ListProductProps {
//   title: string;
//   price: number;
//   created_at: Date;
//   photo: string;
//   id: number;
// }

// export default function ListProduct({
//   title,
//   price,
//   created_at,
//   photo,
//   id,
// }: ListProductProps) {
//   return (
//     <Link href={`/products/${id}`} className="flex gap-5">
//       <div className="relative size-28 rounded-md overflow-hidden">
//         <Image fill src={photo} alt={title} />
//       </div>
//       <div className="flex flex-col gap-1 *:text-white">
//         <span className="text-lg">{title}</span>
//         <span className="text-sm text-neutral-500">
//           {created_at.toString()}
//         </span>
//         <span className="text-lg font-semibold">{price}</span>
//       </div>
//     </Link>
//   );
// }

// // NextJS에 있는 Image component
// // HTML 태그인 imag tag를 쓰려고 하면, Next.js는 Image component를 사용하는게 더 좋다고 뜸
// // 왜냐하면 자동으로 image를 최적화 함. image를 optimize 함
// // Layout Shift(사진이 이동되는)를 방지하기 위해서는 가로, 세로 길이를 정해줘야함
// // 이렇게 하면 image가 load할 때 컴포넌트 주변은 위치가 바뀌지 않고,
// // page의 content가 아무렇게나 움직이지 않는다
// // loading="lazy" 이건 오직 유저가 보고 있는 동안에만, 보려고 할 때만 load 된다는 말
// // 하지만 이미지가 픽셀 사이즈로 얼마나 커질지 모를때가 있다. 얼마나 큰지 모르는 경우에는
// // 가로, 세로 없애고 fill 씀. 기본적으로 position : absolute

// --------------------------------------------------------
// Products
// 10-4
// Detail Skeleton

import Link from 'next/link';
import Image from 'next/image';
import { formatToTimeAgo, formatToWon } from '@/lib/utils';

interface ListProductProps {
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  id: number;
}

export default function ListProduct({
  title,
  price,
  created_at,
  photo,
  id,
}: ListProductProps) {
  return (
    <Link href={`/products/${id}`} className="flex gap-5">
      <div className="relative size-28 rounded-md overflow-hidden">
        <Image fill src={photo} alt={title} />
      </div>
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(created_at.toString())}
        </span>
        <span className="text-lg font-semibold">{formatToWon(price)}원</span>
      </div>
    </Link>
  );
}
