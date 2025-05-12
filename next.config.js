/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
    cacheOnFrontEndNav: true,
    importScripts: ["/custom-sw.js"],
    runtimeCaching: [
        {
            urlPattern: new RegExp(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/.*`),
            handler: "CacheFirst",
            options: {
                cacheName: "api-cache",
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 60 * 60 * 24 * 10
                }
            }
        }
    ],
    fallbacks: {
        document: "/offline"
    }
});

const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "**"
            }
        ]
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable"
                    }
                ]
            }
        ];
    }
};

module.exports = withPWA(nextConfig);
