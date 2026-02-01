import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { MainHeader, DetailHeader } from "../../components/Header";
import Footer from "../../components/Footer";

export default function Default() {
  const location = useLocation();
  const [isMainPage, setIsMainPage] = useState(location.pathname === "/");
  useEffect(() => {
    setIsMainPage((isMainPage) => (isMainPage = location.pathname === "/"));
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollRestoration />
      {isMainPage ? <MainHeader /> : <DetailHeader />}
      <main className="grow mx-4 sm:mx-5 md:mx-6 grid grid-rows-[min-content] grid-cols-4 gap-x-4 sm:grid-cols-8 sm:gap-x-5 md:grid-cols-12 md:gap-x-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
