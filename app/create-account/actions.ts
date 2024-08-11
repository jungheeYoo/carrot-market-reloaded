// //-----------------------------------------------------
// // 6-0
// // Introduction to Zod
// // zod 유효성 검사 라이브러리 사용
// 'use server';
// import { z } from 'zod';

// // 데이터 조건 설명
// const usernameSchema = z.string().min(5).max(10);

// export async function createAccount(prevState: any, formData: FormData) {
//   // 유효성 검사하고 싶은 data object
//   const data = {
//     username: formData.get('username'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//     confirm_password: formData.get('confirm_password'),
//   };
//   // console.log(data);
//   // if(data.username !=) 이런 방식 원하지 않음
//   usernameSchema.parse(data.username);
// }

// // 첫 번째로 form에서 모든 item을 가져온다
// // formData로부터 username을 가지고 와서 data의 usernmae에 넣는다

// ////////
// // Zod를 사용한 유효성 검사
// // Zod가 나중에 if, else같은 것을 해줌
// // 우리는 데이터가 어떤 형태여야 하는지 정의 한다
// // Zod에게 데이터의 형태나 타입을 설명할 때, 무언가를 설명할 때는 스키마(Schema)를 만든다
// // Schema는 데이터가 어떻게 생겨야 하는지, 타입은 무엇인지 알려주는 설계도 같은 것

// //-----------------------------------------------------
// // 6-1
// // Validation Errors
// // 모든 값 검사하기

// // data object의 각 item마다 검사할 필요는 없다

// 'use server';
// import { z } from 'zod';

// const formSchema = z.object({
//   username: z.string().min(3).max(10),
//   email: z.string().email(),
//   password: z.string().min(10),
//   confirm_password: z.string().min(10),
// });

// export async function createAccount(prevState: any, formData: FormData) {
//   const data = {
//     username: formData.get('username'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//     confirm_password: formData.get('confirm_password'),
//   };
//   // 이렇게 하면 에러는 화면에 안뜨고 에러를 잡아서 콘솔로그 터미널에서 확인 가능

//   // parse
//   // try {
//   //   formSchema.parse(data);
//   // } catch (e) {
//   //   console.log(e);
//   // }

//   // safeParse
//   const result = formSchema.safeParse(data);
//   console.log(result); // { success: false, error: [Getter] }
//   if (!result.success) {
//     console.log(result.error.flatten());
//     // fieldErrors: {
//     //   password: [ 'String must contain at least 10 character(s)' ],
//     //   confirm_password: [ 'String must contain at least 10 character(s)' ]
//     return result.error.flatten();
//   }
// }

// // parse
// // : 데이터 유효성 검사가 실패하면 에러를 throw 한다
// // 그래서 parse를 쓸 때는 항상 try catch를 써야 함

// // safeParse
// // : 에러를 throw 하지 않는다
// // 대신에 유효성 검사의 결과를 얻는다
// // 에러를 사용자에게 return 할 수 있다

// // error에는 많은 property와 method가 있다

// // flatten
// // flatten을 쓰고 유효하지 않는 form을 다시 보냈을 때
// // 조금 더 간단하게 나옴
// // 그래서 error를 더 잘 관리할 수 있게 해준다

// //-----------------------------------------------------
// // 6-2
// // Refinement
// // 에러 메세지 커스터마이징
// // 각 필드의 고유한 validator 만드는 방법
// // 두 필드를 함께 검증하는 방법.

// 'use server';
// import { z } from 'zod';

// // 함수 따로 만듦
// const checkUsername = (username: string) => !username.includes('potato');

// const checkPasswords = ({
//   password,
//   confirm_password,
// }: {
//   password: string;
//   confirm_password: string;
// }) => password === confirm_password;

// const formSchema = z
//   .object({
//     // username은 기본적으로 이렇게 적으면 nusername이 필수라는 의미. required라고 명시할 필요가 없는 것
//     // required가 되는걸 원치 않으면, optional을 붙이면 됨
//     username: z
//       .string({
//         invalid_type_error: 'Username must be a stirng',
//         required_error: 'Where is my username???',
//       })
//       .min(3, 'Way too short!!!')
//       .max(10, 'That is too loooooog!')
//       .refine(checkUsername, 'No potatoes allowed'),
//     email: z.string().email(),
//     password: z.string().min(10),
//     confirm_password: z.string().min(10),
//   })
//   .refine(checkPasswords, {
//     message: 'Both passwords should be the same!',
//     path: ['confirm_password'],
//   });

