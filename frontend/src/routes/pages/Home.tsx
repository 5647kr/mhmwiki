import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";
import { useFilterStore } from "../../store/filterStore";
import { useCardStateStore } from "../../store/gridStateStore";
import { useInfiniteQueryHook } from "../../hook/useQueryHook";
import FilterForm from "../../components/FilterForm";
import SearchForm from "../../components/SearchForm";
import { GridContentCard, ListContentCard } from "../../components/ContentCard";
import { Frown } from "lucide-react";
import Loading from "../../components/Loading";

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

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteQueryHook({ applyFilter });

  // 무한 스크롤 기능 구현
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const content = data?.pages.flatMap((page) => page.items) || [];


  if (isLoading) {
    return (
      <div className="col-span-full min-h-[calc(100vh-176px)] flex justify-center items-center">
        <Loading />
      </div>
    );
  }

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

      <div className="col-span-full sm:col-[2/8] md:col-[3/11] min-h-[calc(100vh-347px)] pt-10">
        {content && content.length > 0 ? (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
            {content.map((item) =>
              cardState ? (
                <li
                  key={item.id}
                  className="border border-[#e0e0e0] shadow-[0_2px_4px_rgba(96,96,96,0.25)] w-full aspect-[1/1.3] rounded-sm overflow-hidden"
                >
                  <Link
                    to={`/detail/${item.id}`}
                    className="block h-full w-full"
                  >
                    <GridContentCard
                      applyFilter={applyFilter.series}
                      {...item}
                    />
                  </Link>
                </li>
              ) : (
                <li
                  key={item.id}
                  className="border border-[#e0e0e0] shadow-[0_2px_4px_rgba(96,96,96,0.25)] w-full rounded-sm overflow-hidden"
                >
                  <Link
                    to={`/detail/${item.id}`}
                    className="block h-full w-full"
                  >
                    <ListContentCard {...item} />
                  </Link>
                </li>
              )
            )}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center gap-10 h-full">
            <Frown size={100} className="text-[#E63946]" />
            <strong className="text-[#E63946] font-bold text-lg">
              해당하는 몬스터가 없습니다.
            </strong>
          </div>
        )}

        {hasNextPage && (
          <div ref={ref} className="h-10 w-full">
            {isFetchingNextPage && <Loading />}
          </div>
        )}
      </div>
    </>
  );
}
