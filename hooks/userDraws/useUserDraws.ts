import { useDrawsStore } from "hooks/useDrawsStore";

export const useUserDraws = (drawId: number) => {
  return useDrawsStore((state) => state.findDrawById(drawId)?.user_draws ?? []);
};
