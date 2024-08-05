// import { redirect } from 'next/navigation';

'use server';
// Server action
export async function handleForm(prevState: any, formData: FormData) {
  console.log(prevState);

  await new Promise((resolve) => setTimeout(resolve, 5000));
  // redirect('/'); // home으로 감
  return {
    errors: ['wrong password', 'password too short'],
  };
}
