import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import fetchData from "../api/fetchData";

const IMG_URL =
  "https://res.cloudinary.com/dx71aeltq/image/upload/f_auto,q_auto:eco,dpr_auto,c_scale/";

export default function SearchInput() {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchKeyword]);

  const { data } = useQuery({
    queryKey: ["searchData", debouncedKeyword],
    queryFn: () =>
      debouncedKeyword
        ? fetchData({ path: "monster", search: debouncedKeyword })
        : Promise.resolve({ items: [], totalCount: 0 }),
    enabled: debouncedKeyword.length > 0,
    staleTime: 1000 * 60 * 5,
  });

  const searchResults = data?.items || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(`/detail/${searchResults[0].id}`);
      setSearchKeyword("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <div className="w-full rounded-sm bg-[#eee] p-2.5 flex items-center gap-2.5">
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
            setIsExpanded(false);
          }}
          placeholder="몬스터의 이름, 별명을 입력해주세요."
          className="w-full focus:outline-0 bg-transparent"
        />
        <button type="submit" className="p-1 cursor-pointer">
          <Search size={18} />
        </button>
      </div>

      {/* 결과 드롭다운 */}
      {debouncedKeyword && searchResults.length > 0 && (
        <div className="absolute top-11.5 left-0 w-full bg-white border border-[#eee] rounded-sm z-30 max-h-60 overflow-y-auto">
          <ul className="p-2">
            {(isExpanded ? searchResults : searchResults.slice(0, 1)).map(
              (item: CardContent) => (
                <li
                  key={item.id}
                  className="hover:bg-[#eee] cursor-pointer text-sm rounded-sm overflow-hidden"
                >
                  <Link to={`/detail/${item.id}`} className="p-2 w-full block">
                    <div className="flex gap-5 items-center">
                      <img
                        src={`${IMG_URL + item.icon}`}
                        alt={item.name}
                        className="w-10 aspect-square"
                      />
                      <h3 className="text-base font-semibold">{item.name}</h3>
                    </div>
                  </Link>
                </li>
              )
            )}
          </ul>
          {searchResults.length > 1 && !isExpanded && (
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="w-full p-2 text-sm bg-[#eee] cursor-pointer"
            >
              전체보기 ({searchResults.length}개)
            </button>
          )}
        </div>
      )}
    </form>
  );
}