// export async function createAccount(prevState: any, formData: FormData) {
//   const data = {
//     username: formData.get('username'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//     confirm_password: formData.get('confirm_password'),
//   };

//   // safeParse
//   const result = formSchema.safeParse(data);
//   if (!result.success) {
//     console.log(result.error.flatten());

//     return result.error.flatten();
//   }
// }

// // string method
// // 여러가지 method를 받는다. 그 중 가장 중요한 것은
// // invalid_type_error, required_error
// // invalid_type_error 은 string을 예상했는데 유저가 number를 보내거나 할 때 나타남
// // required_error 는 유저가 username을 아예 보내지 않는 경우

// // .refine()
// // refine에는 check function 을 넣을 수 있다
// // 이 함수가 true를 return 하면 에러가 없고,
// // 함수가 false를 return 하면, 그때 유저에게 보여줄 메세지를 작성할 수 있다
// // 함수의 첫 번째 인자는 현재 검증 중인 값 여기서는 username
// // refine 안에 작성한 함수가 true를 리턴하면 문제가 없다는 뜻
// // false를 리턴하면 문제가 있다는 뜻이고, 유저에게 에러 메세지가 표시 된다

// // 비밀번호를 둘 다 확인해야하는 경우
// // object 전체를 refine 한다. 거기서 비밀번호 두 개만 확인. 근데 이렇게 하면 에러가 화면에 나오 지않음. 왜나면 이 refine이 하는 일은 이 object 안에 있는 것을 전부 다 검증하는 것
// // 그래서 이 refine에서 에러가 발생한다면 zod는 그게 global 에러라고 생각한다. form 전체 관한 에러라고 생각함
// // 근데 우리가 원하는 것은 비밀번호를 확인 하는 것이니
// // zod에게 확실히 알려주면 된다
// // 이 에러는 confirm_password 라는 특정 필드에 속한 것이라고 말해준다
// // object를 만들어서 message를 넣은다음, zod에게 이 에러의 주인이 누군지 알려줌 path: ['cofirm_password'],
// // 이제 zod가 이 refine을 실행할 때 메세지를 표시해야 하는 경우

// //-----------------------------------------------------
// // 6-3
// // Transformation
// // zod를 사용해서 데이터를 변환(transform) 하는 방법
// // 예를 들면 유저가 대문자로 입력해도 모든 것을 소문자로 바꿔주는 것

// 'use server';
// import { z } from 'zod';

// // 함수 따로 만듦
// // 비밀번호 정규식 - 소문자, 대문자, 숫자, 특수문자
// const passwordRegex = new RegExp(
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
// );

// const checkUsername = (username: string) => !username.includes('potato');

// const checkPasswords = ({
//   password,
//   confirm_password,
// }: {
//   password: string;
//   confirm_password: string;
// }) => password === confirm_password;

// const formSchema = z
//   .object({
//     username: z
//       .string({
//         invalid_type_error: 'Username must be a stirng',
//         required_error: 'Where is my username???',
//       })
//       .min(3, 'Way too short!!!')
//       //.max(10, 'That is too loooooog!')
//       .toLowerCase()
//       .trim()
//       .transform((username) => `🔥 ${username} 🔥`)
//       /*
//       이렇게 변함
//       {
//         username: '🔥 dddd. 🔥',
//         email: 'aaaa@gmail.com',
//         password: '1Aa^',
//         confirm_password: '1Aa^'
//       }
//       */
//       .refine(checkUsername, 'No potatoes allowed'),
//     email: z.string().email().toLowerCase(),
//     password: z
//       .string()
//       .min(4)
//       .regex(
//         passwordRegex,
//         'Passwords must contain at least one UPPERCASE, lowercase, number and special characters.'
//       ),
//     confirm_password: z.string().min(4),
//   })
//   .refine(checkPasswords, {
//     message: 'Both passwords should be the same!',
//     path: ['confirm_password'],
//   });

// export async function createAccount(prevState: any, formData: FormData) {
//   const data = {
//     username: formData.get('username'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//     confirm_password: formData.get('confirm_password'),
//   };

