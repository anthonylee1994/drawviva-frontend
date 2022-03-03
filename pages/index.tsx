import React from "react";

const Home = React.memo(() => {
  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      console.log("Service Worker is supported");

      navigator.serviceWorker
        .register("/sw.js", { scope: "./" })
        .then(function (registration) {
          return registration.pushManager
            .getSubscription()
            .then(function (subscription) {
              if (subscription) {
                return subscription;
              }
              return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey:
                  "BC6bds1rCwjZyseaYhoV1VJepx-HJ2KCu0XyU0RaBmwlhp17mJ0UWKtsda-Q56yKSKA5iW_lVa3wOAaWe0coiSw",
              });
            });
        })
        .then(function (subscription) {
          console.log("subscription", subscription);
        });
    }
  }, []);

  return <div>AAA BBB</div>;
});

export default Home;
