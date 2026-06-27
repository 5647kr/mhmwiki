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
    if (!series.length || !data?.allSeriesIds) return null;
    return series.find((item) => item.id === data.allSeriesIds[0]);
  }, [series, data?.allSeriesIds]);

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
                {data.title.length > 0 && (
                  <>
                    {data.title.map((item: string, index: number) => (
                      <li
                        key={index}
                        className="border border-(--purple) py-1.25 px-2.5 small text-(--purple)"
                      >
                        {item}
                      </li>
                    ))}
                  </>
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
              {data.allSeriesIds.length}
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
      <div className="bg-(--white)">
        <section className="w-full max-w-360 mx-auto flex flex-col gap-5 py-10">
          {/* 기본정보 섹션 */}
          <div className="border-b border-(--lgrey) pb-10 px-4 md:px-5 lg:px-6">
            <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
              기본 정보
            </h3>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
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
                          const isFeatured = data.allSeriesIds?.includes(
                            item.id,
                          );
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

            <ul className="flex flex-col md:flex-row gap-5 mt-10">
              {data.weakEl.length > 0 && (
                <li className="w-full">
                  <h3>약점 속성</h3>
                  <ul className="flex gap-2.5 flex-wrap">
                    {data.weakEl.map((weak: string, index: number) => (
                      <li
                        key={index}
                        className=" border border-(--lgrey) p-2.5"
                      >
                        <img
                          className="w-10 aspect-square"
                          src={`/icons/${weak}.png`}
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
                      <li
                        key={index}
                        className=" border border-(--lgrey) p-2.5"
                      >
                        <img
                          className="w-10 aspect-square"
                          src={`/icons/${el}.png`}
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
                      <li
                        key={index}
                        className=" border border-(--lgrey) p-2.5"
                      >
                        <img
                          className="w-10 aspect-square"
                          src={`/icons/${ail}.png`}
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

            <table className="w-full table-fixed mt-10 border border-(--lgrey)">
              <thead className="bg-(--cream)">
                <tr>
                  <th className="text-(--black)  py-5">아이템</th>
                  <th className="text-(--black)  py-5">효과</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-(--lgrey) hover:bg-(--cream)">
                  <td>
                    <img
                      className="w-14 block mx-auto"
                      src="/icons/섬광탄.png"
                      alt="섬광탄"
                    />
                  </td>
                  <td
                    className={`text-center small ${data.flash ? "text-(--cyan)" : "text-(--red)"}`}
                  >
                    {data.flash ? "효과있음" : "효과 없음"}
                  </td>
                </tr>
                <tr className="border-b border-(--lgrey) hover:bg-(--cream)">
                  <td>
                    <img
                      className="w-14 block mx-auto"
                      src="/icons/거름탄.png"
                      alt="거름탄"
                    />
                  </td>
                  <td
                    className={`text-center small ${data.dung ? "text-(--cyan)" : "text-(--red)"}`}
                  >
                    {data.dung ? "효과 있음" : "효과 없음"}
                  </td>
                </tr>
                <tr className="border-b border-(--lgrey) hover:bg-(--cream)">
                  <td>
                    <img
                      className="w-14 block mx-auto"
                      src="/icons/음폭탄.png"
                      alt="음폭탄"
                    />
                  </td>
                  <td
                    className={`text-center small ${data.sonic ? "text-(--cyan)" : "text-(--red)"}`}
                  >
                    {data.sonic ? "효과 있음" : "효과 없음"}
                  </td>
                </tr>
                <tr className="border-b border-(--lgrey) hover:bg-(--cream)">
                  <td>
                    <img
                      className="w-14 block mx-auto"
                      src="/icons/마비덫.png"
                      alt="마비덫"
                    />
                  </td>
                  <td
                    className={`text-center small ${data.shock ? "text-(--cyan)" : "text-(--red)"}`}
                  >
                    {data.shock ? "효과 있음" : "효과 없음"}
                  </td>
                </tr>
                <tr className="border-b border-(--lgrey) hover:bg-(--cream)">
                  <td>
                    <img
                      className="w-14 block mx-auto"
                      src="/icons/구멍함정.png"
                      alt="구멍함정"
                    />
                  </td>
                  <td
                    className={`text-center small ${data.pitfall ? "text-(--cyan)" : "text-(--red)"}`}
                  >
                    {data.pitfall ? "효과 있음" : "효과 없음"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 약점표 섹션 -> 이미지 처리 */}
          <div className="border-b border-(--lgrey) pb-10 px-4 md:px-5 lg:px-6">
            <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
              약점표
            </h3>

            <table className="w-full table-fixed border border-(--lgrey) mt-10">
              <thead className="bg-(--cream)">
                <tr>
                  <th className="py-5 subParagraph">부위</th>
                  <th className="py-5">
                    <img
                      className="w-10 block mx-auto"
                      src="/icons/참격.png"
                      alt="참격"
                    />
                  </th>
                  <th className="py-5">
                    <img
                      className="w-10 block mx-auto"
                      src="/icons/타격.png"
                      alt="타격"
                    />
                  </th>
                  <th className="py-5">
                    <img
                      className="w-10 block mx-auto"
                      src="/icons/탄활.png"
                      alt="탄활"
                    />
                  </th>
                  <th className="py-5">
                    <img
                      className="w-8 block mx-auto"
                      src="/icons/화.png"
                      alt="화속성"
                    />
                  </th>
                  <th className="py-5">
                    <img
                      className="w-8 block mx-auto"
                      src="/icons/수.png"
                      alt="수속성"
                    />
                  </th>
                  <th className="py-5">
                    <img
                      className="w-8 block mx-auto"
                      src="/icons/뇌.png"
                      alt="뇌속성"
                    />
                  </th>
                  <th className="py-5">
                    <img
                      className="w-8 block mx-auto"
                      src="/icons/빙.png"
                      alt="빙속성"
                    />
                  </th>
                  <th className="py-5">
                    <img
                      className="w-8 block mx-auto"
                      src="/icons/용.png"
                      alt="용속성"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.weak.map(
                  (
                    item: {
                      부위: string;
                      참격: string;
                      타격: string;
                      "탄/활": string;
                      화: string;
                      수: string;
                      뇌: string;
                      빙: string;
                      용: string;
                    },
                    index: number,
                  ) => (
                    <tr
                      key={index}
                      className="border-b border-(--lgrey) hover:bg-(--cream)"
                    >
                      {Object.entries(item).map(([key, value]) => (
                        <td key={key} className="text-center py-2.5">
                          {String(value).split("/")[0]}
                          {String(value).split("/")[1] && (
                            <span className="text-(--grey) small block">
                              {String(value).split("/")[1]}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>

          {/* 부위파괴 섹션 */}
          <div className="border-b border-(--lgrey) pb-10 px-4 md:px-5 lg:px-6">
            <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
              부위 파괴
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
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

            <div className="flex mt-10 flex-col md:flex-row border-t border-(--lgrey)">
              <div className="w-full border border-(--lgrey) border-t-0 md:border-r-0 p-5">
                <h4 className="small text-(--grey) pb-2.5">최소 크기</h4>
                <strong className="syne paragraph font-black text-(--black)">
                  {data.small}
                  <span className="text-(--grey) small">cm</span>
                </strong>
              </div>
              <div className="w-full border border-(--lgrey) border-t-0 md:border-r-0 p-5">
                <h4 className="small text-(--grey) pb-2.5">평균 크기</h4>
                <strong className="syne paragraph font-black text-(--black)">
                  {(parseInt(data.small) + parseInt(data.large)) / 2}
                  <span className="text-(--grey) small">cm</span>
                </strong>
              </div>
              <div className="w-full border border-(--lgrey) border-t-0 p-5">
                <h4 className="small text-(--grey) pb-2.5">최대 크기</h4>
                <strong className="syne paragraph font-black text-(--black)">
                  {data.large}
                  <span className="text-(--grey) small">cm</span>
                </strong>
              </div>
            </div>

            {/* 그래프 */}
            <div className="mt-5">
              <h5 className="small text-(--grey)">
                크기 분포 ({data.small} ~ {data.large})
              </h5>

              <div className="w-full h-2 bg-linear-to-r from-(--yellow) to-(--darkred) mt-2.5" />

              <div className="flex justify-between">
                <span className="text-(--grey) text-[12px]">
                  {data.small}cm
                </span>
                <span className="text-(--grey) text-[12px]">
                  {(parseInt(data.small) + parseInt(data.large)) / 2}cm
                </span>
                <span className="text-(--grey) text-[12px]">
                  {data.large}cm
                </span>
              </div>
            </div>
          </div>

          {/* 연관 몬스터 섹션 */}
          {data.relate.length > 0 && (
            <div className="border-b border-(--lgrey) pb-10 px-4 md:px-5 lg:px-6">
              <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
                연관 몬스터
              </h3>

              <ul className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-2.5 mt-10">
                {data.relate.map(
                  (item: { id: string; icon: string; name: string }) => (
                    <li
                      key={item.id}
                      className="shadow-[0_0_0_0.5px_var(--grey)]"
                    >
                      <Link to={`/monster/${item.id}`}>
                        <div>
                          <div className="p-5">
                            <img
                              className="w-full "
                              src={imgURL + item.icon}
                              alt={item.name}
                            />
                          </div>
                          <div className="bg-(--cream) p-2.5 border-t border-(--lgrey) flex flex-col gap-2.5">
                            <h2 className="subParagraph text-[#606060]">
                              {item.name}
                            </h2>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}

          {/* 생태 섹션 */}
          <div className="pb-5 px-4 md:px-5 lg:px-6">
            <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
              생태 정보
            </h3>

            <div className="mt-10 flex flex-col gap-5">
              {data.eco.map((item: string, index: number) => (
                <p key={index} className="subParagraph text-(--dgrey)">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