//   // safeParse
//   const result = formSchema.safeParse(data);
//   if (!result.success) {
//     console.log(result.error.flatten());

//     return result.error.flatten();
//   } else {
//     console.log(result.data);
//   }
// }

// // zod는 데이터를 검증하는 것 뿐만 아니라 변환하는 것도 가능

// // .toLowerCase()
// // 유저가 대문자로 입력해도 모든 것을 소문자로 바꿔주는 것

// // .trim()
// // 유저가 시작과 끝에 공백을 넣었을 때 string 앞 뒤에 붙은 공백을 제거해줌.

// // .transform
// // 커스텀할 수 있음
// // 이 함수는 refine 함수와 동일하게 작동함
// // 이 함수는 반드시 무언가를 return 해야 함

// // refine은 네가 refine하려는 대상을 넘겨줌
// // validation의 성공 여부에 따라 true or false를 return 하면 됨
// // transform 역시 네가 transform 하려는 대상을 넘겨줌
// // 여기서는 true or false가 아니라 변환된 값을 return 하면 됨

// //-----------------------------------------------------
// // 6-4
// // Refactor
// // FormInput 리팩토링

// 'use server';
// import { z } from 'zod';

// // 함수 따로 만듦
// const passwordRegex = new RegExp(
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
// );

// const checkUsername = (username: string) => !username.includes('potato');

// const checkPasswords = ({
//   password,
//   confirm_password,
// }: {
//   password: string;
//   confirm_password: string;
// }) => password === confirm_password;

// const formSchema = z
//   .object({
//     username: z
//       .string({
//         invalid_type_error: 'Username must be a stirng',
//         required_error: 'Where is my username???',
//       })
//       .min(3, 'Way too short!!!')
//       .max(10, 'That is too loooooog!')
//       .toLowerCase()
//       .trim()
//       .transform((username) => `🔥 ${username} 🔥`)
//       .refine(checkUsername, 'No potatoes allowed'),
//     email: z.string().email().toLowerCase(),
//     password: z
//       .string()
//       .min(4)
//       .regex(
//         passwordRegex,
//         'Passwords must contain at least one UPPERCASE, lowercase, number and special characters.'
//       ),
//     confirm_password: z.string().min(4),
//   })
//   .refine(checkPasswords, {
//     message: 'Both passwords should be the same!',
//     path: ['confirm_password'],
//   });

// export async function createAccount(prevState: any, formData: FormData) {
//   const data = {
//     username: formData.get('username'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//     confirm_password: formData.get('confirm_password'),
//   };

//   // safeParse
//   const result = formSchema.safeParse(data);
//   if (!result.success) {
//     console.log(result.error.flatten());

//     return result.error.flatten();
//   } else {
//     console.log(result.data);
//   }
// }

// // 반드시 result.data를 사용하고, data object는 다시 사용하면 안됨
// // 왜냐면 이건 invalid할 가능성이 있고, 아직 transform도 되지 않은 데이터이기 때문

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

// // 파일로 분리
// // const passwordRegex = new RegExp(
// //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
// // );

// // 함수 따로 만듦
// const checkUsername = (username: string) => !username.includes('potato');
// const checkPasswords = ({
//   password,
//   confirm_password,
// }: {
//   password: string;
//   confirm_password: string;
// }) => password === confirm_password;

// const formSchema = z
//   .object({
//     username: z
//       .string({
//         invalid_type_error: 'Username must be a stirng',
//         required_error: 'Where is my username???',
//       })
//       .toLowerCase()
//       .trim()
//       .transform((username) => `🔥 ${username} 🔥`)
//       .refine(checkUsername, 'No potatoes allowed'),
//     email: z.string().email().toLowerCase(),
//     password: z
//       .string()
//       .min(PASSWORD_MIN_LENGTH)
//       .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
//     confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
//   })
//   .refine(checkPasswords, {
//     message: 'Both passwords should be the same!',
//     path: ['confirm_password'],
//   });

// export async function createAccount(prevState: any, formData: FormData) {
//   const data = {
//     username: formData.get('username'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//     confirm_password: formData.get('confirm_password'),
//   };

//   // safeParse
//   const result = formSchema.safeParse(data);
//   if (!result.success) {
//     console.log(result.error.flatten());

