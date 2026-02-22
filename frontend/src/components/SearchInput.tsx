import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useQueryHook } from "../hook/useQueryHook";
import { Link, useNavigate } from "react-router";

export default function SearchInput() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isExpand, setIsExpand] = useState(false);

  const IMG_URL =
    "https://res.cloudinary.com/dx71aeltq/image/upload/f_auto,q_auto:eco,dpr_auto,c_scale/";

  useEffect(() => {
    setIsExpand(false);

    const delayTimer = setTimeout(() => {
      setKeyword(inputValue);
    }, 100);

    return () => clearTimeout(delayTimer);
  }, [inputValue]);

  const { data } = useQueryHook({
    key: ["searchContent", keyword],
    path: "monster",
    search: keyword,
    enabled: keyword.length > 0,
  });

  const searchResult = data?.items || [];

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(inputValue);
    if (searchResult.length > 0) {
      navigate(`/detail/${searchResult[0].id}`);
    }
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      {/* 입력폼 */}
      <div className="flex justify-between gap-2.5 p-2.5 rounded-[10px] border border-[#a0a0a0] bg-[#eee] relative z-10">
        <input
          type="text"
          className="focus:outline-0 w-full text-sm lg:text-base"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder="몬스터의 이름을 입력해주세요."
        />
        <button type="submit" className="cursor-pointer w-4 lg:w-5">
          <Search className="w-4 lg:w-5" />
        </button>
      </div>

      {/* 검색결과목록 */}
      {keyword && searchResult.length > 0 && (
        <div className="absolute w-full border border-[#eee] -mt-3 bg-white pt-4 rounded-[10px] min-h-23.5 ">
          <ul
            className={`${
              isExpand ? "max-h-96 overflow-y-auto" : "max-h-23.5 overflow-hidden"
            } transparent-scroll flex flex-col transition-[max-height] duration-1000 ease-in-out px-1.5 pb-1.5 mr-1.5 mb-1.5`}
          >
            <li className="hover:bg-[#eee] p-3 rounded-[10px] cursor-pointer">
              <Link
                to={`/detail/${searchResult[0].id}`}
                className="flex items-center gap-2.5"
              >
                <img
                  src={`${IMG_URL + searchResult[0].icon}`}
                  alt={searchResult[0].name}
                  className="w-10"
                />
                <span className="text-base lg:text-lg">
                  {searchResult[0].name}
                </span>
              </Link>
            </li>
            {isExpand &&
              searchResult.slice(1).map((item: Content) => (
                <li
                  key={item.id}
                  className="hover:bg-[#eee] p-3 rounded-[10px] cursor-pointer"
                >
                  <Link
                    to={`/detail/${item.id}`}
                    className="flex items-center gap-2.5"
                  >
                    <img
                      src={`${IMG_URL + item.icon}`}
                      alt={item.name}
                      className="w-10"
                    />
                    <span className="text-base lg:text-lg">{item.name}</span>
                  </Link>
                </li>
              ))}
          </ul>
          {searchResult.length > 1 && !isExpand && (
            <button
              type="button"
              onClick={() => setIsExpand(true)}
              className="w-full py-2.5 text-sm bg-[#eee] cursor-pointer rounded-b-[10px]"
            >
              전체보기 ({searchResult.length}개)
            </button>
          )}
        </div>
      )}
    </form>
  );
}
