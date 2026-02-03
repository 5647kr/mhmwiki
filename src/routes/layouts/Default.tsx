import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { MainHeader, DetailHeader } from "../../components/Header";
import Footer from "../../components/Footer";
import { useContentStore } from "../../store/contentStore";

export default function Default() {
  const location = useLocation();
  const [isMainPage, setIsMainPage] = useState(location.pathname === "/");
  const contentData = useContentStore((state) => state.contentData)

  useEffect(() => {
    setIsMainPage((isMainPage) => (isMainPage = location.pathname === "/"));
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollRestoration />
      {isMainPage ? <MainHeader contentData={contentData} /> : <DetailHeader />}
      <main className="grow mx-4 sm:mx-5 md:mx-6 grid grid-rows-[min-content] grid-cols-4 gap-x-4 sm:grid-cols-8 sm:gap-x-5 md:grid-cols-12 md:gap-x-6 relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