//     return result.error.flatten();
//   } else {
//     console.log(result.data);
//   }
// }

// //-----------------------------------------------------
// // 8-1
// // Database Validation
// // 사용자가 제출한 email과, username이 데이터베이스에 없는지 확인

// 'use server';
// import {
//   PASSWORD_MIN_LENGTH,
//   PASSWORD_REGEX,
//   PASSWORD_REGEX_ERROR,
// } from '@/lib/constants';
// import db from '@/lib/db';
// import { z } from 'zod';

// const checkUsername = (username: string) => !username.includes('potato');
// const checkPasswords = ({
//   password,
//   confirm_password,
// }: {
//   password: string;
//   confirm_password: string;
// }) => password === confirm_password;

// const checkUniqueUsername = async (username: string) => {
//   // check if username is taken
//   // 유저네임이 이미 존재하는지 확인
//   const user = await db.user.findUnique({
//     where: {
//       username: username,
//     },
//     select: {
//       id: true,
//     },
//   });
//   // user가 존재하면 에러 보여주기
//   // show an error
//   // if (user) {
//   //   return false;
//   // } else {
//   //   return true;
//   // }
//   // 위와 같음
//   // user가 발견되면 이건 truer가 됨
//   // 찾을 수 없는 경우에는 false가 됨
//   return !Boolean(user);
// };

// const checkUniqueEmail = async (email: string) => {
//   // check if the email is already used
//   // 이메일을 이미 누가 사용하고 있는지 확인
//   const user = await db.user.findUnique({
//     where: {
//       email: email,
//     },
//     select: {
//       id: true,
//     },
//   });
//   // userEmail이 존재하면 에러 보여주기
//   // show an error to the userEmail
//   return !Boolean(user);
// };

// const formSchema = z
//   .object({
//     username: z
//       .string({
//         invalid_type_error: 'Username must be a stirng',
//         required_error: 'Where is my username???',
//       })
//       .toLowerCase()
//       .trim()
//       // .transform((username) => `🔥 ${username} 🔥`)
//       .refine(checkUsername, 'No potatoes allowed')
//       .refine(checkUniqueUsername, 'This username is already taken'),
//     email: z
//       .string()
//       .email()
//       .toLowerCase()
//       .refine(
//         checkUniqueEmail,
//         'There is an account already registered with that email'
//       ),
//     password: z.string().min(PASSWORD_MIN_LENGTH),
//     // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
//     confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
//   })
//   .refine(checkPasswords, {
//     message: 'Both passwords should be the same!',
//     path: ['confirm_password'],
//   });

// export async function createAccount(prevState: any, formData: FormData) {
//   const data = {
//     username: formData.get('username'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//     confirm_password: formData.get('confirm_password'),
//   };

//   // safeParse
//   // data가 정제되고 변환을 거친 결과
//   const result = await formSchema.safeParseAsync(data);
//   if (!result.success) {
//     console.log(result.error.flatten());

//     return result.error.flatten();
//   } else {
//     // hash password
//     // 비밀번호를 해싱(hashing) 해야 함
//     // save the user to db
//     // 사용자를 데이터베이스에 저장
//     // log the user in
//     // 사용자가 데이터베이스에 저장되면 사용자를 로그인 시켜줌
//     // redirect '/home'
//     // 사용자가 로그인하면 사용자를 /home으로 redirect 시킴
//   }
// }

// // select
// // 데이터베이스에 요청할 데이터를 결정할 수 있음

// //-----------------------------------------------------
// // 8-2
// // Password Hashing
// //

// 'use server';
// import bcrypt from 'bcrypt';
// import {
//   PASSWORD_MIN_LENGTH,
//   PASSWORD_REGEX,
//   PASSWORD_REGEX_ERROR,
// } from '@/lib/constants';
// import db from '@/lib/db';
// import { z } from 'zod';

// const checkUsername = (username: string) => !username.includes('potato');
// const checkPasswords = ({
//   password,
//   confirm_password,
// }: {
//   password: string;
//   confirm_password: string;
// }) => password === confirm_password;

