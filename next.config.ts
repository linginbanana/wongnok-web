import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'foodish-api.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'maggi.co.th',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
        pathname: '/public/**',
      },
      {
        protocol: 'https',
        hostname: 'static.bkkmenu.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.static.bkkmenu.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.maggi.co.th', // ✅ เพิ่มอันนี้
        pathname: '/**', // ใช้ /** เพื่อครอบคลุม path ทั้งหมด
      },
    ],
  },
};

export default nextConfig;