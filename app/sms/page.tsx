// //-----------------------------------------------------
// // 4-3
// // Log in Screen
// // 소셜 로그인 버튼 분리
// // 계정 생성 화면과 로그인 화면에서 모두 사용

// import FormButton from '@/components/button';
// import FormInput from '@/components/input';
// import SocialLogin from '@/components/social-login';

// // Create Account Screen
// export default function SMSLogin() {
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">SMS Login</h1>
//         <h2 className="text-xl">Verify your phone number.</h2>
//       </div>
//       <form className="flex flex-col gap-3">
//         <FormInput
//           type="number"
//           placeholder="Phone number"
//           required
//           errors={[]}
//         />
//         <FormInput
//           type="number"
//           placeholder="Verification code"
//           required
//           errors={[]}
//         />
//         <FormButton loading={false} text="Verify" />
//       </form>
//     </div>
//   );
// }

// // 4-0 ~ 4-3 인증 화면 UI (Authentication UI )
// // 5-0 ~ 5-4 form 처리 방법 (Server Actions)

// //-----------------------------------------------------
// // 6-6
// // Log In Validation
// 'use client';

// import Button from '@/components/button';
// import Input from '@/components/input';
// import { useFormState } from 'react-dom';
// import { smsVerification } from './actions';

// // Create Account Screen
// export default function SMSLogin() {
//   const [state, dispatch] = useFormState(smsVerification, null);
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">SMS Login</h1>
//         <h2 className="text-xl">Verify your phone number.</h2>
//       </div>
//       <form action={dispatch} className="flex flex-col gap-3">
//         <Input name="phone" type="number" placeholder="Phone number" required />
//         <Input
//           name="token"
//           type="number"
//           placeholder="Verification code"
//           required
//         />
//         <Button text="Verify" />
//       </form>
//     </div>
//   );
// }

// //-----------------------------------------------------
// // 6-7
// // Coerce
// 'use client';

// import Button from '@/components/button';
// import Input from '@/components/input';
// import { useFormState } from 'react-dom';
// import { smsLogin } from './actions';

// // Create Account Screen
// export default function SMSLogin() {
//   const [state, dispatch] = useFormState(smsLogin, null);
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">SMS Login</h1>
//         <h2 className="text-xl">Verify your phone number.</h2>
//       </div>
//       <form action={dispatch} className="flex flex-col gap-3">
//         <Input name="phone" type="text" placeholder="Phone number" required />
//         <Input
//           name="token"
//           type="number"
//           placeholder="Verification code"
//           required
//           min={100000}
//           max={999999}
//         />
//         <Button text="Verify" />
//       </form>
//     </div>
//   );
// }

//-----------------------------------------------------
// 6-8
// SMS Validation
// interactive form

'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import { smsLogIn } from './actions';

const initialState = {
  token: false,
  error: undefined,
};

// Create Account Screen
export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogIn, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            name="token"
            type="number"
            placeholder="Verification code"
            required
            min={100000}
            max={999999}
          />
        ) : (
          // 유저가 전화번호를 바꾸는 걸 방지하기 위해서 여기에 붙임
          <Input
            name="phone"
            type="text"
            placeholder="Phone number"
            required
            errors={state.error?.formErrors}
          />
        )}
        {/* state.token이 true이면 '토큰 인증하기', false이면 '인증 문자 보내기' */}
        <Button
          text={state.token ? 'Verify Token' : 'Send Veriffication SMS'}
        />
      </form>
    </div>
  );
}

// 두 번째는 useFormState hook의 initial state이다 => null

// 이 페이지가 처음 render 되면, state.token의 값은 false가 될 것임
// 이 말은 여기서 input을 숨기는 데 사용할 수 있다는 것
// state.token이 true이면 input을 보여주고, false이면 null
