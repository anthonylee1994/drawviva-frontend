import { DrawItem } from "./DrawItem";
import { User } from "./User";
import { UserDraw } from "./UserDraw";

export interface Draw {
  id: number;
  image_url: string;
  name: string;
  created_at: string;
  updated_at: string;
  draw_items: DrawItem[];
  user_draw: UserDraw;
  user_draws: UserDraw[];
}
