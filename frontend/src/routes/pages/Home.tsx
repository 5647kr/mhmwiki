import { useState } from "react";
import FilterForm from "../../components/FilterForm";
import SearchForm from "../../components/SearchForm";
import { useFilterStore } from "../../store/filterStore";

export default function Home() {
  const [activeFilterForm, setActiveFilterForm] = useState(false);

  const filterState = useFilterStore((state) => state.filterState);
  const [applyFilter, setApplyFilter] = useState(filterState);

  const handleActiveFilterForm = () => {
    setActiveFilterForm((activeFilterForm) => !activeFilterForm);
  };

  const handleApplyFilter = () => {
    setApplyFilter(filterState);
    handleActiveFilterForm();
  };

  return (
    <>
      <SearchForm
        activeFilterForm={activeFilterForm}
        handleActiveFilterForm={handleActiveFilterForm}
      />
      {activeFilterForm && <FilterForm handleApplyFilter={handleApplyFilter} />}

      <div className="col-span-full sm:col-[2/8] md:col-[3/11] inset-shadow-[0_0_10px_red]">
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
        <h1>Home Component</h1>
      </div>
    </>
  );
}
