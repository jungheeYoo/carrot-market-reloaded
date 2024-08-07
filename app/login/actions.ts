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

//-----------------------------------------------------
// 6-6
// Log In Validation

'use server';

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

// Server action
export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
