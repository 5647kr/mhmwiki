import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { useQueryHook } from "../hook/useQueryHook";
import SearchInput from "./SearchInput";

function MainHeader() {
  return (
    <header className="header">
      <h1 className="text-[28px] lg:text-3xl text-center font-bold mb-10">
        MHMWIKI
      </h1>

      {/* 간단 정보: 컨텐츠 수, 업데이트 일자 */}
      <div className="flex text-[#a0a0a0]">
        <div className="w-full text-center">
          <h2 className="text-2xl lg:text-[26px] font-semibold mb-2.5">
            등록된 몬스터
          </h2>
          <strong className="text-xl lg:text-2xl">247마리</strong>
        </div>
        <div className="w-full text-center">
          <h2 className="text-2xl lg:text-[26px] font-semibold mb-2.5">
            마지막 업데이트
          </h2>
          <strong className="text-xl lg:text-2xl">2026.03.02</strong>
        </div>
      </div>
    </header>
  );
}

function DetailHeader() {
  const { id } = useParams();
  const { data } = useQueryHook({
    key: ["contentData"],
    path: "monster",
  });

  const content = data?.items || [];
  const currentIndex = content.findIndex((item: Content) => item.id === id);

  const prevContent = currentIndex > 0 ? content[currentIndex - 1] : null;
  const nextContent =
    currentIndex < content.length - 1 ? content[currentIndex + 1] : null;

  return (
    <header className="header border-b border-[#eee] sticky top-0 z-40 bg-white flex flex-col lg:gap-0 lg:flex-row items-center justify-around">
      <h1>
        <Link to={"/"} className="text-xl lg:text-2xl font-bold">
          MHMWIKI
        </Link>
      </h1>

      <div className="w-[40%] mt-5 lg:mt-0">
        <SearchInput />
      </div>

      <div className="flex gap-5">
        {prevContent && (
          <Link
            to={`detail/${prevContent?.id}`}
            className="flex gap-2.5 items-center absolute bottom-7.5 left-5 lg:static"
          >
            <ChevronLeft className="w-3 lg:w-4" />
            <span className="text-xs lg:text-base">{prevContent?.name}</span>
          </Link>
        )}
        {nextContent && (
          <Link
            to={`detail/${nextContent?.id}`}
            className="flex gap-2.5 items-center absolute bottom-7.5 right-5 lg:static"
          >
            <span className="text-xs lg:text-base">{nextContent?.name}</span>
            <ChevronRight className="w-3 lg:w-4" />
          </Link>
        )}
      </div>
    </header>
  );
}

export { MainHeader, DetailHeader };
