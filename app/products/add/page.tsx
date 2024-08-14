// // --------------------------------------------------------
// // Products
// // 11-0
// // Introduction

// // 제품 업로드 할 페이지 만들기
// 'use client';

// import Button from '@/components/button';
// import Input from '@/components/input';
// import { PhotoIcon } from '@heroicons/react/24/solid';
// import { useState } from 'react';

// export default function AddProduct() {
//   const [preview, setPreview] = useState('');
//   const onImageChange = () => {};
//   return (
//     <div>
//       <form className="p-5 flex flex-col gap-5">
//         <label
//           htmlFor="photo"
//           className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer"
//         >
//           <PhotoIcon className="w-20" />
//           <div className="text-neutral-400 text-sm">사진을 추가해주세요.</div>
//         </label>
//         <input
//           onChange={onImageChange}
//           type="file"
//           id="photo"
//           name="photo"
//           accept="image/*"
//           className="hidden"
//         />

//         <Input name="title" required placeholder="제목" type="text" />
//         <Input name="price" type="number" required placeholder="가격" />
//         <Input
//           name="description"
//           type="text"
//           required
//           placeholder="자세한 설명"
//         />
//         <Button text="작성 완료" />
//       </form>
//     </div>
//   );
// }

// // 'use client'; 쓰는 이유
// // 유저가 업로드하려는 이미지 보여주기

// --------------------------------------------------------
// Products
// 11-1
// Form Action

// 제품 업로드 할 페이지 만들기
'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { uploadProduct } from './actions';

export default function AddProduct() {
  const [preview, setPreview] = useState('');
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.files);
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    // file을 유저에게 실제로 보여주기 API
    // URL.createObjectURL()
    const url = URL.createObjectURL(file);
    // console.log(url); // blob:http://localhost:3000/5139fb2b-4956-4914-b2df-2ca4caec77f1
    setPreview(url);
  };
  return (
    <div>
      <form action={uploadProduct} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === '' ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                사진을 추가해주세요.
              </div>
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />

        <Input name="title" required placeholder="제목" type="text" />
        <Input name="price" type="number" required placeholder="가격" />
        <Input
          name="description"
          type="text"
          required
          placeholder="자세한 설명"
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}

// input에서 type="file" 은 너무 못생겼기 때문에 숨기고 label을 활용
// input에 onChange={onImageChange} onChange 리스너가 있으면 체인지 될 때마다 React.js가 이 함수를 실행
// const onImageChange = (여기에) => {체인지 대상}; change event에 관한 정보를 넣어주면 됨

// file을 유저에게 실제로 보여주기 API
// URL.createObjectURL()
// URL을 생성한다. 우리 브라우저에만 존재하고, 다른 사람들은 볼 수 없음
// 이 URL은 이 파일이 업로드된 메모리를 참조한다
// 즉, 브라우저가 이 파일에 엑세스 할 수 있다는 뜻
// 내 문서 어디에 들어가서 실제 파일을 읽는 것은 아님. 브라우저 메모리에 저장해놓음
// 이 파일은 내가 브라우저와 공유하기로 선택한 파일
// 그래서 파일이 브라우저의 메모리에 업로드 되었고, 페이지를 새로고침할 때까지 그곳에 저장 됨
// 그리고 우리는 그 파일이 저장된 메모리의 URL을 알려달라고 하면 되는 것

// 코드 챌린지
// 1. 유저가 이미지를 업로드했는지 확인
// 2. 이미지 사이즈가 대략 3-4MB 이하인지 확인
