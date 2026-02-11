const IMG_URL =
  "https://res.cloudinary.com/dx71aeltq/image/upload/f_auto,q_auto:eco,dpr_auto,c_scale/";

interface GridContentCardProps extends CardContent {
  applyFilter: string[];
}

function GridContentCard(props: GridContentCardProps) {
  const titleContentCard = props.title && props.title.trim() !== "";
  const isTitle =
    (titleContentCard && props.applyFilter.length === 0) ||
    props.titleId?.some((id) => props.applyFilter.includes(id));

  return (
    <div
      className="h-full group"
      style={{ "--hover-color": props.color } as React.CSSProperties}
    >
      <div className="bg-[#a0a0a0] h-[50%] pt-10 px-7.5 pb-0 relative group-hover:bg-(--hover-color) transition-colors duration-300">
        {isTitle && titleContentCard && (
          <strong
            data-content={props.title}
            className="absolute top-2.5 left-1/2 -translate-x-1/2 font-semibold text-white before:content-[attr(data-content)] before:absolute before:inset-0 before:-z-1 group-hover:before:[-webkit-text-stroke:4px_#a0a0a0] transition-colors duration-300"
          >
            {props.title}
          </strong>
        )}
        <img
          src={`${IMG_URL + props.icon}`}
          alt={props.name}
          className="w-full aspect-square scale-100 group-hover:scale-110 transition-transform duration-300 group-hover:drop-shadow-[0_0_20px_#b794f4]"
        />
      </div>
      <div className="h-[50%] flex flex-col items-center justify-end pb-5 gap-2.5">
        <h2 className="text-lg md:text-xl font-bold text-[#606060]">
          {props.name}
        </h2>
        <p className="text-sm md:text-base text-[#a0a0a0]">
          {props.type.split("/")[0]}
        </p>
      </div>
    </div>
  );
}

function ListContentCard(props: CardContent) {
  return (
    <div className="p-2.5 flex gap-2.5 items-center">
      <img
        src={`${IMG_URL + props.icon}`}
        alt={props.name}
        className="w-10 aspect-square"
      />
      <div className="flex items-center flex-row-reverse gap-2.5">
        <h2 className="text-sm font-bold text-[#606060]">{props.name}</h2>
        <p className="text-xs text-[#a0a0a0]">{props.type.split("/")[0]}</p>
      </div>
    </div>
  );
}

export { GridContentCard, ListContentCard };
