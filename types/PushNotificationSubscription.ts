import { User } from "firebase/auth";

export interface PushNotificationSubscription {
  id: number;
  auth: string;
  endpoint: string;
  p256dh: string;
  created_at: string;
  updated_at: string;
  user: User;
}
