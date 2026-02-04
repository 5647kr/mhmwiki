import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="w-full rounded-sm bg-[#eee] p-2.5 flex items-center gap-2.5">
      <input type="text" placeholder="몬스터의 이름, 별명을 입력해주세요." className="w-full" />
      <button className="p-1">
        <Search size={18} />
      </button>
    </div>
  );
}
