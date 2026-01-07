// eslint-disable-next-line @typescript-eslint/no-var-requires
const withSerwist = require("@serwist/next").default({
    swSrc: "src/app/sw.ts",
    swDest: "public/sw.js",
    disable: process.env.NODE_ENV === "development",
    reloadOnOnline: true,
    additionalPrecacheEntries: [
        {
            url: "/offline",
            revision: Date.now().toString()
        }
    ]
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
                source: "/_next/static/:path*",
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

module.exports = withSerwist(nextConfig);
