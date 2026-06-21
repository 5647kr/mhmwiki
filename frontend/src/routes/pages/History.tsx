import { useEffect } from "react";
import { useFetchStore } from "../../store/fetchStore";
import { HistoryItem, HistroySkeleton } from "../../components/HistoryItem";

export default function History() {
  const series = useFetchStore((state) => state.series);
  const isLoading = useFetchStore((state) => state.isLoading);
  const fetchData = useFetchStore((state) => state.fetchData);

  useEffect(() => {
    fetchData("series");
  }, [fetchData]);

  const sortedSeries = [...series].sort((a, b) => a.open.localeCompare(b.open));

  return (
    <section className="bg-(--black) px-4 md:px-5 lg:px-6 py-10">
      <div>
        <h2 className="small text-(--red) syne">
          MONSTER HUNTER SERIES HISTORY
        </h2>
        <h3 className="text-[40px] leading-10 text-(--white) font-bold py-10">
          22년의 <span className="text-(--red)">사냥</span>
          <br />그 기록
        </h3>
        <p className="small text-(--red) mb-10">
          모든 작품은 최초 출시일이 기준이므로, 플랫폼마다 출시일이 다를 수
          있습니다.
        </p>
      </div>

      <div>
        <ul className="relative flex flex-col items-start w-full gap-10 before:absolute before:left-1/2 before:top-0 before:h-full before:w-px before:bg-[#444] before:-translate-x-1/2 py-8">
          {isLoading ? (
            <HistroySkeleton />
          ) : (
            <>
              {sortedSeries.map((series: Series) => (
                <li
                  key={series.id}
                  className="relative w-[50%] px-5 even:self-end before:absolute before:z-10 before:w-4 before:h-4 before:bg-(--red) before:rounded-full before:top-4 
            odd:before:right-0 odd:before:translate-x-1/2 even:before:left-0 even:before:-translate-x-1/2 
            
            after:absolute after:z-5 after:w-8 after:h-8 after:bg-(--black) after:border after:border-(--red) after:rounded-full after:top-2
            odd:after:right-0 odd:after:translate-x-1/2 even:after:left-0 even:after:-translate-x-1/2 "
                >
                  <HistoryItem {...series} />
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </section>
  );
}
