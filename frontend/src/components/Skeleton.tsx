import { Image } from "lucide-react";

export default function Skeleton() {
  return (
    <div className="border-r border-b border-(--lgrey) bg-(--white)">
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
