import { useState, useEffect, useMemo } from "react";
import SearchForm from "../../components/SearchForm";
import Filter from "../../components/Filter";
import { useGridStateStore } from "../../store/gridStateStore";
import { useContentStore } from "../../store/contentStore";
import { Link } from "react-router";
import { GridCard, ListCard } from "../../components/Card";
import { useFilterStore } from "../../store/filterStore";

export default function Home() {
  const gridState = useGridStateStore((state) => state.gridState);
  const [filterActive, setFilterActive] = useState(false);
  const contentData = useContentStore((state) => state.contentData);
  const fetchContentData = useContentStore((state) => state.fetchContentData);
  const filterState = useFilterStore((state) => state.filterState);
  const [appliedFilter, setAppliedFilter] = useState(filterState);

  useEffect(() => {
    if (contentData.length === 0) {
      fetchContentData();
    }
  }, []);

  const handleFilterActive = () =>
    setFilterActive((filterActive) => !filterActive);

  const displayContent = useMemo(() => {
    const { series, type, weak } = appliedFilter;

    const seriesSet = new Set(series);
    const typeSet = new Set(type);
    const weakSet = new Set(weak);

    return contentData.filter((content) => {
      const seriesMatch =
        series.length === 0 || content.seriesId.some((id) => seriesSet.has(id));

      const typeMatch = type.length === 0 || typeSet.has(content.type.split("/")[0]);

      const weakMatch =
        weak.length === 0 || content.weakEl.some((id) => weakSet.has(id));

      return seriesMatch && typeMatch && weakMatch;
    });
  }, [contentData, appliedFilter]);

  const handleApplyFilter = () => {
    setAppliedFilter(filterState);
    handleFilterActive();
  };

  console.log(displayContent)

  return (
    <>
      <SearchForm
        gridState={gridState}
        filterActive={filterActive}
        handleFilterActive={handleFilterActive}
      />
      {filterActive && <Filter handleApplyFilter={handleApplyFilter} />}

      <div className="col-span-full sm:col-[2/8] md:col-[3/11] inset-shadow-[0_0_10px_red]">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 ">
          {displayContent.map((item) => (
            <li key={item.id}>
              <Link to={`/detail/${item.id}`}>
                {gridState ? (
                  <GridCard
                    name={item.name}
                    type={item.type}
                    title={item.title}
                    titleId={item.titleId}
                    icon={item.icon}
                    color={item.color}
                    appliedFilter={appliedFilter}
                  />
                ) : (
                  <ListCard
                    name={item.name}
                    type={item.type}
                    icon={item.icon}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
