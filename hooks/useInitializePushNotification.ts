import React from "react";

export const useInitializePushNotification = () => {
  const getSubscription =
    React.useCallback(async (): Promise<PushSubscription | null> => {
      if (!("serviceWorker" in navigator)) {
        return null;
      }

      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "./",
      });

      let subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        return subscription;
      }

      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.WEBPUSH_PUBLIC_KEY,
      });

      return subscription;
    }, []);

  const initialize = React.useCallback(async () => {
    const subscription = await getSubscription();
    console.log("subscription", subscription);
  }, [getSubscription]);

  React.useEffect(() => {
    initialize();
  }, [initialize]);
};
