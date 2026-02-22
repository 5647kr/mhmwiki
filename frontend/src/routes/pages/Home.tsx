import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Frown } from "lucide-react";
import { useFilterStore } from "../../store/filterStore";
import { useInfiniteQueryHook } from "../../hook/useQueryHook";
import SearchForm from "../../components/SearchForm";
import Loading from "../../components/Loading";
import FilterForm from "../../components/FilterForm";
import ContentItem from "../../components/ContentItem";

export default function Home() {
  const filterState = useFilterStore((state) => state.filterState);

  const [activeFilterForm, setActiveFilterForm] = useState(false);
  const [applyFilter, setApplyFilter] = useState(filterState);
  const [loadedCount, setLoadedCount] = useState(0);

  const handleActiveFilterForm = () => {
    setActiveFilterForm((activeFilterForm) => !activeFilterForm);
  };

  const handleApplyFilter = () => {
    handleActiveFilterForm();
    setApplyFilter(filterState);
  };

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

  useEffect(() => {
    setLoadedCount(0);
  }, [applyFilter, content]);

  const handleLoadedCount = () => {
    setLoadedCount((prev) => prev + 1);
  };

  const allLoaded = content.length > 0 && loadedCount >= content.length;

  if (isLoading) {
    return (
      <div className="col-span-full min-h-[calc(100vh-213px)] flex justify-center items-center">
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

      <FilterForm
        handleApplyFilter={handleApplyFilter}
        activeFilterForm={activeFilterForm}
      />

      <div className="col-span-full sm:col-[2/8] lg:col-[3/11] py-10 text-right">
        <p>
          검색결과: <strong>{data?.pages[0].total}</strong>
        </p>
      </div>

      <div className="col-span-full sm:col-[2/8] lg:col-[3/11] min-h-[calc(100vh-404px)]">
        {content && content.length > 0 ? (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
            {content.map((item) => (
              <ContentItem
                key={item.id}
                item={item}
                applyFilter={applyFilter}
                handleLoadedCount={handleLoadedCount}
              />
            ))}
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
            {isFetchingNextPage && !allLoaded && <Loading />}
          </div>
        )}
      </div>
    </>
  );
}
