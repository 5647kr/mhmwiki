import { useState, useEffect } from "react";
import SearchForm from "../../components/SearchForm";
import Filter from "../../components/Filter";

export default function Home() {
  const [gridState, setGridState] = useState(() => {
    const saved = sessionStorage.getItem("gridState");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [filterActive, setFilterActive] = useState(false);
  const [filterState, setFilterState] = useState()

  useEffect(() => {
    sessionStorage.setItem("gridState", JSON.stringify(gridState));
  }, [gridState]);

  const handleGridBtnActive = () => setGridState(true);
  const handleListBtnActive = () => setGridState(false);
  const handleFilterActive = () =>
    setFilterActive((filterActive) => !filterActive);

  return (
    <>
      <SearchForm
        gridState={gridState}
        handleGridBtnActive={handleGridBtnActive}
        handleListBtnActive={handleListBtnActive}
        filterActive={filterActive}
        handleFilterActive={handleFilterActive}
      />
      {filterActive && <Filter handleFilterActive={handleFilterActive} />}

      <div className="col-span-full sm:col-[2/8] md:col-[3/11] inset-shadow-[0_0_10px_red]">
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
      </div>
    </>
  );
}
