import { create } from "zustand";
import { Article, Group } from "./mocks";
import type { BriefItem } from "./types";

interface AppState {
  groups: Group[];
  selectedArticle: Article | null;
  selectedBrief: BriefItem | null;
  selectedBriefView: 'core' | 'left' | 'right' | 'both';
  isAuthenticated: boolean;
  setGroups: (groups: Group[]) => void;
  setSelectedArticle: (article: Article | null) => void;
  setSelectedBrief: (brief: BriefItem | null) => void;
  setSelectedBriefView: (view: 'core' | 'left' | 'right' | 'both') => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  groups: [],
  selectedArticle: null,
  selectedBrief: null,
  selectedBriefView: 'core',
  isAuthenticated: false,
  setGroups: (groups) => set({ groups }),
  setSelectedArticle: (selectedArticle) => set({ selectedArticle }),
  setSelectedBrief: (selectedBrief) => set({ selectedBrief }),
  setSelectedBriefView: (selectedBriefView) => set({ selectedBriefView }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));