import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheFirst, ExpirationPlugin, NetworkFirst, Serwist } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
    interface WorkerGlobalScope extends SerwistGlobalConfig {
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: false,
    runtimeCaching: [
        {
            matcher: ({ request }) => request.mode === "navigate",
            handler: new NetworkFirst({
                cacheName: "pages-cache",
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 50
                    })
                ]
            })
        },
        {
            matcher: ({ request }) =>
                request.destination === "image" ||
                request.url.includes("/assets/") ||
                request.url.includes("/manifest.json"),
            handler: new CacheFirst({
                cacheName: "static-assets",
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 200,
                        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 dni
                    })
                ]
            })
        },
        {
            matcher: ({ url }) => url.pathname.startsWith("/api/"),
            handler: new NetworkFirst({
                cacheName: "rtk-api-cache",
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 100,
                        maxAgeSeconds: 24 * 60 * 60 // 24h
                    }),
                    {
                        cacheWillUpdate: async ({ response }) => {
                            if (response && response.status === 200) {
                                return response;
                            }
                            return null;
                        }
                    }
                ]
            })
        },
        {
            matcher: ({ url, request }) => {
                const isRSC = url.search.includes("_rsc=") || request.headers.get("RSC") === "1";
                const isNextData = url.pathname.includes("/_next/data/");
                return isRSC || isNextData;
            },
            handler: new NetworkFirst({
                cacheName: "next-data-cache",
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 100,
                        maxAgeSeconds: 24 * 60 * 60 // 24h
                    })
                ]
            })
        },
        {
            matcher: ({ url }) => url.hostname === "res.cloudinary.com",
            handler: new CacheFirst({
                cacheName: "cloudinary-images",
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 500,
                        maxAgeSeconds: 30 * 24 * 60 * 60
                    })
                ]
            })
        },
        {
            matcher: ({ request }) => request.destination === "font",
            handler: new CacheFirst({
                cacheName: "static-fonts",
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 1000,
                        maxAgeSeconds: 365 * 24 * 60 * 60
                    })
                ]
            })
        },
        ...defaultCache
    ],
    fallbacks: {
        entries: [
            {
                url: "/offline",
                matcher({ request }) {
                    return request.mode === "navigate";
                }
            }
        ]
    }
});

serwist.addEventListeners();

self.addEventListener("push", (event) => {
    if (event.data) {
        const data = event.data.json();

        const title = data.title || "Nowe powiadomienie";
        const options: NotificationOptions = {
            body: data.body,
            icon: "/android/android-launchericon-192-192.png",
            badge: "/android/android-launchericon-72-72.png",
            data: {
                url: data.url || "/"
            }
        };

        event.waitUntil(self.registration.showNotification(title, options));
    }
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    const url = event.notification.data?.url || "/";
    event.waitUntil(
        self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url === url && "focus" in client) {
                    return client.focus();
                }
            }
            if (self.clients.openWindow) {
                return self.clients.openWindow(url);
            }
        })
    );
});
