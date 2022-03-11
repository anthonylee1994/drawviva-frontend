self.addEventListener("push", function (event) {
  const data = JSON.parse(event?.data.text());
  console.log("data", data);
  event?.waitUntil(
    self.registration.showNotification(data?.title, {
      body: data?.message,
      vibrate: [200],
      icon: data?.icon_url || "/icon-192x192.png",
    })
  );
});

self.addEventListener(
  "notificationclick",
  function () {
    clients.openWindow("/");
  },
  false
);
