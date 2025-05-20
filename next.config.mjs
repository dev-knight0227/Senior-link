/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '/photos/**',
            },
        ],
    },
    i18n: {
        locales: ['en', 'pl'],
        defaultLocale: 'pl',
    },
};


export default nextConfig;
