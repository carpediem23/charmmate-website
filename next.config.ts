import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000',
  },
};
console.log('API_URL', process.env.API_URL);

export default nextConfig;
