// --------------------------------------------------------
// Products
// 11-0
// Introduction

// 제품 업로드 할 페이지 만들기
'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function AddProduct() {
  const [preview, setPreview] = useState('');
  const onImageChange = () => {};
  return (
    <div>
      <form className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer"
        >
          <PhotoIcon className="w-20" />
          <div className="text-neutral-400 text-sm">사진을 추가해주세요.</div>
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

// 'use client'; 쓰는 이유
// 유저가 업로드하려는 이미지 보여주기
