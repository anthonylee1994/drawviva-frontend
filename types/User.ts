import { Draw } from "./Draw";
import { PushNotificationSubscription } from "./PushNotificationSubscription";
import { UserDraw } from "./UserDraw";

export interface User {
  id: number;
  display_name: string;
  email: string;
  photo_url: string;
  created_at: string;
  updated_at: string;
  push_notification_subscription: PushNotificationSubscription;
  draws: Draw[];
  admin_draws: Draw[];
  participant_draws: Draw[];
}
