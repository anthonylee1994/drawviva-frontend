self.addEventListener("push", function (event) {
  const data = event?.data.text();
  event?.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.message,
    })
  );
});
