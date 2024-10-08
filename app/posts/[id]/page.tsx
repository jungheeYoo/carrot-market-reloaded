// // --------------------------------------------------------
// // Optimistic Updates
// // 14-2
// // Likes and Dislikes
// // 게시물 상세 페이지 UI 구현

// import db from '@/lib/db';
// import getSession from '@/lib/session';
// import { formatToTimeAgo } from '@/lib/utils';
// import { EyeIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
// import { revalidatePath } from 'next/cache';
// import Image from 'next/image';
// import { notFound } from 'next/navigation';

// async function getPost(id: number) {
//   try {
//     const post = await db.post.update({
//       where: {
//         id,
//       },
//       data: {
//         views: {
//           increment: 1,
//         },
//       },
//       include: {
//         user: {
//           select: {
//             username: true,
//             avatar: true,
//           },
//         },
//         _count: {
//           select: {
//             comments: true,
//             likes: true,
//           },
//         },
//       },
//     });
//     return post;
//   } catch (e) {
//     return null;
//   }
// }

// async function getIsLiked(postId: number) {
//   const session = await getSession();
//   const like = await db.like.findUnique({
//     where: {
//       id: {
//         postId,
//         userId: session.id!,
//       },
//     },
//   });
//   return Boolean(like);
// }

// export default async function PostDetail({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const id = Number(params.id);
//   if (isNaN(id)) {
//     return notFound();
//   }
//   const post = await getPost(id);
//   if (!post) {
//     return notFound();
//   }
//   // console.log(post); // 조회수 올라가는지 보기
//   const isLiked = await getIsLiked(id);
//   const likePost = async () => {
//     'use server';
//     const session = await getSession();
//     try {
//       await db.like.create({
//         data: {
//           postId: id,
//           userId: session.id!,
//         },
//       });
//       revalidatePath(`/post/${id}`);
//     } catch (e) {}
//   };
//   const dislikePost = async () => {
//     'use server';
//     try {
//       const session = await getSession();
//       await db.like.delete({
//         where: {
//           id: {
//             postId: id,
//             userId: session.id!,
//           },
//         },
//       });
//       revalidatePath(`/post/${id}`);
//     } catch (e) {}
//   };
//   return (
//     <div className="p-5 text-white">
//       <div className="flex items-center gap-2 mb-2">
//         {post.user.avatar ? (
//           <Image
//             width={28}
//             height={28}
//             className="size-7 rounded-full"
//             src={post.user.avatar}
//             alt={post.user.username}
//           />
//         ) : (
//           <div className="size-7 rounded-full bg-slate-300" />
//         )}
//         <div>
//           <span className="text-sm font-semibold">{post.user.username}</span>
//           <div className="text-xs">
//             <span>{formatToTimeAgo(post.created_at.toString())}</span>
//           </div>
//         </div>
//       </div>
//       <h2 className="text-lg font-semibold">{post.title}</h2>
//       <p className="mb-5">{post.description}</p>
//       <div className="flex flex-col gap-5 items-start">
//         <div className="flex items-center gap-2 text-neutral-400 text-sm">
//           <EyeIcon className="size-5" />
//           <span>조회 {post.views}</span>
//         </div>
//         <form action={isLiked ? dislikePost : likePost}>
//           <button
//             className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 hover:bg-neutral-800 transition-colors`}
//           >
//             <HandThumbUpIcon className="size-5" />
//             <span>공감하기 ({post._count.likes})</span>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // update method는 업데이트할 post를 찾지 못하면 에러를 발생시킴
// // 따라서 유저가 존재하지 않는 잘못된 id를 보내면
// // 해당 post가 존재하지 않기 때문에 update 되지 않고 에러가 발생 됨
// // 그래서 try.. catch 문 사용

// // --------------------------------------------------------
// // Optimistic Updates
// // 14-3
// // Cache Tags

// import db from '@/lib/db';
// import getSession from '@/lib/session';
// import { formatToTimeAgo } from '@/lib/utils';
// import { EyeIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
// import { HandThumbUpIcon as OutlineThumbUpIcon } from '@heroicons/react/24/outline';
// import {
//   revalidatePath,
//   unstable_cache as nextCache,
//   revalidateTag,
// } from 'next/cache';
// import Image from 'next/image';
// import { notFound } from 'next/navigation';

