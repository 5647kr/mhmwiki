import { useFilterStore } from "../store/filterStore";
import { useQueryHook } from "../hook/useQueryHook";

export default function FilterForm({
  handleApplyFilter,
  activeFilterForm,
}: {
  handleApplyFilter: () => void;
  activeFilterForm: boolean;
}) {
  const { data } = useQueryHook({
    key: ["filterData"],
    path: "filter",
  });

  const filterState = useFilterStore((state) => state.filterState);
  const setFilterState = useFilterStore((state) => state.setFilterState);
  const filterReset = useFilterStore((state) => state.filterReset);

  return (
    <section
      className={`col-span-full sticky top-21.5 z-20 bg-[#eee] -mx-4 sm:-mx-5 lg:-mx-6 transition-[max-height, opacity] duration-500 ease inset-shadow-[0_-4px_4px_#e0e0e0] ${
        activeFilterForm
          ? "max-h-500 opacity-100 p-10"
          : "max-h-0 opacity-0 py-0 px-10 overflow-hidden"
      }`}
    >
      {/* filterGroup */}
      <div
        className={`flex flex-col justify-center gap-5 lg:flex-row pb-5 border-b border-[#eee]`}
      >
        <div className="w-full">
          <h2 className="text-lg font-bold">SERIES</h2>
          <ul className="flex gap-2.5 flex-wrap mt-2.5">
            {data?.items.series.map((item: Series) => (
              <li key={item.id} className="w-30">
                <label className="w-full block text-base font-semibold py-2 px-4 bg-white rounded-[10px] cursor-pointer has-checked:bg-[#606060] has-checked:text-white text-center">
                  <input
                    type="checkbox"
                    className="a11y-hidden"
                    onChange={() => setFilterState("series", item.id)}
                    checked={filterState.series.includes(item.id)}
                  />
                  <abbr
                    className="w-full block h-full no-underline text-sm lg:text-base"
                    title={item.fullName}
                  >
                    {item.title}
                  </abbr>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full">
          <h2 className="text-lg font-bold">TYPE</h2>
          <ul className="flex gap-2.5 flex-wrap mt-2.5">
            {data?.items.type.map((item: Type) => (
              <li key={item.id} className="w-30">
                <label className="w-full block text-sm lg:text-base font-semibold py-2 px-4 bg-white rounded-[10px] cursor-pointer has-checked:bg-[#606060] has-checked:text-white text-center">
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
            {data?.items.weak.map((item: Weak) => (
              <li key={item.id} className="w-30">
                <label className="w-full block text-sm lg:text-base font-semibold py-2 px-4 bg-white rounded-[10px] cursor-pointer has-checked:bg-[#606060] has-checked:text-white text-center">
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
          className="py-2.5 px-5 text-sm lg:text-base font-semibold cursor-pointer"
        >
          Reset
        </button>
        <button
          onClick={handleApplyFilter}
          className="py-2.5 px-5 text-sm lg:text-base bg-[#606060] rounded-[10px] text-white font-semibold cursor-pointer"
        >
          Apply Filter
        </button>
      </div>
    </section>
  );
}
