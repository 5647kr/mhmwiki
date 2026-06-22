import { useEffect, useState } from "react";
import { useFetchStore } from "../store/fetchStore";
import { useFilterStore } from "../store/filterStore";

export default function FilterForm() {
  const type = useFetchStore((state) => state.type);
  const series = useFetchStore((state) => state.series);
  const weak = useFetchStore((state) => state.weak);
  const fetchData = useFetchStore((state) => state.fetchData);

  const filterState = useFilterStore((state) => state.filterState);
  const setFilterState = useFilterStore((state) => state.setFilterState);
  const filterReset = useFilterStore((state) => state.filterReset);

  useEffect(() => {
    fetchData("type");
    fetchData("series");
    fetchData("weak");
  }, [fetchData]);

  const isFilterSelected =
    filterState.series.length > 0 ||
    filterState.type.length > 0 ||
    filterState.weak.length > 0;

  return (
    <>
      {/* 시리즈 */}
      <div className="border-b border-(--lgrey) px-1.25 flex items-center">
        <h4 className="h-full py-2.5 text-(--grey) border-r border-(--lgrey) min-w-20 text-center">
          시리즈
        </h4>
        <ul className="py-2.5 px-1.25 flex flex-wrap gap-2.5 w-full overflow-auto scrollbar-none">
          <li className="min-w-15 text-center text-(--red) hover:text-(--grey) hover:cursor-pointer">
            <button
              type="button"
              onClick={() => filterReset("series")}
              className={`${filterState.series.length === 0 ? "text-(--red)" : "text-[#aaa] hover:text-(--grey)"}`}
            >
              전체
            </button>
          </li>
          {series.map((series) => (
            <li className="min-w-15 text-center" key={series.id}>
              <label className="text-[#aaa] hover:cursor-pointer hover:text-(--grey) has-checked:text-(--red)">
                {series.title}
                <input
                  type="checkbox"
                  onChange={() => setFilterState("series", series.id)}
                  checked={filterState.series.includes(series.id)}
                  className="hidden"
                />
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* 종별 */}
      <div className="border-b border-(--lgrey) px-1.25 flex items-center">
        <h4 className="py-2.5 text-(--grey) border-r border-(--lgrey) min-w-20 text-center">
          종별
        </h4>
        <ul className="py-2.5 px-1.25 flex flex-wrap gap-2.5 w-full overflow-auto scrollbar-none">
          <li className="min-w-15 text-center text-(--red) hover:text-(--grey) hover:cursor-pointer">
            <button
              type="button"
              onClick={() => filterReset("type")}
              className={`${filterState.type.length === 0 ? "text-(--red)" : "text-[#aaa] hover:text-(--grey)"}`}
            >
              전체
            </button>
          </li>
          {type.map((type) => (
            <li className="min-w-15 text-center" key={type.id}>
              <label className="text-[#aaa] hover:cursor-pointer hover:text-(--grey) has-checked:text-(--red)">
                {type.title}
                <input
                  type="checkbox"
                  onChange={() => setFilterState("type", type.title)}
                  checked={filterState.type.includes(type.title)}
                  className="hidden"
                />
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* 속성 */}
      <div className="border-b border-(--lgrey) px-1.25 flex items-center">
        <h4 className="py-2.5 text-(--grey) border-r border-(--lgrey) min-w-20 text-center">
          약점
        </h4>
        <ul className="py-2.5 px-1.25 flex flex-wrap gap-2.5 w-full overflow-auto scrollbar-none">
          <li className="min-w-15 text-center text-(--red) hover:text-(--grey) hover:cursor-pointer">
            <button
              type="button"
              onClick={() => filterReset("weak")}
              className={`${filterState.weak.length === 0 ? "text-(--red)" : "text-[#aaa] hover:text-(--grey)"}`}
            >
              전체
            </button>
          </li>
          {weak.map((weak) => (
            <li className="min-w-15 text-center" key={weak.id}>
              <label className="text-[#aaa] hover:cursor-pointer hover:text-(--grey) has-checked:text-(--red)">
                {weak.char}속성
                <input
                  type="checkbox"
                  onChange={() => setFilterState("weak", weak.title)}
                  checked={filterState.weak.includes(weak.title)}
                  className="hidden"
                />
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* 선택한것 */}
      {isFilterSelected && (
        <div className="border-b border-(--lgrey) px-1.25 flex items-center">
          <h4 className="py-2.5 text-(--grey) border-r border-(--lgrey) min-w-20 text-center">
            필터링
          </h4>
          <ul className="py-2.5 px-1.25 flex gap-2.5 w-full overflow-auto scrollbar-none">
            {filterState.series.map((selectedId) => {
              const targetSeries = series.find(
                (item) => item.id === selectedId,
              );
              const displayName = targetSeries
                ? targetSeries.title
                : selectedId;

              return (
                <li className="min-w-15 text-center" key={selectedId}>
                  <label className="text-[#aaa] hover:cursor-pointer hover:text-(--grey) has-checked:text-(--red)">
                    {displayName}
                    <input
                      type="checkbox"
                      onChange={() => setFilterState("series", selectedId)}
                      checked={filterState.series.includes(selectedId)}
                      className="hidden"
                    />
                  </label>
                </li>
              );
            })}

            {filterState.type.map((item, index) => (
              <li className="min-w-15 text-center" key={index}>
                <label className="text-[#aaa] hover:cursor-pointer hover:text-(--grey) has-checked:text-(--red)">
                  {item}
                  <input
                    type="checkbox"
                    onChange={() => setFilterState("type", item)}
                    checked={filterState.type.includes(item)}
                    className="hidden"
                  />
                </label>
              </li>
            ))}

            {filterState.weak.map((selectedId) => {
              const targetSeries = weak.find((item) => item.id === selectedId);
              const displayName = targetSeries ? targetSeries.char : selectedId;

              return (
                <li className="min-w-15 text-center" key={selectedId}>
                  <label className="text-[#aaa] hover:cursor-pointer hover:text-(--grey) has-checked:text-(--red)">
                    {displayName}속성
                    <input
                      type="checkbox"
                      onChange={() => setFilterState("weak", selectedId)}
                      checked={filterState.weak.includes(selectedId)}
                      className="hidden"
                    />
                  </label>
                </li>
              );
            })}
{/* 
            {filterState.weak.map((item, index) => (
              <li className="min-w-15 text-center" key={index}>
                <label className="text-[#aaa] hover:cursor-pointer hover:text-(--grey) has-checked:text-(--red)">
                  {item}속성
                  <input
                    type="checkbox"
                    onChange={() => setFilterState("weak", item)}
                    checked={filterState.weak.includes(item)}
                    className="hidden"
                  />
                </label>
              </li>
            ))} */}
          </ul>
        </div>
      )}
    </>
  );
}