// const checkUniqueUsername = async (username: string) => {
//   // check if username is taken
//   // 유저네임이 이미 존재하는지 확인
//   const user = await db.user.findUnique({
//     where: {
//       username: username,
//     },
//     select: {
//       id: true,
//     },
//   });
//   // user가 존재하면 에러 보여주기
//   // show an error
//   // if (user) {
//   //   return false;
//   // } else {
//   //   return true;
//   // }
//   // 위와 같음
//   // user가 발견되면 이건 truer가 됨
//   // 찾을 수 없는 경우에는 false가 됨
//   return !Boolean(user);
// };

// const checkUniqueEmail = async (email: string) => {
//   // check if the email is already used
//   // 이메일을 이미 누가 사용하고 있는지 확인
//   const user = await db.user.findUnique({
//     where: {
//       email: email,
//     },
//     select: {
//       id: true,
//     },
//   });
//   // userEmail이 존재하면 에러 보여주기
//   // show an error to the userEmail
//   return !Boolean(user);
// };

// const formSchema = z
//   .object({
//     username: z
//       .string({
//         invalid_type_error: 'Username must be a stirng',
//         required_error: 'Where is my username???',
//       })
//       .toLowerCase()
//       .trim()
//       // .transform((username) => `🔥 ${username} 🔥`)
//       .refine(checkUsername, 'No potatoes allowed')
//       .refine(checkUniqueUsername, 'This username is already taken'),
//     email: z
//       .string()
//       .email()
//       .toLowerCase()
//       .refine(
//         checkUniqueEmail,
//         'There is an account already registered with that email'
//       ),
//     password: z.string().min(PASSWORD_MIN_LENGTH),
//     // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
//     confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
//   })
//   .refine(checkPasswords, {
//     message: 'Both passwords should be the same!',
//     path: ['confirm_password'],
//   });

// export async function createAccount(prevState: any, formData: FormData) {
//   const data = {
//     username: formData.get('username'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//     confirm_password: formData.get('confirm_password'),
//   };

//   // safeParse
//   // data가 정제되고 변환을 거친 결과
//   const result = await formSchema.safeParseAsync(data);
//   if (!result.success) {
//     console.log(result.error.flatten());

//     return result.error.flatten();
//   } else {
//     // hash password
//     // 비밀번호를 해싱(hashing) 해야 함
//     const hashedPassword = await bcrypt.hash(result.data.password, 12);
//     console.log(hashedPassword);
//     // 해시 번호 나옴
//     // $2b$12$fTt15b7Ztl8/gkO7bLZqH.D60ifBoNsmOc3Gq5hGKDqCHoCiXLbDO

//     // save the user to db
//     // 사용자를 데이터베이스에 저장
//     const user = await db.user.create({
//       data: {
//         username: result.data.username,
//         email: result.data.email,
//         password: hashedPassword,
//       },
//       select: {
//         id: true,
//       },
//     });
//     console.log(user);

//     // log the user in
//     // 사용자가 데이터베이스에 저장되면 사용자를 로그인 시켜줌
//     // redirect '/home'
//     // 사용자가 로그인하면 사용자를 /home으로 redirect 시킴
//   }
// }

// // 해싱은 기본적으로 유저가 보낸 비밀번호 변환하는 것
// // 해시 함수의 마법은 단방향
// // 똑같은 비밀번호로는 똑같이 생긴 무작위적인 문자열을 얻게 되지만
// // 해시 함수로 생성된 임의의 문자열을 해시 함수에 넣어도
// // 반대 방향으로는 그럴 수 없다
// // 이 무작위적인 결과를 내놓은 시드나 문자열이 무엇인지 알 수 없다
// /*
// 12345 => hashFunction(12345) => 5sdjfhskldfjsd-fg-090
// hashFunction(5sdjfhskldfjsd-fg-090) => 12345
// */

// // const hashedPassword = bcrypt.hash(result.data.password, 12);
// // 여기에서 12는 알고리즘을 얼마나 돌릴지 결정하는 것
// // 왜냐면 해싱을 한 번만 하는 것이 아니라
// // 해싱 알고리즘을 12번 실행한다는 것. 해시의 보안을 강화한다는 의미
// // hash에 마우스를 올리면 Promise 타입인 것을 볼 수 있고
// // Promise가 return 하는 값인 string을 받고 싶다면 await을 붙여줘야 함
// // 데이터베이스 쿼리를 실행했을 때 await 한 것 처럼 이렇게 await 해야 하는 이유는
// // 이 과정이 시간이 좀 걸리기 때문이다
// // 데이터베이스에서 무언가를 찾거나, 문자열을 해싱하는 과정은 시간이 걸림
// // 그래서 await 하는 것이다

