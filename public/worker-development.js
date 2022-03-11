/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
self.addEventListener("push", function (event) {
  const data = JSON.parse(event === null || event === void 0 ? void 0 : event.data.text());
  console.log("data", data);
  event === null || event === void 0 ? void 0 : event.waitUntil(self.registration.showNotification(data === null || data === void 0 ? void 0 : data.title, {
    body: data === null || data === void 0 ? void 0 : data.message,
    vibrate: [200],
    icon: (data === null || data === void 0 ? void 0 : data.icon_url) || "/icon-192x192.png"
  }));
});
self.addEventListener("notificationclick", function () {
  clients.openWindow("/");
}, false);
/******/ })()
;