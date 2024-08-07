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

//-----------------------------------------------------
// 6-2
// Refinement
// 에러 메세지 커스터마이징
// 각 필드의 고유한 validator 만드는 방법
// 두 필드를 함께 검증하는 방법

'use server';
import { z } from 'zod';

// 함수 따로 만듦
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
    // username은 기본적으로 이렇게 적으면 nusername이 필수라는 의미. required라고 명시할 필요가 없는 것
    // required가 되는걸 원치 않으면, optional을 붙이면 됨
    username: z
      .string({
        invalid_type_error: 'Username must be a stirng',
        required_error: 'Where is my username???',
      })
      .min(3, 'Way too short!!!')
      .max(10, 'That is too loooooog!')
      .refine(checkUsername, 'No potatoes allowed'),
    email: z.string().email(),
    password: z.string().min(10),
    confirm_password: z.string().min(10),
  })
  .refine(checkPasswords, {
    message: 'Both passwords should be the same!',
    path: ['confirm_password'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  // safeParse
  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());

    return result.error.flatten();
  }
}

// string method
// 여러가지 method를 받는다. 그 중 가장 중요한 것은
// invalid_type_error, required_error
// invalid_type_error 은 string을 예상했는데 유저가 number를 보내거나 할 때 나타남
// required_error 는 유저가 username을 아예 보내지 않는 경우

// .refine()
// refine에는 check function 을 넣을 수 있다
// 이 함수가 true를 return 하면 에러가 없고,
// 함수가 false를 return 하면, 그때 유저에게 보여줄 메세지를 작성할 수 있다
// 함수의 첫 번째 인자는 현재 검증 중인 값 여기서는 username
// refine 안에 작성한 함수가 true를 리턴하면 문제가 없다는 뜻
// false를 리턴하면 문제가 있다는 뜻이고, 유저에게 에러 메세지가 표시 된다

// 비밀번호를 둘 다 확인해야하는 경우
// object 전체를 refine 한다. 거기서 비밀번호 두 개만 확인. 근데 이렇게 하면 에러가 화면에 나오 지않음. 왜나면 이 refine이 하는 일은 이 object 안에 있는 것을 전부 다 검증하는 것
// 그래서 이 refine에서 에러가 발생한다면 zod는 그게 global 에러라고 생각한다. form 전체 관한 에러라고 생각함
// 근데 우리가 원하는 것은 비밀번호를 확인 하는 것이니
// zod에게 확실히 알려주면 된다
// 이 에러는 confirm_password 라는 특정 필드에 속한 것이라고 말해준다
// object를 만들어서 message를 넣은다음, zod에게 이 에러의 주인이 누군지 알려줌 path: ['cofirm_password'],
// 이제 zod가 이 refine을 실행할 때 메세지를 표시해야 하는 경우
