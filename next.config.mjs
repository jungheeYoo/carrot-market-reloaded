// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// --------------------------------------------------------
// Products
// 10-6
// Image Hostnames
// 이 도메인을 가진 이미지를 image 컴포넌트로 최적화 시키기

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;

// NextJS의 Image는 이미지를 자동으로 최적화를 해 주어 성능을 향상시키고 빠른 로딩이 되도록 해준다.
// 하지만 외부 호스트의 이미지(다른 사이트의 이미지 링크 등)를 불러올 때는 보안 상의 이유로 이 기능이 허용되지 않는다.
