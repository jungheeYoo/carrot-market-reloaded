// //-----------------------------------------------------
// // 6-6
// // Log In Validation
// 'use server';

// export async function smsVerification(prevState: any, formData: FormData) {}

//-----------------------------------------------------
// 6-7
// Coerce
'use server';

import { z } from 'zod';
import validator from 'validator';

const phoneSchema = z.string().trim().refine(validator.isMobilePhone);

// coerce(강제)
// 이걸 쓰면 유저가 입력한 string을 number로 변환한다
const tokenSchema = z.coerce.number().min(100000).max(999999);

export async function smsLogin(prevState: any, formData: FormData) {
  console.log(typeof formData.get('token')); // string : 숫자를 입력 하지만 사실은 문자
  console.log(typeof tokenSchema.parse(formData.get('token'))); // number 로 변환됨
}

// SMS 로그인 프로세스는 두 단계로 되어 있음
// 1. 유저에게 전화번호 input만 보여주고, token을 보냄
// 2. 인증번호 input을 보여주고, 거기서 token을 인증함
// npm install validator
