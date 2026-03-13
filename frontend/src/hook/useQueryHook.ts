import {
  useInfiniteQuery,
  useQuery,
  type QueryKey,
} from "@tanstack/react-query";
import fetchData from "../api/fetchData";

function useQueryHook<T extends QueryKey>({
  key,
  path,
  search,
  enabled,
  selectSeriesId,
}: {
  key: T;
  path: string;
  search?: string;
  enabled?: boolean;
  selectSeriesId?: string;
}) {
  return useQuery({
    queryKey: key,
    queryFn: () =>
      fetchData({ path: path, search: search, selectSeriesId: selectSeriesId }),
    // staleTime: 1000 * 60 * 5,
    enabled,
  });
}

function useInfiniteQueryHook({
  applyFilter,
}: {
  applyFilter: {
    series: string[];
    type: string[];
    weak: string[];
  };
}) {
  return useInfiniteQuery({
    queryKey: ["contentData", applyFilter],
    queryFn: ({ pageParam }) =>
      fetchData({ path: "monster", page: pageParam, filter: applyFilter }),
    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flatMap((page) => page.items).length;
      return totalLoaded < lastPage.totalCount
        ? allPages.length + 1
        : undefined;
    },
    staleTime: 1000 * 60 * 5,
    select: (data) => ({
      pages: data.pages.map((page) => ({
        total: page.totalCount,
        items: page.items.map((item: CardContent) => ({
          id: item.id,
          icon: item.icon,
          name: item.name,
          title: item.title,
          titleId: item.titleId,
          type: item.type,
          color: item.color,
        })),
      })),
      pageParams: data.pageParams,
    }),
  });
}

export { useQueryHook, useInfiniteQueryHook };
