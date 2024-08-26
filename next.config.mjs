/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['media.sketchfab.com'],
      domains: ['adminpenal-backend-ybav.onrender.com'],
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '5000',  // Add the port if necessary
            pathname: '/images/**',
          },
        ],
      },
};

export default nextConfig;
