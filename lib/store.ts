import { create } from "zustand";
import { Article, Group } from "./mocks";

interface AppState {
  groups: Group[];
  selectedArticle: Article | null;
  isAuthenticated: boolean;
  setGroups: (groups: Group[]) => void;
  setSelectedArticle: (article: Article | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  groups: [],
  selectedArticle: null,
  isAuthenticated: false,
  setGroups: (groups) => set({ groups }),
  setSelectedArticle: (selectedArticle) => set({ selectedArticle }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));