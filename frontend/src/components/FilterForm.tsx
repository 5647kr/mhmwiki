import { useFilterStore } from "../store/filterStore";
import { useQueryHook } from "../hook/useQueryHook";
import { ChevronLeft, CircleAlert } from "lucide-react";
import { useState } from "react";

export default function FilterForm({
  handleApplyFilter,
  handleActiveFilterForm,
  toggleFilterForm,
}: {
  handleApplyFilter: () => void;
  handleActiveFilterForm: () => void;
  toggleFilterForm: boolean;
}) {
  const { data } = useQueryHook({
    key: ["filterData"],
    path: "filter",
  });

  const filterState = useFilterStore((state) => state.filterState);
  const setFilterState = useFilterStore((state) => state.setFilterState);
  const filterReset = useFilterStore((state) => state.filterReset);

  const [isPopupShow, setIsPopupShow] = useState(false);

  return (
    <article
      className={`
    h-[calc(100vh-40px)] w-[calc(100vw-44px)] max-w-100 fixed left-5 top-5 bg-white rounded-[10px] p-5 px-2.5 shadow-[0_2px_4px_#e0e0e0] z-40 border border-[#e0e0e0]
    transition-[translate,opacity] duration-500 ease-in-out
    ${
      toggleFilterForm
        ? "opacity-100 translate-x-0"
        : "opacity-0 -translate-x-400"
    }
  `}
    >
      <section className="w-full h-full overflow-auto">
        {/* filterGroup */}
        <div className="flex flex-col justify-center gap-5">
          {/* SERIES */}
          <div className="w-full relative">
            <h2 className="subHeadingTitle flex gap-2.5 items-center">
              SERIES
              <span
                className="hidden lg:flex items-center gap-2.5"
                onMouseEnter={() => setIsPopupShow(true)}
                onMouseLeave={() => setIsPopupShow(false)}
              >
                <CircleAlert size={18} />
                <span className="text-xs font-normal">시리즈 정보</span>
              </span>
            </h2>

            <ul className="flex flex-wrap justify-start gap-2.5 mt-2.5">
              {data?.items.series.map((item: Series) => (
                <li key={item.id}>
                  <label className="text-sm lg:text-base font-bold p-2 block w-20 bg-white rounded-[10px] border border-[#e0e0e0] cursor-pointer has-checked:bg-[#606060] has-checked:text-white text-center">
                    <input
                      type="checkbox"
                      className="a11y-hidden"
                      onChange={() => setFilterState("series", item.id)}
                      checked={filterState.series.includes(item.id)}
                    />
                    {item.title}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {isPopupShow && (
            <article className="absolute top-80 left-2.5 w-max max-w-none bg-white rounded-sm p-2.5 border border-[#e0e0e0] shadow-[0_2px_4px_rgba(96,96,96,0.25)] z-40">
              <div className="flex flex-col lg:flex-row gap-0 items-start">
                {/* 1~3세대 */}
                <div>
                  <table className="text-xs text-[#a0a0a0] mt-2.5 table-auto border-collapse">
                    <thead>
                      <tr className="bg-[#eee] whitespace-nowrap">
                        <th className="w-fit border border-[#e0e0e0]">분류</th>
                        <th className="w-fit border border-[#e0e0e0]">본편</th>
                        <th className="w-fit border border-[#e0e0e0]">
                          확장편
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-center font-semibold">
                      <tr>
                        <td rowSpan={2} className="border border-[#e0e0e0] p-1">
                          1세대
                        </td>
                        <td className="border border-[#e0e0e0] p-1">
                          몬스터 헌터[MH]
                          <br />
                          <span className="text-[10px] font-normal">
                            PS 2004.03.11
                          </span>
                        </td>
                        <td className="border border-[#e0e0e0] p-1">
                          몬스터 헌터 G[MHG]
                          <br />
                          <span className="text-[10px] font-normal">
                            PS 2005.01.20 / Wii 2009.04.23
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="border border-[#e0e0e0] p-1">
                          몬스터 헌터 포터블[MHP]
                          <br />
                          <span className="text-[10px] font-normal">
                            PSP 2006.09.21(한국)
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td rowSpan={2} className="border border-[#e0e0e0] p-1">
                          2세대
                        </td>
                        <td className="border border-[#e0e0e0] p-1">
                          몬스터 헌터 도스[MH2]
                          <br />
                          <span className="text-[10px] font-normal">
                            PS2 2006.02.16
                          </span>
                        </td>
                        <td className="border border-[#e0e0e0] bg-[#e0e0e0] p-1"></td>
                      </tr>
                      <tr>
                        <td className="border border-[#e0e0e0] p-1">
                          몬스터 헌터 포터블 세컨드[MHP2]
                          <br />
                          <span className="text-[10px] font-normal">
                            PSP 2007.08.28(한국)
                          </span>
                        </td>
                        <td className="border border-[#e0e0e0] p-1">
                          몬스터 헌터 포터블 세컨드 G[MHP2G]
                          <br />
                          <span className="text-[10px] font-normal">
                            PSP 2008.03.29(한국) / iOS 2014.05.08(서비스 종료)
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td rowSpan={2} className="border border-[#e0e0e0] p-1">
                          3세대
                        </td>
                        <td className="border border-[#e0e0e0] p-1">
                          몬스터 헌터 트라이[MH3]
                          <br />
                          <span className="text-[10px] font-normal">
                            Wii 2009.08.01(일본)
                          </span>
                        </td>
                        <td className="border border-[#e0e0e0] p-1">
                          몬스터 헌터 트라이 G[MH3G]
                          <br />
                          <span className="text-[10px] font-normal">
                            3DS 2011.12.11(일본) / Wii 2012.12.08(일본)
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-[#e0e0e0] p-1">
                          몬스터 헌터 포터블 서드[MHP3]
                          <br />
                          <span className="text-[10px] font-normal">
                            PSP 2010.12.01(한국) / PS3 2011.08(일본)
                          </span>
                        </td>
                        <td className="border border-[#e0e0e0] bg-[#e0e0e0] p-1"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* 4~6 세대 */}
                <div>
                  <table className="text-xs text-[#a0a0a0] mt-2.5 table-auto border-collapse">
                    <thead>
                      <tr className="bg-[#eee] whitespace-nowrap">
                        <th className="w-fit border border-[#e0e0e0] border-l-0">
                          분류
                        </th>
                        <th className="w-fit border border-[#e0e0e0]">본편</th>
                        <th className="w-fit border border-[#e0e0e0]">
                          확장편
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-center font-semibold">
                      <tr className="whitespace-nowrap">
                        <td
                          rowSpan={2}
                          className="border border-[#e0e0e0] border-l-0 p-1"
                        >
                          4세대
                        </td>
                        <td className="border border-[#e0e0e0] p-1">
                          몬스터 헌터 4[MH4]
                          <br />
                          <span className="text-[10px] font-normal">
                            3DS 2013.12.14(한국)
                          </span>
                        </td>
                        <td className="border border-[#e0e0e0] p-1">
                          몬스터 헌터 4G[MH4G]
                          <br />
                          <span className="text-[10px] font-normal">
                            3DS 2015.03.26
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-[#e0e0e0] p-1">
                          몬스터 헌터 크로스[MHX]
                          <br />
                          <span className="text-[10px] font-normal">
                            3DS 2015.11.28(일본)
                          </span>
                        </td>
                        <td className="border border-[#e0e0e0] p-1">
                          몬스터 헌터 더블크로스[MHXX]
                          <br />
                          <span className="text-[10px] font-normal">
                            3DS 2017.03.18(일본) / NS 2017.12.01(한국)
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td
                          rowSpan={2}
                          className="border border-[#e0e0e0] border-l-0 p-1"
                        >
                          5세대
                        </td>
                        <td className="border border-[#e0e0e0] p-1">
                          몬스터 헌터 월드[MHW]
                          <br />
                          <span className="text-[10px] font-normal">
                            PS4, XB1 2018.01.26 / PC 2018.08.10
                          </span>
                        </td>
                        <td className="border border-[#e0e0e0] p-1">
                          몬스터 헌터 월드 아이스본[MHW:IB]
                          <br />
                          <span className="text-[10px] font-normal">
                            PS4, XBO 2019.09.06 / PC 2020.01.10
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-[#e0e0e0] p-1">
                          몬스터 헌터 라이즈[MHR]
                          <br />
                          <span className="text-[10px]  font-normal">
                            NS 2021.03.26 / PC 2022.01.13 / 콘솔 2023.01.20
                          </span>
                        </td>
                        <td className="border border-[#e0e0e0] p-1">
                          몬스터 헌터 라이즈 선브레이크[MHR:SB]
                          <br />
                          <span className="text-[10px] font-normal">
                            NS, PC 2022.06.30 / 콘솔 2023.04.28
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td
                          rowSpan={2}
                          className="border border-[#e0e0e0] border-l-0 p-1"
                        >
                          6세대
                        </td>
                        <td rowSpan={2} className="border border-[#e0e0e0] p-1">
                          몬스터 헌터 와일즈[MHWs]
                          <br />
                          <span className="text-[10px] font-normal">
                            2025.02.28
                          </span>
                        </td>
                        <td
                          rowSpan={2}
                          className="border border-[#e0e0e0] bg-[#e0e0e0] p-1"
                        ></td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </article>
          )}

          {/* TYPE */}
          <div className="w-full">
            <h2 className="subHeadingTitle">TYPE</h2>
            <ul className="flex flex-wrap gap-2.5 mt-2.5">
              {data?.items.type.map((item: Type) => (
                <li key={item.id}>
                  <label className="text-sm lg:text-base font-bold p-2 block w-20 bg-white rounded-[10px] border border-[#e0e0e0] cursor-pointer has-checked:bg-[#606060] has-checked:text-white text-center">
                    <input
                      type="checkbox"
                      className="a11y-hidden"
                      onChange={() => setFilterState("type", item.title)}
                      checked={filterState.type.includes(item.title)}
                    />
                    {item.title}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* WEAKNESS */}
          <div className="w-full">
            <h2 className="subHeadingTitle">WEAKNESS</h2>
            <ul className="flex flex-wrap gap-2.5 mt-2.5">
              {data?.items.weak.map((item: Weak) => (
                <li key={item.id}>
                  <label className="text-sm lg:text-base font-bold p-2 block w-20 bg-white rounded-[10px] border border-[#e0e0e0] cursor-pointer has-checked:bg-[#606060] has-checked:text-white text-center">
                    <input
                      type="checkbox"
                      className="a11y-hidden"
                      onChange={() => setFilterState("weak", item.id)}
                      checked={filterState.weak.includes(item.id)}
                    />
                    {item.title}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* actionGroup */}
        <div className="float-right flex gap-5">
          <button
            onClick={filterReset}
            className="py-2.5 px-5 text-sm lg:text-base bg-white rounded-[10px] border border-[#e0e0e0] font-bold cursor-pointer"
          >
            RESET
          </button>
          <button
            onClick={handleApplyFilter}
            className="py-2.5 px-5 text-sm lg:text-base bg-white rounded-[10px] border border-[#e0e0e0] font-bold cursor-pointer"
          >
            APPLY
          </button>
        </div>
      </section>

      <button
        onClick={handleActiveFilterForm}
        className="absolute top-5 -right-6 bg-white shadow-[0_2px_4px_#e0e0e0] rounded-r-sm p-1 z-30 cursor-pointer"
      >
        <ChevronLeft className="w-5 lg:w-6 h-5 lg:h-6" />
      </button>
    </article>
  );
}
