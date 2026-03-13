import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { useQueryHook } from "../hook/useQueryHook";
import SearchInput from "./SearchInput";

function MainHeader() {
  return (
    <header className="py-10 text-center">
      <h1 className="headingTitle">MHMWIKI</h1>

      <div className="flex px-4 sm:px-5 lg:px-6 gap-4 sm:gap-5 lg:gap-6 mt-10">
        <div className="flex-1 flex flex-col gap-2.5">
          <h2 className="subHeadingTitle text-[#A0A0A0]">등록된 몬스터</h2>
          <strong className="subHeadingTitle font-black">247종</strong>
        </div>
        <div className="flex-1 flex flex-col gap-2.5">
          <h2 className="subHeadingTitle text-[#A0A0A0]">마지막 업데이트</h2>
          <strong className="subHeadingTitle font-black">2026.03.02</strong>
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

      <div className="w-[50%] mt-5 lg:mt-0">
        <SearchInput />
      </div>

      <div className="flex w-full gap-5 mt-2.5 justify-between lg:justify-end lg:w-fit">
        {prevContent && (
          <Link
            to={`detail/${prevContent?.id}`}
            className="flex gap-2.5 items-center"
          >
            <ChevronLeft className="w-5 lg:w-6 h-5 lg:h-6" />
            <span className="text-sm lg:text-base">{prevContent?.name}</span>
          </Link>
        )}
        {nextContent && (
          <Link
            to={`detail/${nextContent?.id}`}
            className="flex gap-2.5 items-center"
          >
            <span className="text-sm lg:text-base">{nextContent?.name}</span>
            <ChevronRight className="w-5 lg:w-6 h-5 lg:h-6" />
          </Link>
        )}
      </div>
    </header>
  );
}

function SubHeader() {
  return (
    <header className="py-10 border-b border-[#eee] sticky top-0 z-40 bg-white flex flex-col lg:gap-0 lg:flex-row items-center justify-around">
      <h1>
        <Link to={"/"} className="headingTitle">
          MHMWIKI
        </Link>
      </h1>
    </header>
  );
}

export { MainHeader, DetailHeader, SubHeader };
