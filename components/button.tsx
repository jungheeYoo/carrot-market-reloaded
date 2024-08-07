// //-----------------------------------------------------
// // 4-2
// // Form Components

// import { useFormStatus } from 'react-dom';

// interface FormButtonProps {
//   loading: boolean;
//   text: string;
// }

// export default function FormButton({ loading, text }: FormButtonProps) {
//   return (
//     <button
//       disabled={loading}
//       className="primary-btn h-10 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
//     >
//       {loading ? '로딩 중' : text}
//     </button>
//   );
// }

// //-----------------------------------------------------
// // 5-2
// // useFormStatus
// // Server Action 경과와 UI가 서로 소통하는 방법

// 'use client';

// import { useFormStatus } from 'react-dom';

// interface FormButtonProps {
//   text: string;
// }

// export default function FormButton({ text }: FormButtonProps) {
//   // useFormStatus
//   const { pending } = useFormStatus();
//   return (
//     // 이 버튼은 form이 pending 상태라면 비활성화 됨
//     <button
//       disabled={pending}
//       className="primary-btn h-10 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
//     >
//       {pending ? '로딩 중' : text}
//     </button>
//   );
// }

// // loading: boolean; 은 필요 없다
// // 이제는 hook이 form의 로딩 상태를 알려줌

//-----------------------------------------------------
// 6-4
// Refactor
// FormInput 리팩토링

'use client';

import { useFormStatus } from 'react-dom';

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  // useFormStatus
  const { pending } = useFormStatus();
  return (
    // 이 버튼은 form이 pending 상태라면 비활성화 됨
    <button
      disabled={pending}
      className="primary-btn h-10 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? '로딩 중' : text}
    </button>
  );
}
