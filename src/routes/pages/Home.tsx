import { useState, useEffect } from "react";
import SearchForm from "../../components/SearchForm";
import Filter from "../../components/Filter";
import { useGridStateStore } from "../../store/gridStateStore";
import { useContentStore } from "../../store/contentStore";
import { Link } from "react-router";
import { GridCard, ListCard } from "../../components/Card";

export default function Home() {
  const gridState = useGridStateStore((state) => state.gridState);
  const [filterActive, setFilterActive] = useState(false);
  const contentData = useContentStore((state) => state.contentData);
  const fetchContentData = useContentStore((state) => state.fetchContentData);

  useEffect(() => {
    if (contentData.length === 0) {
      fetchContentData();
    }
  }, []);

  const handleFilterActive = () =>
    setFilterActive((filterActive) => !filterActive);

  return (
    <>
      <SearchForm
        gridState={gridState}
        filterActive={filterActive}
        handleFilterActive={handleFilterActive}
      />
      {filterActive && <Filter handleFilterActive={handleFilterActive} />}

      <div className="col-span-full sm:col-[2/8] md:col-[3/11] inset-shadow-[0_0_10px_red]">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 ">
          {contentData.map((item) => (
            <li key={item.id}>
              <Link to={`/detail/${item.id}`}>
                {gridState ? (
                  <GridCard
                    name={item.name}
                    type={item.type}
                    title={item.title}
                    icon={item.icon}
                    color={item.color}
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
