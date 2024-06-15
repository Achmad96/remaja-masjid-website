/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/**'
      },
      {
        protocol: 'https',
        hostname: 'www.notion.so',
        pathname: '/images/**'
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
