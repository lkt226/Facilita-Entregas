import dotenv from 'dotenv';
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL_API: process.env.BASE_URL_API || 'http://localhost:5000/api'
    }
};

export default nextConfig;
