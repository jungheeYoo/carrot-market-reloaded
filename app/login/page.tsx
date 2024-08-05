// //-----------------------------------------------------
// // 4-3
// // Log in Screen
// // 소셜 로그인 버튼 분리
// // 계정 생성 화면과 로그인 화면에서 모두 사용

// import FormButton from '@/components/form-btn';
// import FormInput from '@/components/form-input';
// import SocialLogin from '@/components/social-login';

// // Create Account Screen
// export default function Login() {
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Log in with email and password.</h2>
//       </div>
//       <form className="flex flex-col gap-3">
//         <FormInput type="email" placeholder="Email" required errors={[]} />
//         <FormInput
//           type="password"
//           placeholder="Password"
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
// // 5-0
// // Route Handlers
// // 잠시 use client 씀
// // Server Action을 사용하지 않는다면 어떻게 해야 하는지 확인해 보는 중
// 'use client';

// import FormButton from '@/components/form-btn';
// import FormInput from '@/components/form-input';
// import SocialLogin from '@/components/social-login';

// // Create Account Screen
// export default function Login() {
//   // 서버가 이 url을 통해서 돌려준 json을 읽는 것임
//   // IOS 앱을 위한 백엔드를 제작한다면 이 방법이 유용
//   // API route를 만들어야 함
//   const onClick = async () => {
//     const response = await fetch('/www/users', {
//       method: 'POST',
//       body: JSON.stringify({
//         username: 'nico',
//         password: '1234',
//       }),
//     });
//     console.log(await response.json());
//   };
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Log in with email and password.</h2>
//       </div>
//       <form className="flex flex-col gap-3">
//         <FormInput type="email" placeholder="Email" required errors={[]} />
//         <FormInput
//           type="password"
//           placeholder="Password"
//           required
//           errors={[]}
//         />
//       </form>
//       <span onClick={onClick}>
//         <FormButton loading={false} text="Log In" />
//       </span>
//       <SocialLogin />
//     </div>
//   );
// }

// //-----------------------------------------------------
// // 5-1
// // Server Actions

// import FormButton from '@/components/form-btn';
// import FormInput from '@/components/form-input';
// import SocialLogin from '@/components/social-login';

// // Create Account Screen
// export default function Login() {
//   // Server action
//   async function handleForm(formData: FormData) {
//     // const handleForm = async() => {
//     // use server는 이 함수가 서버에서만 실행되도록 만들어 줌
//     // 이 함수는 비동기 함수여야함
//     'use server';
//     console.log(formData.get('email'), formData.get('password'));
//     console.log('i run in the server baby!');
//   }
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Log in with email and password.</h2>
//       </div>
//       <form action={handleForm} className="flex flex-col gap-3">
//         <FormInput
//           name="email"
//           type="email"
//           placeholder="Email"
//           required
//           errors={[]}
//         />
//         <FormInput
//           name="password"
//           type="password"
//           placeholder="Password"
//           required
//           errors={[]}
//         />
//         <FormButton loading={false} text="Log in" />
//       </form>
//       <SocialLogin />
//     </div>
//   );
// }

// // NestJS 는 POST method를 위한 route 핸들러를 만든다는 뜻
// // 넘겨진 데이터 가져오는 방법
// // Server action 을 만드는 순간, () 여기서 데이터를 받을 수 있다
// // 데이터 타입은 FormData
// // 이건 FormData constructor 내부에서 오는 것
// // 이름은 상관없고 타입은 FormData 이어야 함

// //-----------------------------------------------------
// // 5-2
// // useFormStatus
// // Server Action 경과와 UI가 서로 소통하는 방법

// import FormButton from '@/components/form-btn';
// import FormInput from '@/components/form-input';
// import SocialLogin from '@/components/social-login';

// // Create Account Screen
// export default function Login() {
//   // Server action
//   async function handleForm(formData: FormData) {
//     'use server';
//     await new Promise((resolve) => setTimeout(resolve, 5000));
//     console.log('logged in!');
//   }
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Log in with email and password.</h2>
//       </div>
//       <form action={handleForm} className="flex flex-col gap-3">
//         <FormInput
//           name="email"
//           type="email"
//           placeholder="Email"
//           required
//           errors={[]}
//         />
//         <FormInput
//           name="password"
//           type="password"
//           placeholder="Password"
//           required
//           errors={[]}
//         />
//         <FormButton text="Log in" />
//       </form>
//       <SocialLogin />
//     </div>
//   );
// }

//-----------------------------------------------------
// 5-3
// useFormState
// Server Action 의 결과를 UI로 전달하는 방법

'use client';

import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { handleForm } from './actions';

export default function Login() {
  // use server 옮겨줌

  // 배열의 첫 번째 아이템은 state 가 됨
  // 이 경우에, stat는 action의 return 값이 될 것임
  // 두 번째 아이템은 action
  // 이것은 handleForm 이 함수 action을 실행시킬 것임
  // action을 useFormState로 넘겨주면
  // useFormState hook은 action의 결과를 돌려 줌
  const [state, action] = useFormState(handleForm, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      {/* 만약에 여기에 handleForm을 그대로 넣어버리면
      useFormState을 쓰는 이유가 없다. 결과를 알 수 없다
      대신 우리가 만든 action을 useFormState에게 넘겨주고
      트리거를 받아서 action에 넘겨줌
      */}
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={[]}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          // 에러가 존재하지 않는다면, 빈 배열을 반환
          errors={state?.errors ?? []}
        />
        <FormButton text="Log in" />
      </form>
      <SocialLogin />
    </div>
  );
}

// action은 사용자를 다른 곳으로 redirect도 할 수 있다