// // 해싱된 비밀번호도 있으니 사용자를 데이터베이스에 저장해야 함

// //-----------------------------------------------------
// // 8-3
// // Iron Session
// // 사용자 로그인 시키기

// 'use server';
// import bcrypt from 'bcrypt';
// import {
//   PASSWORD_MIN_LENGTH,
//   PASSWORD_REGEX,
//   PASSWORD_REGEX_ERROR,
// } from '@/lib/constants';
// import db from '@/lib/db';
// import { z } from 'zod';
// import { Cookie } from 'next/font/google';
// import { getIronSession } from 'iron-session';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';

// const checkUsername = (username: string) => !username.includes('potato');
// const checkPasswords = ({
//   password,
//   confirm_password,
// }: {
//   password: string;
//   confirm_password: string;
// }) => password === confirm_password;

// const checkUniqueUsername = async (username: string) => {
//   // check if username is taken
//   // 유저네임이 이미 존재하는지 확인
//   const user = await db.user.findUnique({
//     where: {
//       username: username,
//     },
//     select: {
//       id: true,
//     },
//   });
//   // user가 존재하면 에러 보여주기
//   // show an error
//   // if (user) {
//   //   return false;
//   // } else {
//   //   return true;
//   // }
//   // 위와 같음
//   // user가 발견되면 이건 truer가 됨
//   // 찾을 수 없는 경우에는 false가 됨
//   return !Boolean(user);
// };

// const checkUniqueEmail = async (email: string) => {
//   // check if the email is already used
//   // 이메일을 이미 누가 사용하고 있는지 확인
//   const user = await db.user.findUnique({
//     where: {
//       email: email,
//     },
//     select: {
//       id: true,
//     },
//   });
//   // userEmail이 존재하면 에러 보여주기
//   // show an error to the userEmail
//   return !Boolean(user);
// };

// const formSchema = z
//   .object({
//     username: z
//       .string({
//         invalid_type_error: 'Username must be a stirng',
//         required_error: 'Where is my username???',
//       })
//       .toLowerCase()
//       .trim()
//       // .transform((username) => `🔥 ${username} 🔥`)
//       .refine(checkUsername, 'No potatoes allowed')
//       .refine(checkUniqueUsername, 'This username is already taken'),
//     email: z
//       .string()
//       .email()
//       .toLowerCase()
//       .refine(
//         checkUniqueEmail,
//         'There is an account already registered with that email'
//       ),
//     password: z.string().min(PASSWORD_MIN_LENGTH),
//     // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
//     confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
//   })
//   .refine(checkPasswords, {
//     message: 'Both passwords should be the same!',
//     path: ['confirm_password'],
//   });

// export async function createAccount(prevState: any, formData: FormData) {
//   console.log(cookies());

//   const data = {
//     username: formData.get('username'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//     confirm_password: formData.get('confirm_password'),
//   };

//   // safeParse
//   // data가 정제되고 변환을 거친 결과
//   const result = await formSchema.safeParseAsync(data);
//   if (!result.success) {
//     console.log(result.error.flatten());

//     return result.error.flatten();
//   } else {
//     // hash password
//     // 비밀번호를 해싱(hashing) 해야 함
//     const hashedPassword = await bcrypt.hash(result.data.password, 12);
//     console.log(hashedPassword);
//     // 해시 번호 나옴
//     // $2b$12$fTt15b7Ztl8/gkO7bLZqH.D60ifBoNsmOc3Gq5hGKDqCHoCiXLbDO

//     // save the user to db
//     // 사용자를 데이터베이스에 저장
//     const user = await db.user.create({
//       data: {
//         username: result.data.username,
//         email: result.data.email,
//         password: hashedPassword,
//       },
//       select: {
//         id: true,
//       },
//     });
//     console.log(user);

