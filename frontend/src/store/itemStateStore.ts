import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface itemState {
  itemState: "grid" | "list";
  toggleItemState: (itemState: "grid" | "list") => void;
}

export const useItemStateStore = create<itemState>()(
  persist(
    (set) => ({
      itemState: "grid",

      toggleItemState: (itemState) => set(() => ({ itemState: itemState })),
    }),
    {
      name: "itemStateStorage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
