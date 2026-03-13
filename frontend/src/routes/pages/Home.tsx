import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  Disc,
  Frown,
  Funnel,
  Grip,
  LayoutGrid,
  List,
  Megaphone,
  X,
} from "lucide-react";
import { useFilterStore } from "../../store/filterStore";
import { useInfiniteQueryHook } from "../../hook/useQueryHook";
import Loading from "../../components/Loading";
import FilterForm from "../../components/FilterForm";
import ContentItem from "../../components/ContentItem";
import { Link } from "react-router";
import { useItemStateStore } from "../../store/itemStateStore";
import SearchInput from "../../components/SearchInput";

export default function Home() {
  const itemState = useItemStateStore((state) => state.itemState);
  const toggleItemState = useItemStateStore((state) => state.toggleItemState);

  const [toggleFilterForm, setToggleFilterForm] = useState(false);
  const [hubMenu, setHubMenu] = useState(false);

  const filterState = useFilterStore((state) => state.filterState);

  const [applyFilter, setApplyFilter] = useState(filterState);
  const [loadedCount, setLoadedCount] = useState(0);

  const handleActiveFilterForm = () => {
    setToggleFilterForm((toggleFilterForm) => !toggleFilterForm);
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

  const handleMoveTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-100 bg-white flex justify-center items-center overflow-hidden">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <FilterForm
        handleApplyFilter={handleApplyFilter}
        handleActiveFilterForm={handleActiveFilterForm}
        toggleFilterForm={toggleFilterForm}
      />

      <div className="fullScreen -mx-4 sm:-mx-5 lg:-mx-6 px-4 sm:px-5 lg:px-6 sticky top-0 z-20 bg-white pt-2.5 pb-5 flex justify-center">
        <div className="w-[50%]">
          <SearchInput />
        </div>
      </div>

      <div className="fullScreen -mx-4 sm:-mx-5 lg:-mx-6 px-4 sm:px-5 lg:px-6 sticky top-18 lg:top-19 z-10 bg-white pb-5 border-b border-[#e0e0e0]">
        <div className="pt-5 flex justify-between items-center">
          <div>
            <button
              onClick={handleActiveFilterForm}
              className="p-1 cursor-pointer bg-white"
            >
              <Funnel className="w-5 lg:w-6 h-5 lg:h-6" />
            </button>
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={() => toggleItemState("grid")}
              className="p-1 cursor-pointer bg-white"
            >
              <LayoutGrid
                className={`w-5 lg:w-6 h-5 lg:h-6 ${
                  itemState === "grid" ? "text-[#606060]" : "text-[#e0e0e0]"
                }`}
              />
            </button>
            <button
              onClick={() => toggleItemState("list")}
              className="p-1 cursor-pointer bg-white"
            >
              <List
                className={`w-5 lg:w-6 h-5 lg:h-6 ${
                  itemState === "list" ? "text-[#606060]" : "text-[#e0e0e0]"
                }`}
              />
            </button>
          </div>
        </div>
        <p className="mt-5 text-right">
          검색결과: <strong>{data?.pages[0].total}</strong>
        </p>
      </div>

      <div className="col-span-full sm:col-[2/8] lg:col-[3/11] min-h-[calc(100vh-430px)] pt-5 pb-10">
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

      <article
        className={`rounded-[10px] border border-[#e0e0e0] bg-white shadow-[0_2px_4px_rgba(96,96,96,0.25)] fixed right-5 bottom-36.5 transition-[translate,opacity] duration-500 ease-in-out p-5
    ${hubMenu ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}`}
      >
        <h3 className="subHeadingTitle font-bold border-b border-[#e0e0e0] mb-2.5">
          MENU
        </h3>
        <ul>
          <li className="py-1">
            <div className="w-full h-full flex items-center gap-2.5">
              <img
                src="/icons/charm.webp"
                alt="호석"
                className="w-5 lg:w-6 h-5 lg:h-6"
              />
              <div className="flex flex-col relative w-full">
                <p className="text-sm lg:text-base font-bold">호석</p>
                <span className="text-xs lg:text-sm">호석 등급 & 검증</span>
                <span className="absolute top-0 right-0 text-xs p-1 border border-[#e0e0e0] rounded-[10px] bg-white">
                  개발 중
                </span>
              </div>
            </div>
          </li>
          <li className="py-1">
            <Link
              to={"/report"}
              className="w-full h-full flex items-center gap-2.5"
            >
              <Megaphone className="w-5 lg:w-6 h-5 lg:h-6" />
              <div className="flex flex-col">
                <p className="text-sm lg:text-base font-bold">제보</p>
                <span className="text-xs lg:text-sm">
                  오류 제보 & 정보 제보
                </span>
              </div>
            </Link>
          </li>
          <li className="py-1">
            <Link
              to={"/roulette"}
              className="w-full h-full flex items-center gap-2.5"
            >
              <Disc className="w-5 lg:w-6 h-5 lg:h-6" />
              <div className="flex flex-col">
                <p className="text-sm lg:text-base font-bold">룰렛</p>
                <span className="text-xs lg:text-sm">팀 생성 & 룰렛</span>
              </div>
            </Link>
          </li>
        </ul>
      </article>

      <ul className="fixed bottom-5 right-5 flex flex-col gap-2.5">
        <li>
          <button
            onClick={() => setHubMenu((hubMenu) => !hubMenu)}
            className="w-12 cursor-pointer p-2.5 rounded-[10px] border border-[#e0e0e0] bg-white aspect-square shadow-[0_2px_4px_rgba(96,96,96,0.25)] flex justify-center items-center"
          >
            {hubMenu ? (
              <X className="w-5 lg:w-5 h-5 lg:h-6" />
            ) : (
              <Grip className="w-5 lg:w-5 h-5 lg:h-6" />
            )}
          </button>
        </li>
        <li>
          <button
            onClick={handleMoveTop}
            className="w-12 cursor-pointer p-2.5 rounded-[10px] border border-[#e0e0e0] bg-white aspect-square text-sm font-bold shadow-[0_2px_4px_rgba(96,96,96,0.25)]"
          >
            Top
          </button>
        </li>
      </ul>
    </>
  );
}
