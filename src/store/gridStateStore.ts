import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface gridStateStore {
  gridState: boolean;
  toggleState: () => void;
}

export const useGridStateStore = create<gridStateStore>()(
  persist(
    (set) => ({
      gridState: true,

      toggleState: () => set((state) => ({ gridState: !state.gridState })),
    }),
    {
      name: "gridStateStorage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
