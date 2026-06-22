import { Outlet, ScrollRestoration } from "react-router";
import Header from "../../components/Header";
import SearcForm from "../../components/SearcForm";
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
      {showSearchForm && <SearcForm />}

      <main>
        <Outlet />
      </main>
    </>
  );
}
