import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface filterDataStore {
  filterData: { series: Series[]; type: Type[]; weak: Weak[] };
  fetchFilterData: () => Promise<void>;
}

export const useFilterStore = create<filterDataStore>()(
  persist(
    (set) => ({
      filterData: { series: [], type: [], weak: [] },

      fetchFilterData: async () => {
        try {
          const response = await fetch("/db.json");

          if (!response.ok) {
            throw new Error("filterData fetch failed");
          }

          const { series, type, weak } = await response.json();
          console.log("store에서 fetch 실행")

          set({ filterData: { series, type, weak } });
        } catch (error) {
          console.error(error);
        }
      },
    }),
    {
      name: "filterStorage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
