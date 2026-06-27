import { Image } from "lucide-react";

export function Item(item: Item) {
  const imgURL = import.meta.env.VITE_IMG_URL;

  return (
    <div className="group bg-(--white) shadow-[0_0_0_0.5px_var(--grey)]">
      <div className="p-10">
        <img
          src={imgURL + item.icon}
          alt={item.name}
          className="w-full aspect-square group-hover:scale-110 transition-transform duration-300 group-hover:drop-shadow-[0_0_8px_#b794f4]"
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

export function ItemSkeleton() {
  return (
    <div className="border-r border-t border-(--lgrey) bg-(--white)">
      <div className="p-10">
        <div className="w-full flex items-center justify-center aspect-square">
          <Image size={200} stroke="var(--grey)" />
        </div>
      </div>
      <div className="bg-(--cream) p-2.5 border-t border-(--lgrey) flex flex-col gap-2.5">
        <span className="w-full h-7.5 bg-(--lgrey) rounded-sm" />
        <span className="w-[50%] h-6 bg-(--lgrey) rounded-sm" />
      </div>
    </div>
  );
}
