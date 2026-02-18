import { Link, useParams } from "react-router";
import SearchInput from "./SearchInput";
import { useQueryHook } from "../hook/useQueryHook";
import { ChevronLeft, ChevronRight, Gamepad2, Megaphone } from "lucide-react";

function MainHeader() {
  return (
    <header className="p-5 flex flex-col gap-10 relative">
      <h1 className="text-center text-xl font-bold">MHMWIKI</h1>
      <div className="flex justify-center text-[#a0a0a0] text-base">
        <div className="w-full text-center">
          <h2>등록된 몬스터</h2>
          <p className="font-bold">247마리</p>
        </div>
        <div className="w-full text-center">
          <h2>마지막 업데이트</h2>
          <p className="font-bold">2026.02.01</p>
        </div>
      </div>

      <div className="absolute top-0 right-0 flex gap-2.5">
        <Link to={"/report"} className="flex items-center">
          <Megaphone className="w-3.5 md:w-4" />
          <span className="text-sm md:text-base">제보하기</span>
        </Link>
        <Link to={"/minigame"} className="flex items-center">
          <Gamepad2 className="w-3.5 md:w-4" />
          <span className="text-sm md:text-base">미니게임</span>
        </Link>
      </div>
    </header>
  );
}

function DetailHeader() {
  const { id } = useParams();
  const { data: naviData } = useQueryHook({
    key: ["contentData"],
    path: "monster",
  });

  const allConent = naviData?.items || [];

  const currentIndex = allConent.findIndex((m: Content) => m.id === id);

  const prevContent = currentIndex > 0 ? allConent[currentIndex - 1] : null;
  const nextContent =
    currentIndex < allConent.length - 1 ? allConent[currentIndex + 1] : null;

  return (
    <header className="sm:mx-5 md:mx-6 grid grid-rows-[min-content] sticky top-0 z-40 bg-white grid-cols-4 gap-x-4 sm:grid-cols-8 sm:gap-x-5 md:grid-cols-12 md:gap-x-6 py-5">
      <div className="col-span-full sm:col-[2/8] md:col-[3/11] sm:-mx-5 md:-mx-6 flex justify-between items-center">
        <h1>
          <Link to={"/"} className="p-2.5 text-xl font-bold block">
            MHMWIKI
          </Link>
        </h1>
        <div className="w-[40%]">
          <SearchInput />
        </div>
        <div className="flex gap-5">
          <Link
            to={`/detail/${prevContent?.id}`}
            className="flex items-center text-xs md:text-base"
          >
            <ChevronLeft size={12} />
            {prevContent?.name}
          </Link>
          <Link
            to={`/detail/${nextContent?.id}`}
            className="flex items-center text-xs md:text-base"
          >
            {nextContent?.name}
            <ChevronRight size={12} />
          </Link>
        </div>
      </div>
      <div className="absolute top-0 right-0 flex gap-2.5">
        <Link to={"/report"} className="flex items-center">
          <Megaphone className="w-3.5 md:w-4" />
          <span className="text-sm md:text-base">제보하기</span>
        </Link>
        <Link to={"/minigame"} className="flex items-center">
          <Gamepad2 className="w-3.5 md:w-4" />
          <span className="text-sm md:text-base">미니게임</span>
        </Link>
      </div>
    </header>
  );
}

export { MainHeader, DetailHeader };