// async function getPost(id: number) {
//   try {
//     const post = await db.post.update({
//       where: {
//         id,
//       },
//       data: {
//         views: {
//           increment: 1,
//         },
//       },
//       include: {
//         user: {
//           select: {
//             username: true,
//             avatar: true,
//           },
//         },
//         _count: {
//           select: {
//             comments: true,
//           },
//         },
//       },
//     });
//     return post;
//   } catch (e) {
//     return null;
//   }
// }

// const getCachedPost = nextCache(getPost, ['post-detail'], {
//   tags: [`post-detail`],
//   revalidate: 60,
// });

// async function getLikeStatus(postId: number, userId: number) {
//   // const session = await getSession();
//   const isLiked = await db.like.findUnique({
//     where: {
//       id: {
//         postId,
//         userId,
//       },
//     },
//   });
//   const likeCount = await db.like.count({
//     where: {
//       postId,
//     },
//   });
//   return {
//     likeCount,
//     isLiked: Boolean(isLiked),
//   };
// }

// async function getCachedLikeStatus(postId: number) {
//   const session = await getSession();
//   const userId = session.id;
//   const cachedOperation = nextCache(getLikeStatus, ['post-like-status'], {
//     tags: [`like-status-${postId}`],
//   });
//   return cachedOperation(postId, userId!);
// }

// export default async function PostDetail({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const id = Number(params.id);
//   if (isNaN(id)) {
//     return notFound();
//   }
//   const post = await getCachedPost(id);
//   if (!post) {
//     return notFound();
//   }
//   const likePost = async () => {
//     'use server';
//     const session = await getSession();
//     try {
//       await db.like.create({
//         data: {
//           postId: id,
//           userId: session.id!,
//         },
//       });
//       revalidateTag(`like-status-${id}`);
//     } catch (e) {}
//   };
//   const dislikePost = async () => {
//     'use server';
//     const session = await getSession();
//     try {
//       await db.like.delete({
//         where: {
//           id: {
//             postId: id,
//             userId: session.id!,
//           },
//         },
//       });
//       revalidateTag(`like-status-${id}`);
//     } catch (e) {}
//   };
//   const { likeCount, isLiked } = await getCachedLikeStatus(id);
//   return (
//     <div className="p-5 text-white">
//       <div className="mb-3">
//         <Image
//           width={28}
//           height={28}
//           className="size-7 rounded-full"
//           src={post.user.avatar!}
//           alt={post.user.username}
//         />
//         <div>
//           <h3 className="text-sm font-semibold">{post.user.username}</h3>
//           <div className="text-xs">
//             <span>{formatToTimeAgo(post.created_at.toString())}</span>
//           </div>
//         </div>
//       </div>
//       <h2 className="text-lg font-semibold">{post.title}</h2>
//       <p className="mb-5">{post.description}</p>
//       <div className="flex flex-col gap-5 items-start">
//         <div className="flex items-center gap-2 text-neutral-400 text-sm">
//           <EyeIcon className="size-5" />
//           <span>조회 {post.views}</span>
//         </div>
//         <form action={isLiked ? dislikePost : likePost}>
//           <button
//             className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 transition-colors ${
//               isLiked
//                 ? 'bg-orange-500 text-white border-orange-500'
//                 : 'hover:bg-white hover:text-neutral-800'
//             }`}
//           >
//             {isLiked ? (
//               <HandThumbUpIcon className="size-5" />
//             ) : (
//               <OutlineThumbUpIcon className="size-5" />
//             )}
//             {isLiked ? (
//               <span>{likeCount}</span>
//             ) : (
//               <span>공감하기 ({likeCount})</span>
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