//     // log the user in
//     // 사용자가 데이터베이스에 저장되면 사용자를 로그인 시켜줌
//     const cookie = await getIronSession(cookies(), {
//       cookieName: 'delicious-karrot',
//       password: process.env.COOKIE_PASSWORD!,
//     });
//     //@ts-ignore
//     cookie.id = user.id;
//     await cookie.save();
//     // redirect '/home'
//     // 사용자가 로그인하면 사용자를 /home으로 redirect 시킴
//     redirect('/profile');
//   }
// }

// // 사용자 로그인 시키기?
// // 사용자에게 쿠키를 준다는 것, 데이터가 담긴 쿠키 준다
// // 하지만 이 텍스트 데이터 자체를 쿠키에 넣진 않음
// // 왜냐하면 그렇게 할 경우 어떤 사용자가 9를 변경해서 바꿔버릴 수 있다
// // 그럼 바뀐 사용자로 로그인 될 것이고, 이것은 안전하지 않다
// // 그래서 이것을 랜덤텍스트로 변형해야 함
// // 이 무작위적인 것을 쿠키에 담아서 사용자에게 줄 것임
// // 사용자에게 쿠키를 전달하고 나면, 우리가 아무것도 하지 않아도 자동으로
// // 다음에 사용자 브라우저가 request를 보낼 때
// // GET이든, POST든 그다음에 우리 웹사이트에서 무슨 요청을 보내던
// // 브라우저가 자동적으로 해당 쿠키를 서버로 보낸다
// // 우리는 이 쿠키를 사용자에게 주고, 다음에 사용자가 무언가를 한다면
// // 예를 들어 홈페이지로 가거나, 프로필 페이지로 가거나, 채팅페이지나
// // 사용자가 그곳으로 가려고 하면, 브라우저는 우리에게 우리가 사용자에게 줬던 쿠키를 보낸다
// // cookie(sajfldsfjasldfjld) ---> {id:9}
// // 즉, 사용자는 무슨 뜻인지 알지 못하는 이 값을 가지고 와서
// // 우리는 이것을 id:9 이런 형태로 바꿀 수 있다
// // 그러면 우리는 이 페이지로 이동하려는 사람은 id:9번 사용자인 것을 알 수 있다
// // 그럼 id:9번 사용자의 정보를 데이터베이스에서 찾아서 보여줄것임
// // 토큰, 쿠키, 세선 차이 유튜브 영상 보기!

// // getIronSession은 쿠키 접근 허용이 필요함
// // 나중에 쿠키를 읽거나 설정할 것이기 때문에 getIronSession에 쿠키를 줌
// // Iron Session을 얻으려면 현재 쿠키가 필요함
// // 그리고 초기 설정 해줘야 함

// // password: 'process.env.COOKIE_PASSWORD!',
// // ! 은 타입스크립트에게 .env안에 COOKIE_PASSWORD가 무조건 존재한다는 것을 알려주기 위한 것
// // 이 cookie에 우리가 쿠키에 넣고 싶은 정보 저장

// // iron session은 delicious-karrot이라는 쿠키를 가져오거나
// // 쿠키를 갖고 있지 않다면 생성해줌
// // cookie.id = user.id; 여기서 우리는 쿠키 안에 정보를 넣고
// // await cookie.save(); 그다음 저장
// // 그럼 iron session 우리가 만든 비밀번호를 써서 이 데이터를 암호화 할 것임
// // 사용자가 쿠키의 정보를 수정할 수 없도록 하는 것

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
// import { Cookie } from 'next/font/google';
// import { getIronSession } from 'iron-session';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
// import getSession from '@/lib/session';

// const checkUsername = (username: string) => !username.includes('potato');
// const checkPasswords = ({
//   password,
//   confirm_password,
// }: {
//   password: string;
//   confirm_password: string;
// }) => password === confirm_password;

// const checkUniqueUsername = async (username: string) => {
//   // check if username is taken
//   // 유저네임이 이미 존재하는지 확인
//   const user = await db.user.findUnique({
//     where: {
//       username: username,
//     },
//     select: {
//       id: true,
//     },
//   });
//   // user가 존재하면 에러 보여주기
//   // show an error
//   // if (user) {
//   //   return false;
//   // } else {
//   //   return true;
//   // }
//   // 위와 같음
//   // user가 발견되면 이건 truer가 됨
//   // 찾을 수 없는 경우에는 false가 됨
//   return !Boolean(user);
// };

