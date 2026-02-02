import { useEffect } from "react";
import CheckBox from "../atom/CheckBox";
import { useFilterStore } from "../store/filterStore";

export default function Filter({
  handleFilterActive,
}: {
  handleFilterActive: () => void;
}) {
  const filterData = useFilterStore((state) => state.filterData);
  const fetchFilterData = useFilterStore((state) => state.fetchFilterData);

  useEffect(() => {
    if (filterData.series.length === 0) {
      fetchFilterData();
    }
  }, []);

  return (
    <div className="col-span-full border border-[#eee] -mt-2.5 z-20 bg-white p-5 rounded-sm shadow-[0_4px_4px_#eee]">
      <div className="flex flex-col gap-10 md:flex-row pb-5 border-b border-[#eee]">
        <div className="w-full">
          <h2 className="font-medium">SEIRES</h2>
          <ul className="flex gap-2.5 flex-wrap mt-2.5">
            {filterData.series.map((item) => (
              <li key={item.id} className="py-2">
                <CheckBox name={item.id}>{item.title}</CheckBox>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full">
          <h2 className="font-medium">TYPE</h2>
          <ul className="flex gap-2.5 flex-wrap mt-2.5">
            {filterData.type.map((item) => (
              <li key={item.id} className="py-2">
                <CheckBox name={item.title}>{item.title}</CheckBox>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full">
          <h2 className="font-medium">WEAK</h2>
          <ul className="flex gap-2.5 flex-wrap mt-2.5">
            {filterData.weak.map((item) => (
              <li key={item.id} className="py-2">
                <CheckBox name={item.id}>{item.title}</CheckBox>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pt-2.5 border-t-[#eee] float-right">
        <button className="py-1 px-2 cursor-pointer">Reset</button>
        <button
          className="py-1 px-2 rounded-sm bg-[#a0a0a0] text-white ml-2 cursor-pointer"
          onClick={handleFilterActive}
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}
