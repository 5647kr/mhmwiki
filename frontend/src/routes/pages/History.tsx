import { useState, useEffect, useRef } from "react";
import { useFetchStore } from "../../store/fetchStore";
import { HistoryItem, HistroySkeleton } from "../../components/HistoryItem";
import video from "../../assets/bg_video.mp4";

export default function MonsterHunterMain() {
  const [_, setIsEntered] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const series = useFetchStore((state) => state.series);
  const isLoading = useFetchStore((state) => state.isLoading);
  const fetchData = useFetchStore((state) => state.fetchData);

  useEffect(() => {
    fetchData("series");
  }, [fetchData]);

  const sortedSeries = [...series].sort((a, b) => a.open.localeCompare(b.open));

  useEffect(() => {
    setIsEntered(true);

    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.3;
      videoRef.current.play().catch((err) => {
        console.error("로컬 비디오 재생 실패:", err);
      });
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col relative select-none">
      <div className="w-full flex-1 flex flex-col items-center justify-start relative">
        {/* 🎬 [핵심] 고화질 로컬 비디오 배경 레이어 */}
        <div className="fixed top-15 left-0 right-0 bottom-0 z-0 pointer-events-none overflow-hidden bg-(--black)">
          <video
            ref={videoRef}
            src={video}
            className="absolute top-0 left-0 w-full h-full object-contain scale-100"
            playsInline
            loop
            preload="auto"
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>

        <div className="relative z-20 w-full max-w-[1920px] flex flex-col items-center p-10 md:py-20">
          <div className="text-center mb-16">
            <h2 className="small text-(--red) syne tracking-wider">
              MONSTER HUNTER SERIES HISTORY
            </h2>
            <h3 className="text-4xl md:text-5xl leading-tight text-(--white) font-bold py-6">
              22년의 <span className="text-(--red)">사냥</span>, 그 기록
            </h3>
            <p className="small text-(--lgrey) mb-10">
              모든 작품은 최초 출시일이 기준이므로, 플랫폼마다 출시일이 다를 수
              있습니다.
            </p>
          </div>

          <div className="w-full">
            <ul className="relative flex flex-col items-start w-full gap-10 before:absolute before:left-1/2 before:top-0 before:h-full before:w-px before:bg-[#444] before:-translate-x-1/2 py-8">
              {isLoading ? (
                <HistroySkeleton />
              ) : (
                <>
                  {sortedSeries.map((item: Series) => (
                    <li
                      key={item.id}
                      className="relative w-[50%] px-5 even:self-end before:absolute before:z-10 before:w-4 before:h-4 before:bg-(--red) before:rounded-full before:top-4 
                      odd:before:right-0 odd:before:translate-x-1/2 even:before:left-0 even:before:-translate-x-1/2 
                      
                      after:absolute after:z-5 after:w-8 after:h-8 after:bg-(--black) after:border after:border-(--red) after:rounded-full after:top-2
                      odd:after:right-0 odd:after:translate-x-1/2 even:after:left-0 even:after:-translate-x-1/2"
                    >
                      <HistoryItem {...item} />
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
