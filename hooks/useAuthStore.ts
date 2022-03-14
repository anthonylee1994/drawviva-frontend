import create from "zustand";
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { firebaseApp } from "config/firebaseConfig";
import { authAPI } from "api/auth";
import { User } from "types/User";
import { userAPI } from "api/user";

interface AuthState {
  isLoading: boolean;
  currentUser: User | null;
  login: () => void;
  logout: () => void;
  verifyAuth: () => void;
  updatePushNotificationSubscription: () => void;
  fetchPushNotificationSubscription: () => Promise<PushSubscription | null>;
}

const auth: Auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoading: false,
  currentUser: null,

  async login() {
    try {
      set({ isLoading: true });
      const { updatePushNotificationSubscription } = get();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const user = await authAPI.login(token);
      set({ currentUser: user });
      await updatePushNotificationSubscription();
      set({ isLoading: false });
    } catch (e) {
      set({ isLoading: false });
    }
  },

  async verifyAuth() {
    if (!localStorage.getItem("token")) {
      return;
    }

    const user = await authAPI.fetchMe();
    if (user) {
      set({ currentUser: user });
    }
  },

  async logout() {
    set({ isLoading: true });
    await auth.signOut();
    localStorage.removeItem("token");
    set({ currentUser: null, isLoading: false });
  },

  async updatePushNotificationSubscription() {
    const { fetchPushNotificationSubscription, currentUser } = get();
    const subscription = await fetchPushNotificationSubscription();

    if (subscription && currentUser !== null) {
      const subscriptionJSON = subscription.toJSON();
      userAPI.updateUser({
        push_notification_subscription_attributes: {
          endpoint: subscriptionJSON.endpoint,
          auth: subscriptionJSON.keys?.auth,
          p256dh: subscriptionJSON.keys?.p256dh,
        },
      });
    }
  },

  async fetchPushNotificationSubscription() {
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
  },
}));
