import { useQuery } from "@tanstack/react-query";
import fetchData from "../api/fetchData";
import { useFilterStore } from "../store/filterStore";

export default function FilterForm({
  handleApplyFilter,
}: {
  handleApplyFilter: () => void;
}) {
  const { data } = useQuery({
    queryKey: ["filterData"],
    queryFn: () => fetchData(`filter`),
  });

  const filterState = useFilterStore((state) => state.filterState);
  const setFilterState = useFilterStore((state) => state.setFilterState);
  const filterReset = useFilterStore((state) => state.filterReset);

  return (
    <div
      className={`col-span-full sticky top-19.25 z-20 bg-[#eee] p-10 -mx-4 sm:-mx-5 md:-mx-6`}
    >
      {/* filterGroup */}
      <div
        className={`flex flex-col justify-center gap-5 md:flex-row pb-5 border-b border-[#eee]`}
      >
        <div className="w-full">
          <h2 className="text-lg font-bold">SERIES</h2>
          <ul className="flex gap-2.5 flex-wrap mt-2.5">
            {data?.series.map((item: Series) => (
              <li key={item.id} className="w-30">
                <label className="w-full block text-base font-semibold py-2 px-4 bg-white rounded-sm cursor-pointer has-checked:bg-[#606060] has-checked:text-white text-center">
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
        <div className="w-full">
          <h2 className="text-lg font-bold">TYPE</h2>
          <ul className="flex gap-2.5 flex-wrap mt-2.5">
            {data?.type.map((item: Type) => (
              <li key={item.id} className="w-30">
                <label className="w-full block text-base font-semibold py-2 px-4 bg-white rounded-sm cursor-pointer has-checked:bg-[#606060] has-checked:text-white text-center">
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
        <div className="w-full">
          <h2 className="text-lg font-bold">WEAKNESS</h2>
          <ul className="flex gap-2.5 flex-wrap mt-2.5">
            {data?.weak.map((item: Weak) => (
              <li key={item.id} className="w-30">
                <label className="w-full block text-base font-semibold py-2 px-4 bg-white rounded-sm cursor-pointer has-checked:bg-[#606060] has-checked:text-white text-center">
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
          className="py-2.5 px-5 bg-white font-semibold"
        >
          Reset
        </button>
        <button
          onClick={handleApplyFilter}
          className="py-2.5 px-5 bg-white font-semibold"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}
