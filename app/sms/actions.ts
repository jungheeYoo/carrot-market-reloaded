// //-----------------------------------------------------
// // 6-6
// // Log In Validation
// 'use server';

// export async function smsVerification(prevState: any, formData: FormData) {}

// //-----------------------------------------------------
// // 6-7
// // Coerce
// 'use server';

// import { z } from 'zod';
// import validator from 'validator';

// const phoneSchema = z.string().trim().refine(validator.isMobilePhone);

// // coerce(강제)
// // 이걸 쓰면 유저가 입력한 string을 number로 변환한다
// const tokenSchema = z.coerce.number().min(100000).max(999999);

// export async function smsLogin(prevState: any, formData: FormData) {
//   console.log(typeof formData.get('token')); // string : 숫자를 입력 하지만 사실은 문자
//   console.log(typeof tokenSchema.parse(formData.get('token'))); // number 로 변환됨
// }

// // SMS 로그인 프로세스는 두 단계로 되어 있음
// // 1. 유저에게 전화번호 input만 보여주고, token을 보냄
// // 2. 인증번호 input을 보여주고, 거기서 token을 인증함
// // npm install validator

//-----------------------------------------------------
// 6-8
// SMS Validation
// interactive form

'use server';

import { z } from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, 'ko-KR'),
    'Wrong phone format'
  );

const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
}

export async function smsLogIn(prevState: ActionState, formData: FormData) {
  const phone = formData.get('phone');
  const token = formData.get('token');
  // 잘못된 전화번호를 입력하면 validation이 실패하고 token false를 return
  // prevState.token이 false인 경우, 즉 전화번호를 입력 받고 있다는 것
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      console.log(result.error.flatten());
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      return {
        token: true,
      };
    }
    // token이 true 경우, token을 받고 있다는 것
  } else {
    const result = tokenSchema.safeParse(token); // 토큰 검증
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      redirect('/');
    }
  }
}

// 이 initial state는, 이 함수를 최초 호출할 때의 prevState 값이 된다
