import { useEffect, useState } from "react";
import FilterForm from "../../components/FilterForm";
import SearchForm from "../../components/SearchForm";
import { useFilterStore } from "../../store/filterStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import fetchData from "../../api/fetchData";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [activeFilterForm, setActiveFilterForm] = useState(false);

  const filterState = useFilterStore((state) => state.filterState);
  const [applyFilter, setApplyFilter] = useState(filterState);

  const handleActiveFilterForm = () => {
    setActiveFilterForm((activeFilterForm) => !activeFilterForm);
  };

  const handleApplyFilter = () => {
    setApplyFilter(filterState);
    handleActiveFilterForm();
  };

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["contentData", applyFilter],
      queryFn: ({ pageParam }) =>
        fetchData({ path: "monster", page: pageParam, filter: applyFilter }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length < 20 ? undefined : allPages.length + 1,
      select: (data) => ({
        pages: data.pages.map((page) => ({
          items: page.map((item: CardContent) => ({
            id: item.id,
            icon: item.icon,
            name: item.name,
            title: item.title,
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
      />
      {activeFilterForm && <FilterForm handleApplyFilter={handleApplyFilter} />}

      <div className="col-span-full sm:col-[2/8] md:col-[3/11] inset-shadow-[0_0_10px_hotpink]">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
          {content.map((item) => (
            <li
              className="aspect-[1/1.3] inset-shadow-[0_0_10px_red]"
              key={item.id}
            >
              {item.name}
            </li>
          ))}
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
