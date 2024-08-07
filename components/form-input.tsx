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

//-----------------------------------------------------
// 6-0
// Introduction to Zod
// zod 유효성 검사 라이브러리 사용

interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors?: string[]; // errors는 있을 수도 있고, 없을 수도 있다
  name: string;
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors = [], // 기본 값 주기
  name,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}

// errors를 이렇게 수정하면 create acount page에서 FormInput에 errors를 꼭 넣을 필요 없음
