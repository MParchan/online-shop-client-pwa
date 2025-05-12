self.addEventListener("push", function (event) {
    if (event.data) {
        const data = event.data.json();

        const title = data.title || "Notifications";
        const options = {
            body: data.body,
            icon: "android/android-launchericon-192-192.png",
            badge: "android/android-launchericon-72-72.png",
            data: {
                url: data.url || "/"
            }
        };

        event.waitUntil(self.registration.showNotification(title, options));
    }
});

self.addEventListener("notificationclick", function (event) {
    event.notification.close();

    const url = event.notification.data?.url || "/";
    event.waitUntil(
        self.clients.matchAll({ type: "window" }).then((clientList) => {
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
