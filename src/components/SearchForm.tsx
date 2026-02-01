import { Grid2x2, List } from "lucide-react";
import SearchInput from "../atom/SearchInput";

export default function SearchForm({
  gridState,
  handleGridBtnActive,
  handleListBtnActive,
  filterActive,
  handleFilterActive,
}: {
  gridState: boolean;
  handleGridBtnActive: () => void;
  handleListBtnActive: () => void;
  filterActive: boolean;
  handleFilterActive: () => void;
}) {
  return (
    <div className="-mx-4 sm:-mx-5 md:-mx-6 border-b border-[#e0e0e0] bg-white flex items-center px-4 sm:px-5 md:px-6 justify-around py-5 sticky top-0 col-span-full row-auto">
      {/* 그리드 리스트 토글 버튼 */}
      <div className="relative bg-[#eee] p-1 rounded-sm flex items-center w-16.5 h-9">
        <div
          className={`absolute h-7 w-7 bg-white rounded-sm shadow-sm transition-transform duration-300 ease-in-out ${
            gridState ? "translate-x-0" : "translate-x-7.5"
          }`}
        />

        <button
          onClick={handleGridBtnActive}
          className={`relative z-10 w-full h-full flex justify-center items-center transition-colors duration-300 cursor-pointer ${
            gridState ? "text-[#606060]" : "text-[#a0a0a0]"
          }`}
        >
          <Grid2x2 size={20} />
        </button>

        <button
          onClick={handleListBtnActive}
          className={`relative z-10 w-full h-full flex justify-center items-center transition-colors duration-300 cursor-pointer ${
            !gridState ? "text-[#606060]" : "text-[#a0a0a0]"
          }`}
        >
          <List size={20} />
        </button>
      </div>

      {/* 검색 입력창 */}
      <div className="w-[50%]">
        <SearchInput />
      </div>

      {/* 필터 버튼 */}
      <div>
        <button
          onClick={handleFilterActive}
          disabled={filterActive}
          className={`flex items-center py-2.5 px-5 gap-1.5 rounded-sm text-sm font-bold text-white bg-[#606060] ${
            filterActive
              ? "bg-[#eee] cursor-not-allowed"
              : "bg-[#606060] cursor-pointer"
          }`}
        >
          Filter
          <span
            className={`text-xs bg-white rounded-sm p-0.5 ${
              filterActive ? "text-[#eee]" : "text-[#606060]"
            }`}
          >
            13
          </span>
        </button>
      </div>
    </div>
  );
}
