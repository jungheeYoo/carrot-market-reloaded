// // --------------------------------------------------------
// // Product Upload
// // 11-8
// // RHF Refactor

// // react hook form 과 server action을 함께 사용하는 방법
// // server action과 zod를 이용한 validation을 통합하는 방법

// import { z } from 'zod';

// export const productSchema = z.object({
//   photo: z.string({
//     required_error: 'Photo is required',
//   }),
//   title: z.string({
//     required_error: 'Title is required!!!!!',
//   }),
//   description: z.string({
//     required_error: 'Description is required',
//   }),
//   price: z.coerce.number({
//     required_error: 'Price is required',
//   }),
// });

// export type ProductType = z.infer<typeof productSchema>;
