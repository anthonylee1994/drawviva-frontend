import create from "zustand";
import { useDrawsStore } from "./useDrawsStore";
import { userDrawAPI, UserDrawParams } from "api/userDraw";
import { UserRole } from "types/UserRole";

interface UserDrawsState {
  isEditing: boolean;
  createUserDraw: (params: UserDrawParams) => Promise<void>;
  editUserDraw: (params: UserDrawParams) => Promise<void>;
  deleteUserDraw: (drawId: number, id: number) => Promise<void>;
}

export const useUserDrawsStore = create<UserDrawsState>((set) => ({
  isEditing: false,

  async createUserDraw(params) {
    set({ isEditing: true });
    const userDraw = await userDrawAPI.createUserDraw(params);

    const draw = useDrawsStore.getState().findDrawById(Number(params.draw_id));

    useDrawsStore.getState().setDraw({
      id: params.draw_id,
      user_draws: [...(draw?.user_draws ?? []), userDraw],
    });

    set({ isEditing: false });
  },

  async editUserDraw(params) {
    set({ isEditing: true });
    await userDrawAPI.updateUserDraw(params);

    useDrawsStore.setState((state) => {
      const drawId = state.draws.findIndex(
        (draw) => draw.id === Number(params.draw_id)
      );
      const userDrawId = state.draws[drawId]?.user_draws?.findIndex(
        (userDraw) => userDraw.id === Number(params.id)
      );

      if (state.draws[drawId]?.user_draws?.[userDrawId]?.role) {
        state.draws[drawId].user_draws[userDrawId].role =
          params.role as UserRole;
      }
    });

    set({ isEditing: false });
  },

  async deleteUserDraw(drawId, id) {
    set({ isEditing: true });
    await userDrawAPI.deleteUserDraw(id);

    const draw = useDrawsStore.getState().findDrawById(drawId);

    useDrawsStore.getState().setDraw({
      id: drawId,
      user_draws: draw?.user_draws.filter((userDraw) => userDraw.id !== id),
    });

    set({ isEditing: false });
  },
}));
