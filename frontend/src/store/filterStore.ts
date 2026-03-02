import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface filterDataStore {  
  filterState: { series: string[]; type: string[]; weak: string[] };
  setFilterState: (
    key: keyof filterDataStore["filterState"],
    value: string
  ) => void;
  filterReset: () => void;
}

export const useFilterStore = create<filterDataStore>()(
  persist(
    (set) => ({
      filterState: { series: [], type: [], weak: [] },

      setFilterState: (key, value) => {
        set((state) => {
          const currentState: string[] = state.filterState[key];
          const isChecked = currentState.includes(value);

          return {
            filterState: {
              ...state.filterState,
              [key]: isChecked
                ? currentState.filter((item) => item !== value)
                : [...currentState, value],
            },
          };
        });
      },

      filterReset: () => {
        set({ filterState: { series: [], type: [], weak: [] } });
      },
    }),
    {
      name: "filterStorage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
