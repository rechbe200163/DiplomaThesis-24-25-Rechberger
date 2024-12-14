/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.daisyui.com',
        port: '',
        pathname: '/images/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'supaapi.mrhost.uk',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
