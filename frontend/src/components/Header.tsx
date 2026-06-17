import { Search, X } from "lucide-react";
import { NavLink } from "react-router";

export default function Header({
  showSearchForm,
  handleSearchForm,
}: {
  showSearchForm: boolean;
  handleSearchForm: () => void;
}) {
  return (
    <header className="bg-(--black) flex border-b-2 border-(--red)">
      <h1 className="flex justify-center items-center syne font-black headingTitle bg-(--red) text-(--white) py-2.5 px-5">
        MHMWIKI
      </h1>

      <nav className="w-75">
        <ul className="flex h-full w-full">
          <li className="w-full h-full">
            <NavLink
              className={({ isActive }) =>
                `w-full h-full flex justify-center items-center small ${
                  isActive
                    ? "text-(--red) bg-[#1a1a1a]"
                    : "text-(--grey) bg-(--black)"
                }`
              }
              to="/"
            >
              홈
            </NavLink>
          </li>
          <li className="w-full h-full">
            <NavLink
              className={({ isActive }) =>
                `w-full h-full flex justify-center items-center small ${
                  isActive
                    ? "text-(--red) bg-[#1a1a1a]"
                    : "text-(--grey) bg-(--black)"
                }`
              }
              to="/history"
            >
              연표
            </NavLink>
          </li>
          <li className="w-full h-full">
            <NavLink
              className={({ isActive }) =>
                `w-full h-full flex justify-center items-center small ${
                  isActive
                    ? "text-(--red) bg-[#1a1a1a]"
                    : "text-(--grey) bg-(--black)"
                }`
              }
              to="/loullete"
            >
              룰렛
            </NavLink>
          </li>
          <li className="w-full h-full">
            <NavLink
              className={({ isActive }) =>
                `w-full h-full flex justify-center items-center small ${
                  isActive
                    ? "text-(--red) bg-[#1a1a1a]"
                    : "text-(--grey) bg-(--black)"
                }`
              }
              to="/charms"
            >
              호석
            </NavLink>
          </li>
          <li className="w-full h-full">
            <NavLink
              className={({ isActive }) =>
                `w-full h-full flex justify-center items-center small ${
                  isActive
                    ? "text-(--red) bg-[#1a1a1a]"
                    : "text-(--grey) bg-(--black)"
                }`
              }
              to="/report"
            >
              제보
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="ml-auto">
        <button
          type="button"
          onClick={handleSearchForm}
          className="w-full h-full p-5"
        >
          {showSearchForm ? (
            <X size={20} stroke="var(--grey)" strokeWidth={2} />
          ) : (
            <Search size={20} stroke="var(--grey)" strokeWidth={2} />
          )}
        </button>
      </div>
    </header>
  );
}
