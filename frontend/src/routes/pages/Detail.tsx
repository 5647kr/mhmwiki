import { Link, useParams } from "react-router";
import { useQueryHook } from "../../hook/useQueryHook";
import { useFetchStore } from "../../store/fetchStore";
import { useEffect, useMemo, useState } from "react";
import DetailSkeleton from "../../components/DetailSkeleton";

export default function Detail() {
  const { id } = useParams();
  const imgURL = import.meta.env.VITE_IMG_URL;
  const [_, setisImgLoaded] = useState(true);

  useEffect(() => {
    setisImgLoaded(true);
  }, [id]);

  const { data, isFetching } = useQueryHook({
    key: ["content", id],
    id: id,
  });

  const series = useFetchStore((state) => state.series);
  const fetchData = useFetchStore((state) => state.fetchData);

  useEffect(() => {
    fetchData("series");
  }, [fetchData]);

  const firstSeries = useMemo(() => {
    if (!series.length || !data?.infoSeriesId) return null;
    return series.find((item) => item.id === data.infoSeriesId[0]);
  }, [series, data?.infoSeriesId]);

  const generateSeriesNumArr = useMemo(() => {
    if (!series || series.length === 0) return [];
    const maxGeneration = Math.max(
      ...series.map((s) => parseInt(s.series) || 1),
    );
    return Array.from({ length: maxGeneration }, (_, i) => i + 1);
  }, [series]);

  if (isFetching || !series.length || !data) return <DetailSkeleton />;

  return (
    <>
      {/* 이미지 섹션 */}
      <section className="bg-(--cream) pt-10 pb-5 px-4 md:px-5 lg:px-6 relative">
        <div>
          <div className="absolute right-0 top-[50%] transform translate-y-[-50%] w-[50%] opacity-20">
            <img
              onLoad={() => setisImgLoaded(false)}
              src={imgURL + data.img}
              alt={data.name}
            />
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
              onLoad={() => setisImgLoaded(false)}
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
      <section className="bg-(--white) flex flex-col gap-5 py-10">
        {/* 기본정보 섹션 */}
        <div className="border-b border-(--lgrey) pb-10 px-4 md:px-5 lg:px-6">
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
                {data.nickname1 ? data.nickname1.split("/")[0] : "없음"}
              </p>
              <span className="small text-(--grey)">
                {data.nickname1.split("/")[1]}
              </span>
              <p className="paragraph font-semibold text-(--dgrey)">
                {data.nickname2 ? data.nickname2 : ""}
              </p>
              <span className="small text-(--grey)">
                {data.nickname2 ? data.nickname2.split("/")[1] : ""}
              </span>
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
                {data.type.split("/")[0]}
              </p>
              <span className="small text-(--grey)">
                {data.type.split("/")[1]}
              </span>
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
        <div className="border-b border-(--lgrey) pb-10 px-4 md:px-5 lg:px-6">
          <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
            속성 정보
          </h3>

          <ul className="flex flex-col md:flex-row gap-5 py-10">
            {data.weakEl.length > 0 && (
              <li className="w-full">
                <h3>약점 속성</h3>
                <ul className="flex gap-2.5 flex-wrap">
                  {data.weakEl.map((weak: string, index: number) => (
                    <li key={index} className=" border border-(--lgrey) p-2.5">
                      <img
                        className="w-10 aspect-square"
                        src={`../../../public/icons/${weak}.png`}
                        alt={weak}
                      />
                    </li>
                  ))}
                </ul>
              </li>
            )}

            {data.element.length > 0 && (
              <li className="w-full">
                <h3>속성</h3>
                <ul className="flex gap-2.5 flex-wrap">
                  {data.element.map((el: string, index: number) => (
                    <li key={index} className=" border border-(--lgrey) p-2.5">
                      <img
                        className="w-10 aspect-square"
                        src={`../../../public/icons/${el}.png`}
                        alt={el}
                      />
                    </li>
                  ))}
                </ul>
              </li>
            )}

            {data.ailment.length > 0 && (
              <li className="w-full">
                <h3>상태 이상</h3>
                <ul className="flex gap-2.5 flex-wrap">
                  {data.ailment.map((ail: string, index: number) => (
                    <li key={index} className=" border border-(--lgrey) p-2.5">
                      <img
                        className="w-10 aspect-square"
                        src={`.../../../public/icons/${ail}.png`}
                        alt={ail}
                      />
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </div>

        {/* 유효 아이템 섹션 -> 이미지 처리 */}
        <div className="border-b border-(--lgrey) pb-10 px-4 md:px-5 lg:px-6">
          <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
            아이템 효과 여부
          </h3>
        </div>

        {/* 약점표 섹션 -> 이미지 처리 */}
        <div className="border-b border-(--lgrey) pb-10 px-4 md:px-5 lg:px-6">
          <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
            약점표
          </h3>

          <table className="w-full border border-(--lgrey)">
            <thead className="bg-(--cream) table-fixed">
              <tr>
                <th className="subParagraph">부위</th>
                <th>
                  <img
                    className="w-10 aspect-square block mx-auto"
                    src="../../../public/icons/참격.png"
                    alt="참격"
                  />
                </th>
                <th>
                  <img
                    className="w-10 aspect-square block mx-auto"
                    src="../../../public/icons/타격.png"
                    alt="타격"
                  />
                </th>
                <th>
                  <img
                    className="w-10 aspect-square block mx-auto"
                    src="../../../public/icons/탄활.png"
                    alt="탄활"
                  />
                </th>
                <th>
                  <img
                    className="w-10 aspect-square block mx-auto"
                    src="../../../public/icons/화.png"
                    alt="화속성"
                  />
                </th>
                <th>
                  <img
                    className="w-10 aspect-square block mx-auto"
                    src="../../../public/icons/수.png"
                    alt="수속성"
                  />
                </th>
                <th>
                  <img
                    className="w-10 aspect-square block mx-auto"
                    src="../../../public/icons/뇌.png"
                    alt="뇌속성"
                  />
                </th>
                <th>
                  <img
                    className="w-10 aspect-square block mx-auto"
                    src="../../../public/icons/빙.png"
                    alt="빙속성"
                  />
                </th>
                <th>
                  <img
                    className="w-10 aspect-square block mx-auto"
                    src="../../../public/icons/용.png"
                    alt="용속성"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {data.weak.map((item: any, index: number) => {
                const columns = [
                  "부위",
                  "참격",
                  "타격",
                  "탄/활",
                  "화",
                  "수",
                  "뇌",
                  "빙",
                  "용",
                ];

                return (
                  <tr
                    key={index}
                    className="border-b border-(--lgrey) hover:bg-(--white)"
                  >
                    {columns.map((key, i) => {
                      const rawValue = item[key] || "0";
                      const parts = rawValue.split("/");

                      return (
                        <td
                          key={i}
                          className={`w-[calc(100%/9)]text-center py-3 px-2`}
                        >
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5">
                            <span className="small">{parts[0]}</span>

                            {parts[1] && (
                              <span className="small">{parts[1]}</span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 부위파괴 섹션 */}
        <div className="border-b border-(--lgrey) pb-10 px-4 md:px-5 lg:px-6">
          <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
            부위 파괴
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 py-10">
            {data.break.map((item: string, index: number) => (
              <li key={index} className="border border-(--lgrey) p-5">
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* 크기 섹션 */}
        <div className="border-b border-(--lgrey) pb-10 px-4 md:px-5 lg:px-6">
          <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
            크기 정보
          </h3>

          <div className="flex py-10">
            <div className="w-full border border-(--lgrey) border-r-0 p-5">
              <h4 className="small text-(--grey) pb-2.5">최소 크기</h4>
              <strong className="syne paragraph font-black text-(--black)">
                {data.small}
                <span className="text-(--grey) small">cm</span>
              </strong>
            </div>
            {/* 크기표 */}
            <div className="w-full border border-(--lgrey) p-5">
              <h4 className="small text-(--grey) pb-2.5">최대 크기</h4>
              <strong className="syne paragraph font-black text-(--black)">
                {data.large}
                <span className="text-(--grey) small">cm</span>
              </strong>
            </div>
          </div>

          {/* 그래프 */}
          <div>
            <h5 className="small text-(--grey)">
              크기 분포 ({data.small} ~ {data.large})
            </h5>

            <div className="w-full h-2 bg-(--red) mt-2.5" />

            <div className="flex justify-between">
              <span className="text-(--grey) text-[12px]">{data.small}</span>
              <span className="text-(--grey) text-[12px]">{data.large}</span>
            </div>
          </div>
        </div>

        {/* 연관 몬스터 섹션 */}
        {data.relate.length > 0 && (
          <div className="border-b border-(--lgrey) pb-10 px-4 md:px-5 lg:px-6">
            <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
              연관 몬스터
            </h3>

            <ul>
              {data.relate.map(
                (item: { id: string; icon: string; name: string }) => (
                  <li key={item.id}>
                    <Link to={`/monster/${item.id}`}>
                      <p>{item.name}</p>
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        )}

        {/* 생태 섹션 */}
        <div className="border-b border-(--lgrey) pb-10 px-4 md:px-5 lg:px-6">
          <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
            생태 정보
          </h3>

          <div className="py-10 flex flex-col gap-5">
            {data.eco.map((item: string, index: number) => (
              <p key={index} className="subParagraph text-(--dgrey)">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
