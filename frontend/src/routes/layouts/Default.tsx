import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { MainHeader, DetailHeader } from "../../components/Header";

export default function Default() {
  const { pathname } = useLocation();

  const isMain = pathname === "/";
  const isDetail = pathname.includes("detail");

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollRestoration />
      {isMain && <MainHeader />}
      {isDetail && <DetailHeader />}
      <main className="mx-4 sm:mx-5 md:mx-6 grid grid-rows-[min-content] grid-cols-4 gap-x-4 sm:grid-cols-8 sm:gap-x-5 md:grid-cols-12 md:gap-x-6 relative pb-5">
        <Outlet />
      </main>
    </div>
  );
}
