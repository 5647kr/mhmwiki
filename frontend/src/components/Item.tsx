export default function Item(item: any) {
  return (
    <div className="border-r border-b border-(--lgrey) bg-(--white)">
      <div className="p-10">
        <img
          src={`https://res.cloudinary.com/dx71aeltq/image/upload/${item.icon}`}
          alt=""
          className="w-full aspect-square"
        />
      </div>
      <div className="bg-(--cream) p-2.5 border-t border-(--lgrey) flex flex-col gap-2.5">
        <h2 className="subHeadingTitle text-[#606060] font-blod">
          {item.name}
        </h2>
        <ul className="flex gap-2.5 small text-[#a0a0a0]">
          <li>{item.type.split("/")[0]}</li>
          <li>{item.species}</li>
        </ul>
      </div>
    </div>
  );
}
