import { drawAPI, DrawParams } from "api/draw";
import { Draw } from "types/Draw";
import create from "zustand";

interface DrawsState {
  fetched: boolean;
  draws: Draw[];
  isLoading: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  findDrawById: (id: number) => Draw | undefined;
  setDraw: (draw: Partial<Draw>) => void;
  fetchDraws: () => Promise<void>;
  createDraw: (params: DrawParams) => Promise<void>;
  editDraw: (params: DrawParams) => Promise<void>;
  deleteDraw: (id: number) => Promise<void>;
}

export const useDrawsStore = create<DrawsState>((set, get) => ({
  draws: [],
  fetched: false,
  isLoading: false,
  isEditing: false,
  isDeleting: false,

  findDrawById: (id: number) => {
    return get().draws.find((draw) => draw.id === id);
  },

  async fetchDraws() {
    set({ isLoading: true });
    const draws = await drawAPI.fetchDraws();
    set({ draws, isLoading: false, fetched: true });
  },

  async createDraw(params) {
    set({ isEditing: true });
    const draw = await drawAPI.createDraw(params);
    set((state) => {
      state.isEditing = false;
      state.draws = [draw, ...state.draws];
    });
  },

  async editDraw(params) {
    const { setDraw } = get();
    set({ isEditing: true });
    await drawAPI.updateDraw(params);

    setDraw(params);
    set({ isEditing: false });
  },

  async deleteDraw(id: number) {
    set({ isDeleting: true });
    await drawAPI.deleteDraw(id);

    set((state) => {
      state.isDeleting = false;
      state.draws = state.draws.filter((draw) => draw.id !== id);
    });
  },

  setDraw(draw) {
    set((state) => {
      const drawIndex = state.draws.findIndex((_) => _.id === draw.id);
      if (state.draws[drawIndex]) {
        state.draws[drawIndex] = { ...state.draws[drawIndex], ...draw };
      }
    });
  },
}));
