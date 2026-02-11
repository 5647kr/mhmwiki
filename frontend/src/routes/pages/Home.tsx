import { useEffect, useState } from "react";
import FilterForm from "../../components/FilterForm";
import SearchForm from "../../components/SearchForm";
import { useFilterStore } from "../../store/filterStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import fetchData from "../../api/fetchData";
import { useInView } from "react-intersection-observer";
import { GridContentCard, ListContentCard } from "../../components/ContentCard";
import { Link } from "react-router";
import { useCardStateStore } from "../../store/gridStateStore";

export default function Home() {
  const [activeFilterForm, setActiveFilterForm] = useState(false);

  const filterState = useFilterStore((state) => state.filterState);
  const [applyFilter, setApplyFilter] = useState(filterState);

  const handleActiveFilterForm = () => {
    setActiveFilterForm((activeFilterForm) => !activeFilterForm);
  };

  const handleApplyFilter = () => {
    handleActiveFilterForm();
    setApplyFilter(filterState);
  };

  const cardState = useCardStateStore((state) => state.cardState);

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["contentData", applyFilter],
    queryFn: ({ pageParam }) =>
      fetchData({ path: "monster", page: pageParam, filter: applyFilter }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.length * 20;
      return loadedItems < lastPage.totalCount
        ? allPages.length + 1
        : undefined;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
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

  // 무한 스크롤 기능 구현
  const [ref, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const content = data?.pages.flatMap((page) => page.items) || [];

  return (
    <>
      <SearchForm
        activeFilterForm={activeFilterForm}
        handleActiveFilterForm={handleActiveFilterForm}
        applyFilter={applyFilter}
      />
      {activeFilterForm && <FilterForm handleApplyFilter={handleApplyFilter} />}

      <div className="col-span-full sm:col-[2/8] md:col-[3/11] py-5">
        <strong className="text-right block">
          검색결과: {data?.pages[0].total}
        </strong>
      </div>

      <div className="col-span-full sm:col-[2/8] md:col-[3/11] py-10">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
          {content.map((item) =>
            cardState ? (
              <li
                key={item.id}
                className="border border-[#e0e0e0] shadow-[0_2px_4px_rgba(96,96,96,0.25)] w-full aspect-[1/1.3] rounded-sm overflow-hidden"
              >
                <Link to={`/detail/${item.id}`} className="block h-full w-full">
                  <GridContentCard applyFilter={applyFilter.series} {...item} />
                </Link>
              </li>
            ) : (
              <li
                key={item.id}
                className="border border-[#e0e0e0] shadow-[0_2px_4px_rgba(96,96,96,0.25)] w-full rounded-sm overflow-hidden"
              >
                <Link to={`/detail/${item.id}`} className="block h-full w-full">
                  <ListContentCard {...item} />
                </Link>
              </li>
            )
          )}
        </ul>

        {hasNextPage && (
          <div
            ref={ref}
            className="h-10 w-full flex justify-center items-center"
          >
            {isFetchingNextPage ? "Loading more..." : ""}
          </div>
        )}
      </div>
    </>
  );
}
