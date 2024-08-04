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

//-----------------------------------------------------
// 5-0
// Route Handlers
// 잠시 use client 씀
// Server Action을 사용하지 않는다면 어떻게 해야 하는지 확인해 보는 중
'use client';

import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';

// Create Account Screen
export default function Login() {
  // 서버가 이 url을 통해서 돌려준 json을 읽는 것임
  // IOS 앱을 위한 백엔드를 제작한다면 이 방법이 유용
  // API route를 만들어야 함
  const onClick = async () => {
    const response = await fetch('/www/users', {
      method: 'POST',
      body: JSON.stringify({
        username: 'nico',
        password: '1234',
      }),
    });
    console.log(await response.json());
  };
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="email" placeholder="Email" required errors={[]} />
        <FormInput
          type="password"
          placeholder="Password"
          required
          errors={[]}
        />
      </form>
      <span onClick={onClick}>
        <FormButton loading={false} text="Log In" />
      </span>
      <SocialLogin />
    </div>
  );
}
