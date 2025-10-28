import { create } from "zustand";
import { Article, Group } from "./mocks";
import type { Brief } from "./types";

interface AppState {
  groups: Group[];
  selectedArticle: Article | null;
  selectedBrief: Brief | null;
  isAuthenticated: boolean;
  setGroups: (groups: Group[]) => void;
  setSelectedArticle: (article: Article | null) => void;
  setSelectedBrief: (brief: Brief | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  groups: [],
  selectedArticle: null,
  selectedBrief: null,
  isAuthenticated: false,
  setGroups: (groups) => set({ groups }),
  setSelectedArticle: (selectedArticle) => set({ selectedArticle }),
  setSelectedBrief: (selectedBrief) => set({ selectedBrief }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));