import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { MainHeader, DetailHeader, SubHeader } from "../../components/Header";

export default function Default() {
  const { pathname } = useLocation();

  const isMain = pathname === "/";
  const isDetail = pathname.includes("detail");
  const isSub = !isMain && !isDetail;

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollRestoration />
      {isMain && <MainHeader />}
      {isDetail && <DetailHeader />}
      {isSub && <SubHeader />}
      <main className="mx-4 sm:mx-5 lg:mx-6 grid grid-cols-4 gap-x-4 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6 relative">
        <Outlet />
      </main>
    </div>
  );
}
