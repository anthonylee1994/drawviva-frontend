import create from "zustand";
import { useDrawsStore } from "./useDrawsStore";
import { drawItemAPI, DrawItemParams } from "api/drawItem";
import { DrawItem } from "types/DrawItem";

interface DrawItemsState {
  luckyPickedItem: DrawItem | null;
  luckyPicking: boolean;
  isEditing: boolean;
  clearPickedItem: () => void;
  luckyPick: (drawId: number) => Promise<void>;
  createDrawItem: (drawId: number, params: DrawItemParams) => Promise<void>;
  editDrawItem: (params: DrawItemParams) => Promise<void>;
  deleteDrawItem: (id: number) => Promise<void>;
}

export const useDrawItemsStore = create<DrawItemsState>((set) => ({
  luckyPickedItem: null,
  luckyPicking: false,
  isEditing: false,

  clearPickedItem: () => set({ luckyPickedItem: null }),

  async luckyPick(drawId) {
    set({ luckyPicking: true, luckyPickedItem: null });
    const drawItem = await drawItemAPI.luckyPick(drawId);
    set({ luckyPickedItem: drawItem, luckyPicking: false });
  },

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
