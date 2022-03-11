import { User } from "./User";
import { UserRole } from "./UserRole";

export interface UserDraw {
  id: number;
  draw_id: number;
  role: UserRole;
  created_at: string;
  updated_at: string;
  user: User;
}