// const checkUniqueEmail = async (email: string) => {
//   // check if the email is already used
//   // 이메일을 이미 누가 사용하고 있는지 확인
//   const user = await db.user.findUnique({
//     where: {
//       email: email,
//     },
//     select: {
//       id: true,
//     },
//   });
//   // userEmail이 존재하면 에러 보여주기
//   // show an error to the userEmail
//   return !Boolean(user);
// };

// const formSchema = z
//   .object({
//     username: z
//       .string({
//         invalid_type_error: 'Username must be a stirng',
//         required_error: 'Where is my username???',
//       })
//       .toLowerCase()
//       .trim()
//       // .transform((username) => `🔥 ${username} 🔥`)
//       .refine(checkUsername, 'No potatoes allowed')
//       .refine(checkUniqueUsername, 'This username is already taken'),
//     email: z
//       .string()
//       .email()
//       .toLowerCase()
//       .refine(
//         checkUniqueEmail,
//         'There is an account already registered with that email'
//       ),
//     password: z.string().min(PASSWORD_MIN_LENGTH),
//     // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
//     confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
//   })
//   .refine(checkPasswords, {
//     message: 'Both passwords should be the same!',
//     path: ['confirm_password'],
//   });

// export async function createAccount(prevState: any, formData: FormData) {
//   console.log(cookies());

//   const data = {
//     username: formData.get('username'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//     confirm_password: formData.get('confirm_password'),
//   };

//   // safeParse
//   // data가 정제되고 변환을 거친 결과
//   const result = await formSchema.safeParseAsync(data);
//   if (!result.success) {
//     console.log(result.error.flatten());

//     return result.error.flatten();
//   } else {
//     // hash password
//     // 비밀번호를 해싱(hashing) 해야 함
//     const hashedPassword = await bcrypt.hash(result.data.password, 12);
//     console.log(hashedPassword);
//     // 해시 번호 나옴
//     // $2b$12$fTt15b7Ztl8/gkO7bLZqH.D60ifBoNsmOc3Gq5hGKDqCHoCiXLbDO

//     // save the user to db
//     // 사용자를 데이터베이스에 저장
//     const user = await db.user.create({
//       data: {
//         username: result.data.username,
//         email: result.data.email,
//         password: hashedPassword,
//       },
//       select: {
//         id: true,
//       },
//     });
//     console.log(user);

//     // log the user in
//     // 사용자가 데이터베이스에 저장되면 사용자를 로그인 시켜줌
//     const session = await getSession();

//     session.id = user.id;
//     await session.save();
//     // redirect '/home'
//     // 사용자가 로그인하면 사용자를 /home으로 redirect 시킴
//     redirect('/profile');
//   }
// }

//-----------------------------------------------------
// 8-6
// superRefine

'use server';
import bcrypt from 'bcrypt';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import getSession from '@/lib/session';

const checkUsername = (username: string) => !username.includes('potato');
const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: 'Username must be a stirng',
        required_error: 'Where is my username???',
      })
      .toLowerCase()
      .trim()
      // .transform((username) => `🔥 ${username} 🔥`)
      .refine(checkUsername, 'No potatoes allowed'),

    email: z.string().email().toLowerCase(),

    password: z.string().min(PASSWORD_MIN_LENGTH),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: 'This username is already taken',
        path: ['username'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: 'This email is already taken',
        path: ['email'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: 'Both passwords should be the same!',
    path: ['confirm_password'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  console.log(cookies());

  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  // safeParse
  // data가 정제되고 변환을 거친 결과
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    // hash password
    // 비밀번호를 해싱(hashing) 해야 함
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    console.log(hashedPassword);
    // 해시 번호 나옴
    // $2b$12$fTt15b7Ztl8/gkO7bLZqH.D60ifBoNsmOc3Gq5hGKDqCHoCiXLbDO

    // save the user to db
    // 사용자를 데이터베이스에 저장
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    console.log(user);

    // log the user in
    // 사용자가 데이터베이스에 저장되면 사용자를 로그인 시켜줌
    const session = await getSession();

    session.id = user.id;
    await session.save();
    // redirect '/home'
    // 사용자가 로그인하면 사용자를 /home으로 redirect 시킴
    redirect('/profile');
  }
}
