const BASE_URL =
  "https://res.cloudinary.com/dx71aeltq/image/upload/f_auto,q_auto:eco,dpr_auto,c_scale/";

function GridCard({
  name,
  type,
  title,
  titleId,
  icon,
  color,
  appliedFilter
}: {
  name: string;
  type: string;
  title: string | null;
  titleId: string[] | null;
  icon: string;
  color: string;
  appliedFilter: { series: string[]; type: string[]; weak: string[] };
}) {
  const titleContent = title && title.trim() !== "";
  const isTitle =
    (titleContent && appliedFilter.series.length === 0) ||
    titleId?.some((id) => appliedFilter.series.includes(id));

  return (
    <div
      className="rounded-sm overflow-hidden shadow-[0_2px_4px_#60606040] aspect-[1/1.3] group"
      style={{ "--hover-color": color } as React.CSSProperties}
    >
      <div className="bg-[#a0a0a0] group-hover:bg-(--hover-color) transition-colors duration-300 pt-12.5 px-10 h-[50%] relative group">
        {isTitle && titleContent && (
          <strong
            data-content={title}
            className="absolute top-2.5 left-1/2 -translate-x-1/2 font-semibold text-white before:content-[attr(data-content)] before:absolute before:inset-0 before:-z-1 group-hover:before:[-webkit-text-stroke:4px_#a0a0a0] transition-colors duration-300"
          >
            {title}
          </strong>
        )}
        <img
          className="w-full aspect-square align-top group-hover:scale-110 transition-transform duration-300 group-hover:drop-shadow-[5px_5px_15px_#b794f4]"
          src={BASE_URL + icon}
          alt=""
        />
      </div>
      <div className="bg-white pb-5 h-[50%] text-center flex flex-col justify-end gap-2.5">
        <h2 className="font-bold text-xl">{name}</h2>
        <p className="text-[#a0a0a0] font-medium">{type.split("/")[0]}</p>
      </div>
    </div>
  );
}

function ListCard({
  name,
  type,
  icon,
}: {
  name: string;
  type: string;
  icon: string;
}) {
  return (
    <div className="shadow-[0_2px_4px_#60606040] border border-[#eee] rounded-sm p-2.5 flex gap-2.5 items-center">
      <img src={BASE_URL + icon} alt="" className="w-10 aspect-square" />
      <p className="text-xs text-[#a0a0a0]">{type.split("/")[0]}</p>
      <h2 className="text-sm font-bold">{name}</h2>
    </div>
  );
}

export { GridCard, ListCard };
