// // import { redirect } from 'next/navigation';

// 'use server';
// // Server action
// export async function handleForm(prevState: any, formData: FormData) {
//   console.log(prevState);

//   await new Promise((resolve) => setTimeout(resolve, 5000));
//   // redirect('/'); // home으로 감
//   return {
//     errors: ['wrong password', 'password too short'],
//   };
// }

// //-----------------------------------------------------
// // 6-6
// // Log In Validation

// 'use server';

// import {
//   PASSWORD_MIN_LENGTH,
//   PASSWORD_REGEX,
//   PASSWORD_REGEX_ERROR,
// } from '@/lib/constants';
// import { z } from 'zod';

// const formSchema = z.object({
//   email: z.string().email().toLowerCase(),
//   password: z
//     .string({
//       required_error: 'Password is required',
//     })
//     .min(PASSWORD_MIN_LENGTH)
//     .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
// });

// // Server action
// export async function login(prevState: any, formData: FormData) {
//   const data = {
//     email: formData.get('email'),
//     password: formData.get('password'),
//   };
//   const result = formSchema.safeParse(data);
//   if (!result.success) {
//     console.log(result.error.flatten());
//     return result.error.flatten();
//   } else {
//     console.log(result.data);
//   }
// }

// //-----------------------------------------------------
// // 8-5
// // Email Log In
// // 이메일과 비밀번호로 로그인 하기

// 'use server';

// import bcrypt from 'bcrypt';
// import {
//   PASSWORD_MIN_LENGTH,
//   PASSWORD_REGEX,
//   PASSWORD_REGEX_ERROR,
// } from '@/lib/constants';
// import db from '@/lib/db';
// import { z } from 'zod';
// import getSession from '@/lib/session';
// import { redirect } from 'next/navigation';

// const checkEmailExists = async (email: string) => {
//   // find a user with the email
//   // 이메일로 사용자 찾기
//   const user = await db.user.findUnique({
//     where: {
//       email: email,
//     },
//     select: {
//       id: true,
//     },
//   });
//   // if (user) {
//   //   return true;
//   // } else {
//   //   return false;
//   // }
//   return Boolean(user);
// };

// const formSchema = z.object({
//   email: z
//     .string()
//     .email()
//     .toLowerCase()
//     .refine(checkEmailExists, 'An accout with this email.'),
//   password: z.string({
//     required_error: 'Password is required',
//   }),
//   // .min(PASSWORD_MIN_LENGTH),
//   // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
// });

// // Server action
// export async function login(prevState: any, formData: FormData) {
//   const data = {
//     email: formData.get('email'),
//     password: formData.get('password'),
//   };
//   const result = await formSchema.spa(data);
//   if (!result.success) {
//     return result.error.flatten();
//   } else {
//     // if the user is found, check password hash
//     // 사용자를 찾았을 때만 비밀번호의 해시값을 확인
//     const user = await db.user.findUnique({
//       where: {
//         email: result.data.email,
//       },
//       select: {
//         id: true,
//         password: true,
//       },
//     });
//     const ok = await bcrypt.compare(
//       result.data.password,
//       user!.password ?? 'xxxx'
//     );
//     // log the user in
//     // 그리고 만약 비밀번호의 해시값이 일치한다면 사용자 로그인 시킴
//     if (ok) {
//       const session = await getSession();
//       session.id = user!.id;
//       // redirect '/profile'
//       // 사용자를 /profile로 보낼 것임
//       redirect('/profile');
//     } else {
//       return {
//         fieldErrors: {
//           password: ['Wrong password'],
//           email: [],
//         },
//       };
//     }
//   }
// }

//-----------------------------------------------------
// 8-5
// Email Log In
// 이메일과 비밀번호로 로그인 하기

'use server';

import bcrypt from 'bcrypt';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import { z } from 'zod';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

const checkEmailExists = async (email: string) => {
  // find a user with the email
  // 이메일로 사용자 찾기
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });
  // if (user) {
  //   return true;
  // } else {
  //   return false;
  // }
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, 'An accout with this email.'),
  password: z.string({
    required_error: 'Password is required',
  }),
  // .min(PASSWORD_MIN_LENGTH),
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

// Server action
export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // if the user is found, check password hash
    // 사용자를 찾았을 때만 비밀번호의 해시값을 확인
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? 'xxxx'
    );
    // log the user in
    // 그리고 만약 비밀번호의 해시값이 일치한다면 사용자 로그인 시킴
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      // redirect '/profile'
      // 사용자를 /profile로 보낼 것임
      redirect('/profile');
    } else {
      return {
        fieldErrors: {
          password: ['Wrong password'],
          email: [],
        },
      };
    }
  }
}
