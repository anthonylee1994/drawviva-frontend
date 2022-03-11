import create from "zustand";
import { useDrawsStore } from "./useDrawsStore";
import { userDrawAPI, UserDrawParams } from "api/userDraw";

interface UserDrawsState {
  isEditing: boolean;
  createUserDraw: (params: UserDrawParams) => Promise<void>;
  editUserDraw: (params: UserDrawParams) => Promise<void>;
  deleteUserDraw: (id: number) => Promise<void>;
}

export const useUserDrawsStore = create<UserDrawsState>((set) => ({
  isEditing: false,

  async createUserDraw(params) {
    set({ isEditing: true });
    await userDrawAPI.createUserDraw(params);
    await useDrawsStore.getState().fetchDraws();
    set({ isEditing: false });
  },

  async editUserDraw(params) {
    set({ isEditing: true });
    await userDrawAPI.updateUserDraw(params);
    await useDrawsStore.getState().fetchDraws();
    set({ isEditing: false });
  },

  async deleteUserDraw(id) {
    set({ isEditing: true });
    await userDrawAPI.deleteUserDraw(id);
    await useDrawsStore.getState().fetchDraws();
    set({ isEditing: false });
  },
}));
