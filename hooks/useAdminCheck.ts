import { useRouter } from "next/router";
import { useDrawsStore } from "./useDrawsStore";

export const useAdminCheck = () => {
  const {
    query: { id },
  } = useRouter();
  const draw = useDrawsStore((state) => state.findDrawById(Number(id)));
  return draw?.user_draw.role === "admin";
};
