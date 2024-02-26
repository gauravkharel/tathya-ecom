/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[{
            protocol: 'https',
            hostname: 'robohash.org',
            port: '',
        }]
    }
};

export default nextConfig;
