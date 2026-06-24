import { useParams } from "react-router";
import { useQueryHook } from "../../hook/useQueryHook";
import { useFetchStore } from "../../store/fetchStore";
import { useEffect, useMemo } from "react";
import DetailSkeleton from "../../components/DetailSkeleton";

export default function Detail() {
  const { id } = useParams();
  const imgURL = import.meta.env.VITE_IMG_URL;

  const { data, isFetching } = useQueryHook({
    key: ["content", id],
    id: id,
  });

  const series = useFetchStore((state) => state.series);
  const fetchData = useFetchStore((state) => state.fetchData);

  useEffect(() => {
    fetchData("series");
  }, [fetchData]);

  // 1. 첫 등장 작품 안전하게 찾기
  const firstSeries = useMemo(() => {
    if (!series.length || !data?.infoSeriesId) return null;
    return series.find((item) => item.id === data.infoSeriesId[0]);
  }, [series, data?.infoSeriesId]);

  // 2. 전체 시리즈 중 가장 높은 세대 번호를 구해 안전하게 배열 생성 (series가 빌 때를 대비)
  const generateSeriesNumArr = useMemo(() => {
    if (!series || series.length === 0) return [];
    const maxGeneration = Math.max(
      ...series.map((s) => parseInt(s.series) || 1),
    );
    return Array.from({ length: maxGeneration }, (_, i) => i + 1);
  }, [series]);

  // 몬스터 데이터나 전체 시리즈 데이터가 로딩 중일 때는 스켈레톤을 보여줍니다.
  if (isFetching || !series.length || !data) return <DetailSkeleton />;

  console.log(data);
  console.log(series);

  return (
    <>
      {/* 이미지 섹션 */}
      <section className="bg-(--cream) pt-10 pb-5 px-4 md:px-5 lg:px-6 relative">
        <div>
          <div className="absolute right-25 top-0 w-[50%] opacity-20">
            <img src={imgURL + data.img} alt={data.name} />
          </div>

          <strong className="small text-(--grey) font-normal">
            대형 몬스터 <span className="text-(--red) px-2">/</span>
            {data?.type.split("/")[0]}{" "}
            <span className="text-(--red) px-2">/</span>
            {data?.name}
          </strong>
          {/* 이미지 */}
          <div className="flex flex-col md:flex-row md:items-center gap-2.5 mt-4">
            <img
              src={imgURL + data?.img}
              alt={data.name}
              className="w-full max-w-100 object-cover vertical-top"
            />

            <div className="flex-1">
              <p className="syne small">
                LARGE MONSER . {data.type.split("/")[0]}
              </p>
              <h2 className="font-black title text-(--black)">{data.name}</h2>
              <ul className="flex gap-2.5">
                <li className="border border-(--red) py-1.25 px-2.5 small text-(--red)">
                  {data.type.split("/")[0]}
                </li>
                <li className="border border-(--grey) py-1.25 px-2.5 small text-(--grey)">
                  {data.species}
                </li>
                {data.title && (
                  <li className="border border-(--purple) py-1.25 px-2.5 small text-(--purple)">
                    {data.title}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 이미지 하단 간단 인포칸 */}
      <div className="bg-(--cream) border-t border-(--lgrey)">
        <ul className="flex w-full ">
          <li className="border-r border-(--lgrey) p-5 flex-1">
            <p className="small text-(--grey) pb-2.5">첫 등장 작품</p>
            <strong className="text-(--dgrey) subHeadingTitle">
              {firstSeries?.title}
            </strong>
            <span className="small text-(--grey) font-normal">
              ({firstSeries?.open.split("-")[0]})
            </span>
          </li>
          <li className="border-r border-(--lgrey) p-5 flex-1">
            <p className="small text-(--grey) pb-2.5">출현 작품 수</p>
            <strong className="text-(--dgrey) subHeadingTitle">
              {data.infoSeriesId.length}
              <span className="small text-(--grey) font-normal">작품</span>
            </strong>
          </li>
          <li className="p-5 flex-1">
            <p className="small text-(--grey) pb-2.5">약점 속성</p>
            {data.weakEl.map((weak: string, index: number) => (
              <strong
                key={index}
                className="text-(--dgrey) subHeadingTitle after:content-[',_'] last:after:content-none"
              >
                {weak}속성
              </strong>
            ))}
          </li>
        </ul>
      </div>

      {/* 정보 섹션 */}
      <section className="bg-(--white) flex flex-col gap-10 py-10 px-4 md:px-5 lg:px-6">
        {/* 기본정보 섹션 */}
        <div className="border-b border-(--lgrey) pb-10">
          <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
            기본 정보
          </h3>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5">
            <li>
              <h4 className="small text-(--grey)">이름</h4>
              <p className="paragraph font-semibold text-(--dgrey)">
                {data.name}
              </p>
            </li>
            <li>
              <h4 className="small text-(--grey)">별칭</h4>
              <p className="paragraph font-semibold text-(--dgrey)">
                {data.nickname1}
              </p>
              <p className="paragraph font-semibold text-(--dgrey)">
                {data.nickname2}
              </p>
            </li>
            <li>
              <h4 className="small text-(--grey)">종</h4>
              <p className="paragraph font-semibold text-(--dgrey)">
                {data.species}
              </p>
            </li>
            <li>
              <h4 className="small text-(--grey)">종별</h4>
              <p className="paragraph font-semibold text-(--dgrey)">
                {data.type}
              </p>
            </li>
          </ul>

          <div>
            <h4 className="small text-(--grey)">출현 시리즈</h4>
            <ul className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-3">
              {generateSeriesNumArr.map((gen: number) => (
                <li key={gen} className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold">{gen}세대</h3>
                  <ul className="flex flex-wrap gap-2 text-xs lg:text-sm">
                    {series
                      .filter((item) => parseInt(item.series) === gen)
                      .map((item) => {
                        const isFeatured = data.infoSeriesId?.includes(item.id);
                        return (
                          <li key={item.id}>
                            <abbr
                              key={item.id}
                              title={item.koTitle}
                              className="no-underline cursor-pointer"
                            >
                              <p
                                className={`py-1.25 px-2.5 border ${
                                  isFeatured
                                    ? "border-(--red) text-(--red)"
                                    : "border-(-lgrey) text-(--lgrey)"
                                }`}
                              >
                                {item.title}
                              </p>
                            </abbr>
                          </li>
                        );
                      })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 속성 섹션 */}
        <div>
          <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
            속성 정보
          </h3>

          <ul className="flex flex-col md:flex-row gap-5 py-10">
            <li className="w-full">
              <h3>약점 속성</h3>
              <ul className="flex gap-2.5">
                {data.weakEl.map((weak: string, index: number) => (
                  <li key={index} className=" border border-(--lgrey) p-2.5">
                    {weak}속성
                  </li>
                ))}
              </ul>
            </li>
            <li className="w-full">
              <h3>속성</h3>
              <ul className="flex gap-2.5">
                {data.element.map((el: string, index: number) => (
                  <li key={index} className=" border border-(--lgrey) p-2.5">
                    {el ? `${el}속성` : "없음"}
                  </li>
                ))}
              </ul>
            </li>
            <li className="w-full">
              <h3>상태 이상</h3>
              <ul className="flex gap-2.5">
                {data.ailment.map((ail: string, index: number) => (
                  <li key={index} className=" border border-(--lgrey) p-2.5">
                    {ail ? `${ail}속성` : "없음"}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>

        {/* 유효 아이템 섹션 */}
        <div></div>

        {/* 약점표 섹션 */}
        <div></div>

        {/* 부위파괴 섹션 */}
        <div></div>

        {/* 크기 섹션 */}
        <div></div>

        {/* 연관 몬스터 섹션 */}
        <div></div>

        {/* 생태 섹션 */}
        <div></div>
      </section>
    </>
  );
}
