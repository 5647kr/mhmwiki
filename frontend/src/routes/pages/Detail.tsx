import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CirclePlus,
  Disc,
  Grip,
  Megaphone,
  X,
} from "lucide-react";
import { useQueryHook } from "../../hook/useQueryHook";
import Loading from "../../components/Loading";
import InfoWrap from "../../components/InfoWrap";
import BlurWrap from "../../components/BlurWrap";

const IMG_URL =
  "https://res.cloudinary.com/dx71aeltq/image/upload/f_auto,q_auto:eco,dpr_auto,c_scale/";

export default function Detail() {
  const { id } = useParams();
  const [activeSeriesId, setActiveSeriesId] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [hubMenu, setHubMenu] = useState(false);

  const { data: contentData } = useQueryHook({
    key: ["contentData", id],
    path: `monster?id=${id}`,
  });

  const { data: filterData } = useQueryHook({
    key: ["filterData"],
    path: "filter",
  });

  const content = contentData?.items ? contentData.items[0] : contentData;

  // 버튼생성을 위한 시리즈 찾기
  const contentSeries = filterData?.items.series.filter((item: Series) =>
    content?.infoSeriesId.includes(item.id)
  );

  useEffect(() => {
    if (content?.infoSeriesId && content.infoSeriesId.length > 0) {
      const lastIndex = content.infoSeriesId.length - 1;
      const newSeriesId = content.infoSeriesId[lastIndex];

      setActiveSeriesId(newSeriesId);
    }
  }, [id, content]);

  // 활성화된 시리즈별 데이터 정보 찾기
  const currentInfo = content?.seriesInfo.find(
    (item: SeriesInfo) => item.id === activeSeriesId
  );

  const handleActiveSeriesId = (id: string) => {
    setActiveSeriesId(id);
  };

  const handleActivePrevSeriesId = () => {
    const activeIndex = contentSeries?.findIndex((item: Series) => {
      return activeSeriesId === item.id;
    });

    const prevItem = contentSeries?.[activeIndex - 1];
    setActiveSeriesId(prevItem.id);
  };

  const handleActiveNextSeriesId = () => {
    const activeIndex = contentSeries?.findIndex((item: Series) => {
      return activeSeriesId === item.id;
    });

    const nextItem = contentSeries?.[activeIndex + 1];
    setActiveSeriesId(nextItem.id);
  };

  const seriesBtnRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const scrollToActive = () => {
      if (seriesBtnRef.current) {
        const activeElement = seriesBtnRef.current.querySelector(
          ".active-button"
        ) as HTMLElement;

        if (activeElement) {
          activeElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    };

    scrollToActive();

    window.addEventListener("resize", scrollToActive);
    return () => window.removeEventListener("resize", scrollToActive);
  }, [activeSeriesId]);

  // 마지막 세대 생성
  const lastSeriesNum =
    filterData?.items.series[filterData?.items.series.length - 1].series;

  const generateSeriesNumArr = Array.from(
    { length: lastSeriesNum },
    (_, i) => i + 1
  );

  useEffect(() => {
    setImgLoaded(false);
    setIsTimeout(false);

    const timer = setTimeout(() => setIsTimeout(true), 1000);

    if (content?.img) {
      const checkImg = new Image();
      checkImg.src = IMG_URL + content.img;

      if (checkImg.complete) {
        setImgLoaded(true);
      } else {
        checkImg.onload = () => setImgLoaded(true);
        checkImg.onerror = () => setImgLoaded(true); // 에러 시에도 무한 로딩 방지
      }
    }

    return () => clearTimeout(timer);
  }, [id, content?.img]);

  const showLoading = !contentData || !imgLoaded || !isTimeout;

  const handleMoveTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!contentData) {
    return (
      <div className="fixed inset-0 z-100 bg-white flex justify-center items-center overflow-hidden">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {showLoading && (
        <div className="fixed inset-0 z-100 bg-white flex justify-center items-center overflow-hidden">
          <Loading />
        </div>
      )}

      {/* 이미지Wrap */}
      <div
        style={{ "--content-color": content.color } as React.CSSProperties}
        className={`col-span-full sm:col-[2/8] lg:col-[3/11] -mx-4 sm:mx-0 lg:mx-0 max-h-90 flex justify-center bg-(--content-color) rounded-b-[10px] relative transition-opacity duration-500 ${
          showLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <img
          src={IMG_URL + content.img}
          alt={content.name}
          onLoad={() => setImgLoaded(true)}
          className="w-full max-h-90 object-contain drop-shadow-[0_4px_4px_white]"
        />

        <div className="absolute bottom-2.5 left-4 lg:left-6">
          <h2
            className="headingTitle font-black
  [text-shadow:2px_2px_0_#fff,-2px_-2px_0_#fff,2px_-2px_0_#fff,-2px_2px_0_#fff]"
          >
            {content.name}
          </h2>
        </div>
      </div>

      {/* 시리즈버튼 나열 */}
      <div className="col-span-full sm:col-[2/8] lg:col-[3/11] rounded-[10px] border border-[#e0e0e0] shadow-[0_2px_4px_rgba(96,96,96,0.25)] mt-5 mb-10 flex justify-start items-center">
        <button
          type="button"
          className="p-3 lg:p-4 cursor-pointer disabled:cursor-not-allowed disabled:text-[#e0e0e0]"
          disabled={activeSeriesId === contentSeries?.[0].id}
          onClick={handleActivePrevSeriesId}
        >
          <ChevronLeft className="w-5 lg:w-6 h-5 lg:h-6" />
        </button>

        <ul
          ref={seriesBtnRef}
          className="flex-1 h-full flex items-center overflow-x-auto scrollbar-hide"
        >
          {contentSeries?.map((item: Series) => (
            <li key={item.id} className="text-center shrink-0">
              <button
                type="button"
                onClick={() => handleActiveSeriesId(item.id)}
                className={`cursor-pointer w-full px-2 whitespace-nowrap transition-all text-sm lg:text-base ${
                  activeSeriesId === item.id
                    ? "font-bold active-button"
                    : "font-normal text-[#e0e0e0]"
                }`}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="p-3 lg:p-4 cursor-pointer flex items-center disabled:cursor-not-allowed disabled:text-[#e0e0e0]"
          disabled={
            activeSeriesId === contentSeries?.[contentSeries.length - 1].id
          }
          onClick={handleActiveNextSeriesId}
        >
          <ChevronRight className="w-5 lg:w-6 h-5 lg:h-6" />
        </button>
      </div>

      <section className="col-span-full sm:col-[2/8] lg:col-[3/11] grid grid-cols-1 gap-y-5 [grid-template-areas:'base'_'element'_'item'_'etc'_'part'_'reward'_'weak'_'series'_'relate'_'eco'] lg:grid-cols-3 lg:gap-6 lg:[grid-template-areas:'base_element_reward'_'etc_part_item'_'eco_weak_weak'_'eco_series_series'_'eco_relate_relate'] relative pb-10">
        {/* 시리즈 블러 처리 */}
        {!currentInfo?.haveData && <BlurWrap activeSeriesId={activeSeriesId} />}

        {/* 기본 정보 */}
        <div className="[grid-area:base]">
          <InfoWrap title="기본 정보">
            <>
              <div>
                <h2 className="text-sm lg:text-base paragrap font-semibold">
                  종
                </h2>
                <p className="text-[#a0a0a0] text-sm lg:text-base">
                  {content.species}
                </p>
              </div>
              <div className="mt-5">
                <h2 className="text-sm lg:text-base font-semibold">종별</h2>
                <p className="text-[#a0a0a0] text-sm lg:text-base">
                  {content.type.split("/")[0]}
                </p>
                <p className="text-[#a0a0a0] text-sm lg:text-base">
                  {content.type.split("/")[1]}
                </p>
              </div>
              <div className="mt-5">
                <h2 className="text-sm lg:text-base font-semibold">별명</h2>
                <p className="text-[#a0a0a0] text-sm lg:text-base">
                  {content.nickname1}
                </p>
                <p className="text-[#a0a0a0] text-sm lg:text-base">
                  {content.nickname2}
                </p>
              </div>
            </>
          </InfoWrap>
        </div>

        {/* 속성 정보 */}
        <div className="[grid-area:element]">
          <InfoWrap title="속성 정보">
            <div className="flex flex-col items-start gap-2.5 w-full">
              <h2 className="text-sm lg:text-base font-semibold">상태이상</h2>
              <ul className="flex flex-wrap flex-1">
                {currentInfo?.ailment && currentInfo.ailment.length > 0 ? (
                  currentInfo.ailment.map((item: string) => (
                    <li key={item}>
                      <abbr title={item}>
                        <img
                          src={`/icons/${item}.webp`}
                          alt={item}
                          className="w-10 aspect-square"
                        />
                      </abbr>
                    </li>
                  ))
                ) : (
                  <p>-</p>
                )}
              </ul>
            </div>
            <div className="flex flex-col items-start gap-2.5 w-full mt-2.5">
              <h2 className="text-sm lg:text-base font-semibold">속성</h2>
              <ul className="flex flex-wrap flex-1">
                {currentInfo?.element && currentInfo.element.length > 0 ? (
                  currentInfo.element.map((item: string) => (
                    <li key={item}>
                      <abbr title={item}>
                        <img
                          src={`/icons/${item}.webp`}
                          alt={item}
                          className="w-10 aspect-square"
                        />
                      </abbr>
                    </li>
                  ))
                ) : (
                  <p>-</p>
                )}
              </ul>
            </div>
            <div className="flex flex-col items-start gap-2.5 w-full mt-2.5">
              <h2 className="text-sm lg:text-base font-semibold">약점 속성</h2>
              <ul className="flex flex-wrap flex-1">
                {currentInfo?.weakEl && currentInfo.weakEl.length > 0 ? (
                  currentInfo.weakEl.map((item: string) => (
                    <li key={item}>
                      <abbr title={item}>
                        <img
                          src={`/icons/${item}.webp`}
                          alt={item}
                          className="w-10 aspect-square"
                        />
                      </abbr>
                    </li>
                  ))
                ) : (
                  <p>-</p>
                )}
              </ul>
            </div>
          </InfoWrap>
        </div>

        {/* 아이템 정보 */}
        <div className="[grid-area:item]">
          <InfoWrap title="아이템 정보">
            <ul className="flex flex-wrap justify-around">
              <li className="flex flex-col items-center">
                <abbr title="섬광탄">
                  <img
                    src="/icons/섬광탄.webp"
                    alt="섬광탄"
                    className="w-14 aspect-square"
                  />
                </abbr>
                <p>
                  {currentInfo?.flash ? (
                    <CircleCheck className="text-[#1B4965]" />
                  ) : (
                    <CirclePlus className="rotate-45 text-[#E63946]" />
                  )}
                </p>
              </li>

              <li className="flex flex-col items-center">
                <abbr title="음폭탄">
                  <img
                    src="/icons/음폭탄.webp"
                    alt="음폭탄"
                    className="w-14 aspect-square"
                  />
                </abbr>
                <p>
                  {currentInfo?.sonic ? (
                    <CircleCheck className="text-[#1B4965]" />
                  ) : (
                    <CirclePlus className="rotate-45 text-[#E63946]" />
                  )}
                </p>
              </li>

              <li className="flex flex-col items-center">
                <abbr title="거름탄">
                  <img
                    src="/icons/거름탄.webp"
                    alt="거름탄"
                    className="w-14 aspect-square"
                  />
                </abbr>
                <p>
                  {currentInfo?.dung ? (
                    <CircleCheck className="text-[#1B4965]" />
                  ) : (
                    <CirclePlus className="rotate-45 text-[#E63946]" />
                  )}
                </p>
              </li>

              <li className="flex flex-col items-center">
                <abbr title="마비덫">
                  <img
                    src="/icons/마비덫.webp"
                    alt="마비덫"
                    className="w-14 aspect-square"
                  />
                </abbr>
                <p>
                  {currentInfo?.shock ? (
                    <CircleCheck className="text-[#1B4965]" />
                  ) : (
                    <CirclePlus className="rotate-45 text-[#E63946]" />
                  )}
                </p>
              </li>

              <li className="flex flex-col items-center">
                <abbr title="구멍함정">
                  <img
                    src="/icons/구멍함정.webp"
                    alt="구멍함정"
                    className="w-14 aspect-square"
                  />
                </abbr>
                <p>
                  {currentInfo?.pitfall ? (
                    <CircleCheck className="text-[#1B4965]" />
                  ) : (
                    <CirclePlus className="rotate-45 text-[#E63946]" />
                  )}
                </p>
              </li>
            </ul>
          </InfoWrap>
        </div>

        {/* 기타 정보(체력, 크기, etc) */}
        <div className="[grid-area:etc]">
          <InfoWrap title="기타 정보">
            <div>
              <h2 className="text-sm lg:text-base font-semibold">크기</h2>
              <p className="text-sm lg:text-base text-[#a0a0a0]">
                {currentInfo?.small} ~ {currentInfo?.large}
              </p>
            </div>
          </InfoWrap>
        </div>

        {/* 부위 파괴 정보 */}
        <div className="[grid-area:part]">
          <InfoWrap title="부위 파괴 정보">
            <p className="text-sm lg:text-base text-[#a0a0a0]">
              {currentInfo?.break.join(", ")}
            </p>
          </InfoWrap>
        </div>

        {/* 보상 정보 */}
        <div className="[grid-area:reward]">
          <InfoWrap title="보수 정보">
            <p className="text-sm lg:text-base text-[#a0a0a0]">
              몬스터 소재 분석 중...
            </p>
          </InfoWrap>
        </div>

        {/* 육질 정보 */}
        <div className="[grid-area:weak]">
          <InfoWrap title="육질 정보">
            <div className="h-auto max-h-200 overflow-y-auto pr-2.5 transparent-scroll">
              <table className="w-full table-fixed relative">
                <thead className="bg-[#eee] sticky top-0 rounded-t-[10px]">
                  <tr>
                    <th>부위</th>
                    <th>
                      <img
                        className="w-10 block mx-auto aspect-square"
                        src="/icons/참격.webp"
                        alt="참격"
                      />
                    </th>
                    <th>
                      <img
                        className="w-10 block mx-auto aspect-square"
                        src="/icons/타격.webp"
                        alt="타격"
                      />
                    </th>
                    <th>
                      <img
                        className="w-10 block mx-auto aspect-square"
                        src="/icons/탄활.webp"
                        alt="탄활"
                      />
                    </th>
                    <th>
                      <img
                        className="w-8 block mx-auto aspect-square"
                        src="/icons/불.webp"
                        alt="불"
                      />
                    </th>
                    <th>
                      <img
                        className="w-8 block mx-auto aspect-square"
                        src="/icons/물.webp"
                        alt="물"
                      />
                    </th>
                    <th>
                      <img
                        className="w-8 block mx-auto aspect-square"
                        src="/icons/번개.webp"
                        alt="번개"
                      />
                    </th>
                    <th>
                      <img
                        className="w-8 block mx-auto aspect-square"
                        src="/icons/얼음.webp"
                        alt="얼음"
                      />
                    </th>
                    <th>
                      <img
                        className="w-8 block mx-auto aspect-square"
                        src="/icons/용.webp"
                        alt="용"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentInfo?.weak?.map((item: any, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-[#e0e0e0] last:border-none hover:bg-[#f9f9f9] transition-colors"
                    >
                      {Object.values(item).map((value, i) => (
                        <td
                          key={i}
                          className={`py-3 px-1 text-center text-sm ${
                            i === 0
                              ? "text-[#606060] font-bold"
                              : "text-[#a0a0a0] font-normal"
                          }`}
                        >
                          {(value as string).split("br").map((line, index) => {
                            const parts = line.split("/");

                            return (
                              <div key={index}>
                                <span className="text-sm text-[#606060]">{parts[0]}</span>
                                {parts[1] && (
                                  <span className="text-xs ml-1 text-[#a0a0a0]">
                                    {parts[1]}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </InfoWrap>
        </div>

        {/* 시리즈 정보 */}
        <div className="[grid-area:series]">
          <InfoWrap title="시리즈 정보">
            <ul className="grid grid-cols-2 gap-5 md:grid-cols-3 px-2.5">
              {generateSeriesNumArr.map((gen) => (
                <li key={gen} className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold">{gen}세대</h3>
                  <div className="flex flex-wrap gap-2 text-xs lg:text-sm">
                    {filterData?.items.series
                      .filter((item: Series) => parseInt(item.series) === gen)
                      .map((item: Series) => (
                        <abbr
                          key={item.id}
                          title={item.fullName}
                          className="no-underline cursor-pointer"
                        >
                          <p
                            className={`px-2 py-0.5 rounded border transition-colors ${
                              content?.infoSeriesId.includes(item.id)
                                ? "bg-[#e0e0e0] border-[#e0e0e0] font-bold"
                                : "bg-[#eee] text-[#e0e0e0] font-normal"
                            }`}
                          >
                            {item.title}
                          </p>
                        </abbr>
                      ))}
                  </div>
                </li>
              ))}
            </ul>
          </InfoWrap>
        </div>

        {/* 관련 몬스터 정보 */}
        <div className="[grid-area:relate]">
          <InfoWrap title="관련 몬스터 정보">
            {content.relate && content.relate.length > 0 ? (
              <ul className="flex gap-5 flex-wrap">
                {content.relate.map(
                  (item: { id: string; icon: string; name: string }) => (
                    <li key={item.id}>
                      <Link to={`/detail/${item.id}`}>
                        <img
                          src={IMG_URL + item.icon}
                          alt={item.name}
                          className="w-15 aspect-square block mx-auto mb-2.5"
                        />
                        <span className="text-sm lg:text-base">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            ) : (
              <>
                <strong className="text-[#E63946">
                  관련된 몬스터가 없습니다.
                </strong>
              </>
            )}
          </InfoWrap>
        </div>

        {/* 생태 정보 */}
        <div className="[grid-area:eco]">
          <InfoWrap title="생태 정보">
            {content.eco.map((p: string, index: number) => (
              <p
                key={index}
                className="text-sm lg:text-base text-[#a0a0a0] break-keep mt-2.5"
              >
                {p}
              </p>
            ))}
          </InfoWrap>
        </div>
      </section>

      {/* 허브메뉴 */}
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

      {/* 우측 하단 버튼 */}
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
