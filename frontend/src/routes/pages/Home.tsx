import { ArrowRight, Image, RotateCw } from "lucide-react";
import { Link } from "react-router";
import FilterForm from "../../components/FilterForm";
import { useFetchStore } from "../../store/fetchStore";
import { useInfiniteQueryHook, useQueryHook } from "../../hook/useQueryHook";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import { useFilterStore } from "../../store/filterStore";
import Skeleton from "../../components/Skeleton";

export default function Home() {
  const series = useFetchStore((state) => state.series);
  const type = useFetchStore((state) => state.type);
  const filterState = useFilterStore((state) => state.filterState);
  const [isRotating, setIsRotating] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQueryHook(filterState);

  const content = data?.pages.flatMap((page) => page.data || []) || [];
  const contentLength = data?.pages.flatMap((page) => page.totalCount);

  const {
    data: randomItem,
    refetch,
    isFetching,
  } = useQueryHook({
    key: ["content", "random"],
    contentLength: contentLength?.[0],
    enabled: !!contentLength,
  });

  const handleRefresh = () => {
    setIsRotating(true);
    refetch();
    // 0.5초(500ms) 후에 회전 상태를 꺼서 애니메이션 초기화
    setTimeout(() => setIsRotating(false), 500);
  };

  const todayItem = randomItem?.[0];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    if (!hasNextPage) return;
    if (isFetchingNextPage) return;

    fetchNextPage();
  }, [inView]);

  return (
    <>
      <section className="px-4 md:px-5 lg:px-6 py-10 bg-(--black) flex flex-col lg:flex-row gap-10">
        <div className="w-full">
          <div className="text-(--red) flex items-center gap-2.5 pb-10">
            <hr className="w-full" />
            <h2 className="whitespace-nowrap small w-fit">
              MONSTER HUNTER MONSTER WIKI
            </h2>
            <hr className="w-full" />
          </div>

          <span className="text-[#444] small">2004 - 2026 ALL SERIES</span>

          <div className="pt-5 pb-7.5">
            <h3 className="syne font-black text-(--red) text-[80px] leading-13">
              MON
              <br />
              <span className="syne font-black text-(--grey)">STER</span>
              <br />
              <span className="syne font-black text-(--white)">WIKI</span>
            </h3>
          </div>

          <span className="small text-(--grey) leading-4 block">
            초대 몬스터 헌터부터 와일즈까지 역대 시리즈에 등장한
            <br /> 모든 대형 몬스터의 데이터베이스
          </span>

          <div className="mt-10">
            <ul className="flex gap-2 border border-(--dgrey)">
              <li className="w-full px-2.5 py-5 border-r border-(--dgrey)">
                <div>
                  <h4 className="syne font-black text-(--white) headingTitle">
                    247
                  </h4>
                  <p className="text-[#444] small">MONSTER</p>
                </div>
              </li>
              <li className="w-full px-2.5 py-5 border-r border-(--dgrey)">
                <div>
                  <h4 className="syne font-black text-(--white) headingTitle">
                    {series.length}
                  </h4>
                  <p className="text-[#444] small">TITLES</p>
                </div>
              </li>
              <li className="w-full px-2.5 py-5 border-r border-(--dgrey)">
                <div>
                  <h4 className="syne font-black text-(--white) headingTitle">
                    {2026 - 2004}
                    <span className="text-(--red) font-bold text-xl">YR</span>
                  </h4>
                  <p className="text-[#444] small">HISTORY</p>
                </div>
              </li>
              <li className="w-full px-2.5 py-5">
                <div>
                  <h4 className="syne font-black text-(--white) headingTitle">
                    {type.length}
                  </h4>
                  <p className="text-[#444] small">TYPE</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* random Content */}
        <div className="w-full mt-10 lg:mt-0">
          {/* random Content Img */}
          <div className="flex justify-center relative">
            <button
              type="button"
              className="bg-[#1a1a1a] border border-[#0f0f0f] p-2.5 absolute left-0 top-0"
              onClick={handleRefresh}
              disabled={isFetching}
            >
              <RotateCw
                size={20}
                stroke="#444"
                className={`${isRotating ? "animate-[spin_0.5s_ease-in-out]" : ""}`}
              />
            </button>
            {!todayItem ? (
              <Image size={200} stroke="var(--grey)" />
            ) : (
              <img
                src={`https://res.cloudinary.com/dx71aeltq/image/upload/${todayItem?.icon}`}
                alt={`${todayItem?.name}`}
                className="w-50"
              />
            )}

            <div className="flex gap-2.5 items-center bg-(--red) text-(--white) small p-2.5 w-fit absolute right-0 top-0">
              <span className="w-2.5 h-2.5 rounded-full bg-(--white) animate-bounce" />
              오늘의 몬스터
            </div>
          </div>

          <div className="text-(--red) flex items-center gap-2.5 py-10">
            {!todayItem ? (
              <hr className="w-full py-10" />
            ) : (
              <>
                <hr className="w-full" />
                <h2 className="whitespace-nowrap small w-fit">
                  {todayItem?.type.split("/")[0]}
                </h2>
                <hr className="w-full" />
              </>
            )}
          </div>

          {/* content Info */}
          <div>
            {!todayItem ? (
              <h3 className="title text-(--white)">이름 확인 중...</h3>
            ) : (
              <h3 className="title text-(--white)">{todayItem?.name}</h3>
            )}

            <div className="py-5">
              {!todayItem ? (
                <div className="border border-(--dgrey) bg-[#0c0c0c]  w-full h-8" />
              ) : (
                <>
                  <ul className="flex gap-2.5">
                    {todayItem?.weakEl.map((weak: string, index: number) => (
                      <li
                        key={index}
                        className="border border-(--dgrey) bg-[#0c0c0c] text-[#444] small py-1.25 px-2.5"
                      >
                        {weak}속성
                      </li>
                    ))}
                    <li className="border border-(--dgrey) bg-[#0c0c0c] text-[#444] small py-1.25 px-2.5">
                      위험도 6/10
                    </li>
                  </ul>
                </>
              )}
            </div>

            <Link
              to={`/monster/${todayItem?.id}`}
              className="group w-full border border-[#1a1a1a] p-2.5 bg-[#0f0f0f] text-[#444] flex justify-between items-center hover:border-[#444] hover:bg-[#1a1a1a] hover:text-(--white)"
            >
              <span className="small">상세 정보 보기</span>
              <ArrowRight size={20} className="group-hover:text-(--red)" />
            </Link>
          </div>
        </div>
      </section>

      {/* filter section */}
      <section className="bg-(--cream) sticky top-0 z-20">
        <FilterForm />
      </section>

      {/* content section */}
      <section className="bg-(--white) py-5">
        <div className="flex gap-2.5 items-center px-4 md:px-5 lg:px-6 pb-5">
          <h4 className="headingTitle text-(--black) min-w-fit">대형 몬스터</h4>
          <span className="border border-(--lgrey) bg-(--cream) py-1.25 px-2.5 text-small text-(--grey) min-w-fit">
            {status === "pending" ? 0 : contentLength?.[0]}종
          </span>
          <hr className="flex-1 border-(--lgrey)" />
        </div>

        <div>
          {status === "pending" && (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] border-t border-(--lgrey)">
              {Array.from({ length: 20 }).map((_, index) => (
                <li key={`skeleton-${index}`}>
                  <Skeleton />
                </li>
              ))}
            </ul>
          )}

          {status === "success" && content.length > 0 && (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] border-t border-(--lgrey)">
              {content.map((item: Item, index) => (
                <li
                  key={item.id}
                  ref={index === content.length - 1 ? ref : null}
                >
                  <Link to={`/monster/${item.id}`}>
                    <Item {...item} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