/* import db from '@/lib/db';
import getSession from '@/lib/session';
import { formatToTimeAgo } from '@/lib/utils';
import { EyeIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import { HandThumbUpIcon as OutlineThumbUpIcon } from '@heroicons/react/24/outline';
import {
  revalidatePath,
  unstable_cache as nextCache,
  revalidateTag,
} from 'next/cache';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
}

const getCachedPost = nextCache(getPost, ['post-detail'], {
  tags: [`post-detail`],
  revalidate: 60,
});

async function getLikeStatus(postId: number, userId: number) {
  // const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getCachedLikeStatus(postId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = nextCache(getLikeStatus, ['post-like-status'], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperation(postId, userId!);
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }
  const session = await getSession();
  if (!session || !session.id) {
    return notFound();
  }

  const likePost = async () => {
    'use server';
    try {
      await db.like.create({
        data: {
          postId: id,
          userId: session.id!,
        },
      });
      revalidateTag(`like-status-${id}`);
    } catch (e) {}
  };

  const dislikePost = async () => {
    'use server';
    const session = await getSession();
    try {
      await db.like.delete({
        where: {
          id: {
            postId: id,
            userId: session.id!,
          },
        },
      });
      revalidateTag(`like-status-${id}`);
    } catch (e) {}
  };
  const { likeCount, isLiked } = await getCachedLikeStatus(id);
  if (likeCount === null) {
    return notFound();
  }

  return (
    <div className="p-5 text-white">
      <div className="mb-3">
        {post.user.avatar ? (
          <Image
            width={28}
            height={28}
            className="size-7 rounded-full"
            src={post.user.avatar}
            alt={post.user.username}
          />
        ) : (
          <div className="size-7 rounded-full bg-slate-300" />
        )}

        <div>
          <h3 className="text-sm font-semibold">{post.user.username}</h3>
          <div className="text-xs">
            <span>{formatToTimeAgo(post.created_at.toString())}</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.description}</p>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {post.views}</span>
        </div>
        <form action={isLiked ? dislikePost : likePost}>
          <button
            className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 transition-colors ${
              isLiked
                ? 'bg-orange-500 text-white border-orange-500'
                : 'hover:bg-white hover:text-neutral-800'
            }`}
          >
            {isLiked ? (
              <HandThumbUpIcon className="size-5" />
            ) : (
              <OutlineThumbUpIcon className="size-5" />
            )}
            {isLiked ? (
              <span>{likeCount}</span>
            ) : (
              <span>공감하기 ({likeCount})</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
} */

// --------------------------------------------------------
// Optimistic Updates
// 14-4
// useOptimistic hook

import db from '@/lib/db';
import getSession from '@/lib/session';
import { formatToTimeAgo } from '@/lib/utils';
import { EyeIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import { HandThumbUpIcon as OutlineThumbUpIcon } from '@heroicons/react/24/outline';
import {
  revalidatePath,
  unstable_cache as nextCache,
  revalidateTag,
} from 'next/cache';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import LikeButton from '@/components/like-button';

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
}

const getCachedPost = nextCache(getPost, ['post-detail'], {
  tags: [`post-detail`],
  revalidate: 60,
});

async function getLikeStatus(postId: number, userId: number) {
  // const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getCachedLikeStatus(postId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = nextCache(getLikeStatus, ['post-like-status'], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperation(postId, userId!);
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }
  const likePost = async () => {
    'use server';
    const session = await getSession();
    try {
      await db.like.create({
        data: {
          postId: id,
          userId: session.id!,
        },
      });
      revalidateTag(`like-status-${id}`);
    } catch (e) {}
  };
  const dislikePost = async () => {
    'use server';
    const session = await getSession();
    try {
      await db.like.delete({
        where: {
          id: {
            postId: id,
            userId: session.id!,
          },
        },
      });
      revalidateTag(`like-status-${id}`);
    } catch (e) {}
  };
  const { likeCount, isLiked } = await getCachedLikeStatus(id);
  return (
    <div className="p-5 text-white">
      <div className="mb-3">
        <Image
          width={28}
          height={28}
          className="size-7 rounded-full"
          src={post.user.avatar!}
          alt={post.user.username}
        />
        <div>
          <h3 className="text-sm font-semibold">{post.user.username}</h3>
          <div className="text-xs">
            <span>{formatToTimeAgo(post.created_at.toString())}</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.description}</p>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {post.views}</span>
        </div>
        <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
      </div>
    </div>
  );
}
