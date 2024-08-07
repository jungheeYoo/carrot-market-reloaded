// //-----------------------------------------------------
// // 4-2
// // Form Components

// interface FormInputProps {
//   type: string;
//   placeholder: string;
//   required: boolean;
//   errors: string[]; // 문자[배열] 여러 개의 error를 가질 수 있기 때문
// }

// export default function FormInput({
//   type,
//   placeholder,
//   required,
//   errors,
// }: FormInputProps) {
//   return (
//     <div className="flex flex-col gap-2">
//       <input
//         className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
//         type={type}
//         placeholder={placeholder}
//         required={required}
//       />
//       {errors.map((error, index) => (
//         <span key={index} className="text-red-500 font-medium">
//           {error}
//         </span>
//       ))}
//     </div>
//   );
// }

// //-----------------------------------------------------
// // 5-1
// // Server Actions

// interface FormInputProps {
//   type: string;
//   placeholder: string;
//   required: boolean;
//   errors: string[]; // 문자[배열] 여러 개의 error를 가질 수 있기 때문
//   name: string;
// }

// export default function FormInput({
//   type,
//   placeholder,
//   required,
//   errors,
//   name,
// }: FormInputProps) {
//   return (
//     <div className="flex flex-col gap-2">
//       <input
//         name={name}
//         className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
//         type={type}
//         placeholder={placeholder}
//         required={required}
//       />
//       {errors.map((error, index) => (
//         <span key={index} className="text-red-500 font-medium">
//           {error}
//         </span>
//       ))}
//     </div>
//   );
// }

// // Server Actions 에서 input 에는 name 속성이 필요

// //-----------------------------------------------------
// // 6-0
// // Introduction to Zod
// // zod 유효성 검사 라이브러리 사용

// interface FormInputProps {
//   type: string;
//   placeholder: string;
//   required: boolean;
//   errors?: string[]; // errors는 있을 수도 있고, 없을 수도 있다
//   name: string;
// }

// export default function FormInput({
//   type,
//   placeholder,
//   required,
//   errors = [], // 기본 값 주기
//   name,
// }: FormInputProps) {
//   return (
//     <div className="flex flex-col gap-2">
//       <input
//         name={name}
//         className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
//         type={type}
//         placeholder={placeholder}
//         required={required}
//       />
//       {errors.map((error, index) => (
//         <span key={index} className="text-red-500 font-medium">
//           {error}
//         </span>
//       ))}
//     </div>
//   );
// }

// // errors를 이렇게 수정하면 create acount page에서 FormInput에 errors를 꼭 넣을 필요 없음

//-----------------------------------------------------
// 6-4
// Refactor
// FormInput 리팩토링

import { InputHTMLAttributes } from 'react';

interface InputProps {
  errors?: string[]; // errors는 있을 수도 있고, 없을 수도 있다
  name: string; // 이것도 html에 있지만 남겨둠 input에 name 지정 잊으면 안됨
}

export default function Input({
  name,
  errors = [], // 기본 값 주기
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  console.log(rest);

  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}

// input HTML element가 가진 모든 속성을 FormInput에 props로 넘겨줌
// }: FormInputProps & InputHTMLAttributes<HTMLInputElement>) {
// <HTMLInputElement> 타입스크립트의 제네릭
// FormInput 컴포넌트는 type, placeholder...이것들을 props로 받는데
// 이것뿐만 아니라 input이 받을 수 있는 모든 attributes 또한 받을 수 있다고 하는 것

// 필요 없는 것들은 지우고, errors와 name을 제외하고 모든 props 갖고 오기
// 변수 하나에 모든 props 담는다
