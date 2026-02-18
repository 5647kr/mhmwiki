import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { CircleCheck, CirclePlus } from "lucide-react";
import { useQueryHook } from "../../hook/useQueryHook";
import BlurWrap from "../../components/BlurWrap";
import Loading from "../../components/Loading";

const IMG_URL =
  "https://res.cloudinary.com/dx71aeltq/image/upload/f_auto,q_auto:eco,dpr_auto,c_scale/";

export default function Detail() {
  const { id } = useParams();
  const [activeSeriesId, setActiveSeriesId] = useState("");

  const { data: contentData } = useQueryHook({
    key: ["contentData", id],
    path: `monster?id=${id}`,
  });

  const { data: filterData } = useQueryHook({
    key: ["filterData"],
    path: "filter",
  });

  const content = contentData?.items ? contentData.items[0] : contentData;

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

  const currentInfo = content?.seriesInfo.find(
    (item: SeriesInfo) => item.id === activeSeriesId
  );

  const handleActiveSeriesId = (id: string) => {
    setActiveSeriesId(id);
  };

  // 시리즈 정보 생성
  const maxSeries =
    filterData?.items.series.reduce(
      (max: number, item: Series) => Math.max(max, parseInt(item.series)),
      0
    ) || 0;

  const generationArray = Array.from({ length: maxSeries }, (_, i) => i + 1);

  if (!contentData) {
    return (
      <div className="col-span-full min-h-[calc(100vh-108px)] flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  // console.log(content);
  // console.log(currentInfo);

  return (
    <>
      <div
        style={{ "--content-color": content.color } as React.CSSProperties}
        className={`col-span-full sm:col-[2/8] md:col-[3/11] -mx-4 sm:-mx-5 md:-mx-6 min-h-85 max-h-90 flex justify-center pt-2.5 bg-(--content-color) relative rounded-b-xl`}
      >
        <img
          src={IMG_URL + content.img}
          alt={content.name}
          className="w-full max-h-90 object-contain z-20 drop-shadow-[0_4px_4px_white]"
        />

        <div className="absolute bottom-12.5 left-4 sm:left-5 md:left-6 z-30">
          <h2
            data-content={content.name}
            className="relative text-2xl font-bold
            before:content-[attr(data-content)] 
            before:absolute before:inset-0 before:-z-10
            before:[-webkit-text-stroke:6px_white]"
          >
            {content.name}
          </h2>
        </div>
      </div>

      {/* 정보Wrap */}
      <div
        className="relative z-10 grid min-h-50 gap-5 overflow-hidden rounded-[10px] border border-[#e0e0e0] bg-white px-5 pb-5 pt-17.5 shadow-[0_2px_4px_#fff]
        col-span-full sm:col-[2/8] md:col-[3/11] -mt-12.5
        grid-cols-2
        [grid-template-areas:'base_element'_'series_series'_'item_item'_'relate_relate']
        md:grid-cols-1 md:[grid-template-areas:'base_base'_'element_element'_'series_series'_'item_item'_'relate_relate']
        "
      >
        {!currentInfo?.haveData && <BlurWrap activeSeriesId={activeSeriesId} />}

        {/* 기본 정보 */}
        <div className="[grid-area:base]">
          <h2 className="text-lg font-bold md:text-xl mb-2.5">기본 정보</h2>
          <div className="flex flex-col md:flex-row gap-2.5">
            <div className="flex-1 px-2.5">
              <h3 className="font-semibold text-base md:text-lg">종</h3>
              <p className="text-sm md:text-base font-normal">
                {content.species}
              </p>
            </div>
            <div className="flex-2 md:border-l md:border-[#e0e0e0] px-2.5">
              <h3 className="font-semibold text-base md:text-lg">종별</h3>
              <p className="text-sm md:text-base font-normal">
                {content.type.split("/")[0]}
              </p>
              <p className="text-sm font-normal text-[#a0a0a0]">
                {content.type.split("/")[1]}
              </p>
            </div>
            <div className="flex-2 md:border-l md:border-[#e0e0e0] px-2.5">
              <h3 className="font-semibold text-base md:text-lg">별명</h3>
              {content?.nickname2 ? (
                <div className="grid grid-cols-2">
                  <p className="text-sm md:text-base font-normal">
                    {content.nickname1.split("/")[0]}
                  </p>
                  <p className="text-sm md:text-base font-normal">
                    {content.nickname2.split("/")[0]}
                  </p>
                  <p className="text-sm font-normal text-[#a0a0a0]">
                    {content.nickname1.split("/")[1]}
                  </p>
                  <p className="text-sm font-normal text-[#a0a0a0]">
                    {content.nickname2.split("/")[1]}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1">
                  <p className="text-sm md:text-base font-normal">
                    {content.nickname1.split("/")[0]}
                  </p>
                  <p className="text-sm font-normal text-[#a0a0a0]">
                    {content.nickname1.split("/")[1]}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 속성 정보 */}
        <div className="[grid-area:element]">
          <h2 className="text-lg font-bold md:text-xl mb-2.5">속성 정보</h2>
          <div className="flex flex-col md:flex-row gap-2.5">
            <div className="flex-1 px-2.5">
              <h3 className="font-semibold text-base md:text-lg">상태이상</h3>
              <div className="flex flex-wrap">
                {currentInfo?.ailment && currentInfo.ailment.length > 0 ? (
                  currentInfo.ailment.map((item: string) => (
                    <img
                      key={item}
                      className="w-10"
                      src={`/icons/${item}.webp`}
                      alt={item}
                    />
                  ))
                ) : (
                  <p>-</p>
                )}
              </div>
            </div>
            <div className="flex-1 px-2.5 md:border-l md:border-[#e0e0e0]">
              <h3 className="font-semibold text-base md:text-lg">속성</h3>
              <div className="flex flex-wrap">
                {currentInfo?.element && currentInfo.element.length > 0 ? (
                  currentInfo.element.map((item: string) => (
                    <img
                      key={item}
                      className="w-10"
                      src={`/icons/${item}.webp`}
                      alt={item}
                    />
                  ))
                ) : (
                  <p>-</p>
                )}
              </div>
            </div>
            <div className="flex-1 px-2.5 md:border-l md:border-[#e0e0e0]">
              <h3 className="font-semibold text-base md:text-lg">약점속성</h3>
              <div className="flex flex-wrap">
                {currentInfo?.weakEl && currentInfo.weakEl.length > 0 ? (
                  currentInfo.weakEl.map((item: string) => (
                    <img
                      key={item}
                      className="w-10"
                      src={`/icons/${item}.webp`}
                      alt={item}
                    />
                  ))
                ) : (
                  <p>-</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 시리즈 정보 */}
        <div className="[grid-area:series]">
          <h2 className="text-lg font-bold md:text-xl mb-2.5">시리즈 정보</h2>
          <ul className="grid grid-cols-2 gap-5 md:grid-cols-3 px-2.5">
            {generationArray.map((gen) => (
              <li key={gen} className="flex flex-col gap-1">
                <h3 className="text-sm font-bold">{gen}세대</h3>
                <div className="flex flex-wrap gap-2 text-sm md:text-base">
                  {filterData?.items.series
                    .filter((item: Series) => parseInt(item.series) === gen)
                    .map((item: Series) => (
                      <abbr
                        key={item.id}
                        title={item.fullName}
                        className="no-underline cursor-pointer"
                      >
                        <strong
                          className={`px-2 py-0.5 rounded border transition-colors ${
                            content?.infoSeriesId.includes(item.id)
                              ? "bg-[#e0e0e0] border-[#e0e0e0] font-bold"
                              : "bg-[#eee] text-[#e0e0e0] font-normal"
                          }`}
                        >
                          {item.title}
                        </strong>
                      </abbr>
                    ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 아이템 정보 */}
        <div className="[grid-area:item] border-t border-dashed border-[#e0e0e0] pt-2.5 ">
          <h2 className="text-lg font-bold md:text-xl mb-2.5">아이템 정보</h2>
          <div className="flex flex-wrap justify-evenly">
            <div className="flex flex-col items-center">
              <img
                className="w-16 aspect-square"
                src="/icons/섬광탄.webp"
                alt="섬광탄"
              />
              <p>
                {currentInfo?.flash ? (
                  <CircleCheck className="text-[#1B4965]" />
                ) : (
                  <CirclePlus className="rotate-45 text-[#E63946]" />
                )}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="w-16 aspect-square"
                src="/icons/음폭탄.webp"
                alt="음폭탄"
              />
              <p>
                {currentInfo?.sonic ? (
                  <CircleCheck className="text-[#1B4965]" />
                ) : (
                  <CirclePlus className="rotate-45 text-[#E63946]" />
                )}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="w-16 aspect-square"
                src="/icons/거름탄.webp"
                alt="거름탄"
              />
              <p>
                {currentInfo?.dung ? (
                  <CircleCheck className="text-[#1B4965]" />
                ) : (
                  <CirclePlus className="rotate-45 text-[#E63946]" />
                )}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="w-16 aspect-square"
                src="/icons/마비덫.webp"
                alt="마비덫"
              />
              <p>
                {currentInfo?.shock ? (
                  <CircleCheck className="text-[#1B4965]" />
                ) : (
                  <CirclePlus className="rotate-45 text-[#E63946]" />
                )}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="w-16 aspect-square"
                src="/icons/구멍함정.webp"
                alt="구멍함정"
              />
              <p>
                {currentInfo?.pitfall ? (
                  <CircleCheck className="text-[#1B4965]" />
                ) : (
                  <CirclePlus className="rotate-45 text-[#E63946]" />
                )}
              </p>
            </div>
          </div>
        </div>

        {/* 관련 몬스터 정보 */}
        <div className="[grid-area:relate]">
          <h2 className="text-lg font-bold md:text-xl mb-2.5">
            관련 몬스터 정보
          </h2>
          {content?.relate && content?.relate.length > 0 ? (
            <ul className="flex flex-wrap gap-5 px-2.5">
              {content.relate.map(
                (item: { id: string; icon: string; name: string }) => (
                  <li key={item.id}>
                    <Link
                      to={`/detail/${item.id}`}
                      className="flex flex-col items-center gap-2.5"
                    >
                      <img
                        src={IMG_URL + item.icon}
                        alt={item.name}
                        className="w-10 aspect-square"
                      />
                      <span className="text-xs md:text-sm">{item.name}</span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          ) : (
            <div className="px-2.5">
              <strong className="text-[#E63946]">
                관련된 몬스터가 없습니다.
              </strong>
            </div>
          )}
        </div>
      </div>

      {/* 버튼 나열 */}
      <div className="col-span-full sm:col-[2/8] md:col-[3/11] mt-20 border-b border-b-[#e0e0e0] overflow-x-auto">
        <ul className="flex justify-start gap-2.5 p-2.5">
          {contentSeries?.map((item: Series) => (
            <li key={item.id} className="text-center">
              <button
                onClick={() => handleActiveSeriesId(item.id)}
                className={`cursor-pointer w-full px-2 ${
                  activeSeriesId === item.id
                    ? "font-bold text-[#606060] active-button"
                    : "font-normal text-[#e0e0e0]"
                }`}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-full sm:col-[2/8] md:col-[3/11] relative mt-5">
        {!currentInfo?.haveData && <BlurWrap activeSeriesId={activeSeriesId} />}
        {/* 육질 정보 */}
        <div>
          <h2 className="text-lg font-bold md:text-xl mb-2.5">육질 정보</h2>
          <div className="rounded-[10px] overflow-hidden border border-[#e0e0e0]">
            <table className="w-full min-h-100 table-fixed">
              <thead className="bg-[#eee]">
                <tr>
                  <th>부위</th>
                  <th>
                    <img
                      className="w-16 block mx-auto aspect-square"
                      src="/icons/참격.webp"
                      alt="참격"
                    />
                  </th>
                  <th>
                    <img
                      className="w-16 block mx-auto aspect-square"
                      src="/icons/타격.webp"
                      alt="타격"
                    />
                  </th>
                  <th>
                    <img
                      className="w-16 block mx-auto aspect-square"
                      src="/icons/탄활.webp"
                      alt="탄활"
                    />
                  </th>
                  <th>
                    <img
                      className="w-12 block mx-auto aspect-square"
                      src="/icons/불.webp"
                      alt="불"
                    />
                  </th>
                  <th>
                    <img
                      className="w-12 block mx-auto aspect-square"
                      src="/icons/물.webp"
                      alt="물"
                    />
                  </th>
                  <th>
                    <img
                      className="w-12 block mx-auto aspect-square"
                      src="/icons/번개.webp"
                      alt="번개"
                    />
                  </th>
                  <th>
                    <img
                      className="w-12 block mx-auto aspect-square"
                      src="/icons/얼음.webp"
                      alt="얼음"
                    />
                  </th>
                  <th>
                    <img
                      className="w-12 block mx-auto aspect-square"
                      src="/icons/용.webp"
                      alt="용"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentInfo?.weak?.map((item: string, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-[#e0e0e0] last:border-none"
                  >
                    {Object.values(item).map((value, i) => (
                      <td
                        key={i}
                        className="py-3 text-center"
                        dangerouslySetInnerHTML={{ __html: value as string }}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 부위 정보 */}
        <div className="col-span-full sm:col-[2/8] md:col-[3/11] mt-10">
          <h2 className="text-lg font-bold md:text-xl mb-2.5">부위 정보</h2>
          <p>
            파괴 가능 부위
            <br />
            <span>{currentInfo?.break.join(", ")}</span>
          </p>
        </div>
      </div>

      {/* 생태 정보 */}
      <div className="col-span-full sm:col-[2/8] md:col-[3/11] mt-10">
        <h2 className="text-lg font-bold md:text-xl mb-2.5">생태 정보</h2>
        <div className="text-sm text-[#606060] leading-relaxed break-keep">
          <div
            dangerouslySetInnerHTML={{ __html: content.eco }}
            className="prose prose-sm max-w-none"
          />
        </div>
      </div>
    </>
  );
}
