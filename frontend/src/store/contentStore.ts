import { create } from "zustand";

interface ContentStore {
  contentData: Content[];
  fetchContentData: () => Promise<void>;
}

export const useContentStore = create<ContentStore>((set, get) => ({
  contentData: [],

  fetchContentData: async () => {
    if (get().contentData.length > 0) return;

    try {
      const response = await fetch("/db.json");

      if (!response.ok) {
        throw new Error("contentData fetch failed");
      }

      const { monster } = await response.json();
      console.log("store에서 content 데이터 fetch함");

      set({ contentData: monster });
    } catch (error) {
      console.error(error);
    }
  },

  // 상세페이지용 데이터 하나만 가져오기
  // getContentById: (id: string | number) => {
  //   return get().contentData.find((item) => String(item.id) === String(id));
  // },
}));
