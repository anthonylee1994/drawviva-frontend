import { UserDraw } from "types/UserDraw";
import { useAuthStore } from "hooks/useAuthStore";
import { useDrawsStore } from "hooks/useDrawsStore";

export const useChangeRoleForbiddenCheck = (userDraw?: UserDraw) => {
  const currentUser = useAuthStore((state) => state.currentUser);

  const userDraws = useDrawsStore((state) =>
    userDraw ? state.findDrawById(userDraw.draw_id)?.user_draws ?? [] : []
  );

  const hasSingleAdmin =
    userDraws.filter((userDraw) => userDraw.role === "admin").length === 1;

  const iamAdmin = userDraws.some(
    (userDraw) =>
      userDraw.role === "admin" && userDraw.user.id === currentUser?.id
  );

  return (
    userDraw?.role === "admin" &&
    userDraw.user.id === currentUser?.id &&
    iamAdmin &&
    hasSingleAdmin
  );
};
