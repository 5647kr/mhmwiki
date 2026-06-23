import {
  useInfiniteQuery,
  useQuery,
  type QueryKey,
} from "@tanstack/react-query";
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

export function useQueryHook<T extends QueryKey>({
  key,
  id,
  contentLength,
  enabled,
  search,
}: {
  key: T;
  id?: string;
  contentLength?: number;
  enabled?: boolean;
  search?: string;
}) {
  return useQuery({
    queryKey: key,
    queryFn: () => {
      return fetchContentItem({
        id: id,
        contentLength: contentLength,
        search: search,
      });
    },
    enabled: enabled,
    staleTime: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
