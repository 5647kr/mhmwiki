import { create } from "zustand";

interface FetchStore {
  type: Type[];
  series: Series[];
  weak: Weak[];
  isLoading: boolean;
  fetchData: (fetchData: string) => Promise<void>;
}

export const useFetchStore = create<FetchStore>((set) => ({
  type: [],
  series: [],
  weak: [],
  isLoading: false,

  fetchData: async (dataType: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`http://localhost:3000/${dataType}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch ${dataType}: ${response.statusText}`);
      }

      const data = await response.json();

      set((state) => ({
        ...state,
        [dataType]: data,
      }));
    } catch (error) {
      console.error(`Error fetching ${dataType}:`, error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
