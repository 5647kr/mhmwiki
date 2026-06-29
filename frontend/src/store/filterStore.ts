import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface filterStore {
  filterState: { series: string[]; type: string[]; weak: string[] };
  isActive: boolean;
  setFilterState: (
    key: keyof filterStore["filterState"],
    value: string,
  ) => void;
  filterReset: (key: keyof filterStore["filterState"]) => void;
  handleActive: () => void;
}

export const useFilterStore = create<filterStore>()(
  persist(
    (set) => ({
      filterState: { series: [], type: [], weak: [] },
      isActive: true,

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

      filterReset: (key) => {
        set((state) => ({
          filterState: {
            ...state.filterState,
            [key]: [],
          },
        }));
      },

      handleActive: () => {
        set((state) => ({
          isActive: !state.isActive,
        }));
      },
    }),
    {
      name: "filterStorage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
