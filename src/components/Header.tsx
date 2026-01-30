import { Link } from "react-router";
import { Search } from "lucide-react";


function MainHeader() {
  return (
    <header className="h-20 shadow-[0_2px_4px_rgba(96,96,96,0.25)] px-4 md:px-8 flex justify-center items-center ">
      <h1 className="text-sm md:text-base lg:text-xl font-bold text-[#606060]">
        <Link to="/" className="p-2">
          MHMWIKI
        </Link>
      </h1>
    </header>
  );
}

function DetailHeader() {
  return (
    <header className="h-20 shadow-[0_2px_4px_rgba(96,96,96,0.25)] px-4 md:px-8 flex items-center">
      <h1 className="text-sm md:text-base lg:text-xl font-bold text-[#606060]">
        <Link to="/" className="p-2">
          MHMWIKI
        </Link>
      </h1>
      <div className="inset-shadow-[0_0_10px_red] p-2.5 mx-auto w-[50%] flex justify-between gap-2.5 border border-[#606060] box-border">
        <input type="text" className="w-full outline-none text-sm md:text-base lg:text-lg box-border" />
        <button className="p-2 box-border">
          <Search size={14} />
        </button>
      </div>
    </header>
  );
}

export { MainHeader, DetailHeader };
