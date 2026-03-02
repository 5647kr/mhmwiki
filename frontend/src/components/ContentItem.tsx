import { useInView } from "react-intersection-observer";
import { Link } from "react-router";
import { useCardStateStore } from "../store/gridStateStore";
import { GridContentCard, ListContentCard } from "./ContentCard";

export default function ContentItem({
  item,
  applyFilter,
  handleLoadedCount,
}: {
  item: CardContent;
  applyFilter: { series: string[]; type: string[]; weak: string[] };
  handleLoadedCount: () => void;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardState = useCardStateStore((state) => state.cardState);

  return (
    <li
      ref={ref}
      key={item.id}
      className={`border border-[#e0e0e0] shadow-[0_2px_4px_rgba(96,96,96,0.25)] w-full rounded-[10px] overflow-hidden transition-all duration-600 ease-in-out ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-y-7.5"
      } ${cardState ? "aspect-[1/1.3]" : ""}`}
    >
      <Link to={`/detail/${item.id}`} className="block h-full w-full">
        {cardState ? (
          <GridContentCard
            applyFilter={applyFilter.series}
            handleLoadedCount={handleLoadedCount}
            {...item}
          />
        ) : (
          <ListContentCard handleLoadedCount={handleLoadedCount} {...item} />
        )}
      </Link>
    </li>
  );
}
