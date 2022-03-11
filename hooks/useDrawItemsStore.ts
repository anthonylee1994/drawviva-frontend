import create from "zustand";
import { useDrawsStore } from "./useDrawsStore";
import { drawItemAPI, DrawItemParams } from "api/drawItem";

interface DrawItemsState {
  isEditing: boolean;
  createDrawItem: (drawId: number, params: DrawItemParams) => Promise<void>;
  editDrawItem: (params: DrawItemParams) => Promise<void>;
  deleteDrawItem: (id: number) => Promise<void>;
}

export const useDrawItemsStore = create<DrawItemsState>((set) => ({
  isEditing: false,

  async createDrawItem(drawId, params) {
    set({ isEditing: true });
    await drawItemAPI.createDrawItem(drawId, params);
    await useDrawsStore.getState().fetchDraws();
    set({ isEditing: false });
  },

  async editDrawItem(params) {
    set({ isEditing: true });
    await drawItemAPI.updateDrawItem(params);
    await useDrawsStore.getState().fetchDraws();
    set({ isEditing: false });
  },

  async deleteDrawItem(id) {
    set({ isEditing: true });
    await drawItemAPI.deleteDrawItem(id);
    await useDrawsStore.getState().fetchDraws();
    set({ isEditing: false });
  },
}));
