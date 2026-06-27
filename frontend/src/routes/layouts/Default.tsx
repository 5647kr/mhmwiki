import { Outlet, ScrollRestoration } from "react-router";
import Header from "../../components/Header";
import SearchForm from "../../components/SearchForm";
import { useState } from "react";

export default function Default() {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const handleSearchForm = () => {
    setShowSearchForm((showSearchForm) => !showSearchForm);
  };

  return (
    <>
      <ScrollRestoration />

      <Header
        showSearchForm={showSearchForm}
        handleSearchForm={handleSearchForm}
      />
      {showSearchForm && <SearchForm setShowSearchForm={setShowSearchForm} />}

      <main className="bg-(--white) flex flex-col">
        <Outlet />
      </main>
    </>
  );
}
