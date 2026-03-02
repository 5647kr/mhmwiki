import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface gridStateStore {
  cardState: boolean;
  toggleCardState: () => void;
}

export const useCardStateStore = create<gridStateStore>()(
  persist(
    (set) => ({
      cardState: true,

      toggleCardState: () => set((state) => ({ cardState: !state.cardState })),
    }),
    {
      name: "cardStateStorage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
