import { useDrawsStore } from "hooks/useDrawsStore";

export const useDrawItems = (drawId: number) => {
  return useDrawsStore((state) => state.findDrawById(drawId)?.draw_items ?? []);
};
