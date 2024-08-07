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

//-----------------------------------------------------
// 6-1
// Validation Errors
// 모든 값 검사하기

// data object의 각 item마다 검사할 필요는 없다

'use server';
import { z } from 'zod';

const formSchema = z.object({
  username: z.string().min(3).max(10),
  email: z.string().email(),
  password: z.string().min(10),
  confirm_password: z.string().min(10),
});

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };
  // 이렇게 하면 에러는 화면에 안뜨고 에러를 잡아서 콘솔로그 터미널에서 확인 가능

  // parse
  // try {
  //   formSchema.parse(data);
  // } catch (e) {
  //   console.log(e);
  // }

  // safeParse
  const result = formSchema.safeParse(data);
  console.log(result); // { success: false, error: [Getter] }
  if (!result.success) {
    console.log(result.error.flatten());
    // fieldErrors: {
    //   password: [ 'String must contain at least 10 character(s)' ],
    //   confirm_password: [ 'String must contain at least 10 character(s)' ]
    return result.error.flatten();
  }
}

// parse
// : 데이터 유효성 검사가 실패하면 에러를 throw 한다
// 그래서 parse를 쓸 때는 항상 try catch를 써야 함

// safeParse
// : 에러를 throw 하지 않는다
// 대신에 유효성 검사의 결과를 얻는다
// 에러를 사용자에게 return 할 수 있다

// error에는 많은 property와 method가 있다

// flatten
// flatten을 쓰고 유효하지 않는 form을 다시 보냈을 때
// 조금 더 간단하게 나옴
// 그래서 error를 더 잘 관리할 수 있게 해준다
