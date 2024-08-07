// // 계정 생성, 로그인, SMS 로그인에서 사용할 모든 component 생성
// //-----------------------------------------------------
// // 4-1
// // Create Account Screen

// import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
// import Link from 'next/link';

// // Create Account Screen
// export default function CreateAccount() {
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Fill in the form below to join!</h2>
//       </div>
//       <form className="flex flex-col gap-3">
//         <div className="flex flex-col gap-2">
//           <input
//             className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
//             type="text"
//             placeholder="Username"
//             required
//           />
//           <span className="text-red-500 font-medium">Input error</span>
//         </div>
//         <button className="primary-btn h-10">Create account</button>
//       </form>
//       <div className="w-full h-px bg-neutral-500" />
//       <div>
//         <Link
//           className="primary-btn flex h-10 items-center justify-center gap-3"
//           href="/sms"
//         >
//           <span>
//             <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
//           </span>
//           <span>Sign up with SMS</span>
//         </Link>
//       </div>
//     </div>
//   );
// }

// //-----------------------------------------------------
// // 4-2
// // Form Components
// // UI 요소들을 각각 별도의 component로 만들어
// // props로 component를 커스텀 할 수 있도록 함

// import FormButton from '@/components/form-btn';
// import FormInput from '@/components/form-input';
// import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
// import Link from 'next/link';

// // Create Account Screen
// export default function CreateAccount() {
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Fill in the form below to join!</h2>
//       </div>
//       <form className="flex flex-col gap-3">
//         <FormInput type="text" placeholder="Username" required errors={[]} />
//         <FormInput type="email" placeholder="Email" required errors={[]} />
//         <FormInput
//           type="password"
//           placeholder="Password"
//           required
//           errors={[]}
//         />
//         <FormInput
//           type="password"
//           placeholder="Confirm Password"
//           required
//           errors={[]}
//         />
//         <FormButton loading={false} text="Create account" />
//       </form>
//       <div className="w-full h-px bg-neutral-500" />
//       <div>
//         <Link
//           className="primary-btn flex h-10 items-center justify-center gap-3"
//           href="/sms"
//         >
//           <span>
//             <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
//           </span>
//           <span>Sign up with SMS</span>
//         </Link>
//       </div>
//     </div>
//   );
// }

// //-----------------------------------------------------
// // 4-3
// // Log in Screen
// // 소셜 로그인 버튼 분리
// // 계정 생성 화면과 로그인 화면에서 모두 사용

// import FormButton from '@/components/form-btn';
// import FormInput from '@/components/form-input';
// import SocialLogin from '@/components/social-login';

// // Create Account Screen
// export default function CreateAccount() {
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Fill in the form below to join!</h2>
//       </div>
//       <form className="flex flex-col gap-3">
//         <FormInput type="text" placeholder="Username" required errors={[]} />
//         <FormInput type="email" placeholder="Email" required errors={[]} />
//         <FormInput
//           type="password"
//           placeholder="Password"
//           required
//           errors={[]}
//         />
//         <FormInput
//           type="password"
//           placeholder="Confirm Password"
//           required
//           errors={[]}
//         />
//         <FormButton loading={false} text="Create account" />
//       </form>
//       <SocialLogin />
//     </div>
//   );
// }

// //-----------------------------------------------------
// // 6-0
// // Introduction to Zod
// // zod 유효성 검사 라이브러리 사용
// 'use client';

// import FormButton from '@/components/form-btn';
// import FormInput from '@/components/form-input';
// import SocialLogin from '@/components/social-login';
// import { useFormState } from 'react-dom';
// import { createAccount } from './actions';

// // Create Account Screen
// export default function CreateAccount() {
//   const [state, dispatch] = useFormState(createAccount, null);
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Fill in the form below to join!</h2>
//       </div>
//       <form action={dispatch} className="flex flex-col gap-3">
//         <FormInput
//           name="username"
//           type="text"
//           placeholder="Username"
//           required
//           errors={[]}
//         />
//         <FormInput name="email" type="email" placeholder="Email" required />
//         <FormInput
//           name="password"
//           type="password"
//           placeholder="Password"
//           required
//         />
//         <FormInput
//           name="confirm_password"
//           type="password"
//           placeholder="Confirm Password"
//           required
//         />
//         <FormButton text="Create account" />
//       </form>
//       <SocialLogin />
//     </div>
//   );
// }

//-----------------------------------------------------
// 6-1
// Validation Errors
// 모든 값 검사하기
'use client';

import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { createAccount } from './actions';

// Create Account Screen
export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required
          // 물음표를 넣는 이유는, 값이 string이거나 undefined일 수 있기 때문에
          errors={state?.fieldErrors.username}
        />
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors.password}
        />
        <FormInput
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          required
          errors={state?.fieldErrors.confirm_password}
        />
        <FormButton text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
}
