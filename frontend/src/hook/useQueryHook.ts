import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchContent, fetchContentItem } from "../api/fetchContent";

export function useInfiniteQueryHook(filterState: {
  series: string[];
  type: string[];
  weak: string[];
}) {
  return useInfiniteQuery({
    queryKey: ["content", filterState],
    queryFn: ({ pageParam }) => {
      return fetchContent({
        page: pageParam,
        pageNum: 20,
        filterState: filterState,
      });
    },
    initialPageParam: 1,

    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}

export function useQueryHook({
  id,
  contentLength,
  enabled,
}: {
  id?: string;
  contentLength?: number;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: ["content", "random"],
    queryFn: () => {
      return fetchContentItem({
        id: id,
        contentLength: contentLength,
      });
    },
    enabled: enabled,
    staleTime: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
