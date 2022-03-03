/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
self.addEventListener("push", function (event) {
  const data = event === null || event === void 0 ? void 0 : event.data.text();
  event === null || event === void 0 ? void 0 : event.waitUntil(self.registration.showNotification(data.title, {
    body: data.message
  }));
});
/******/ })()
;