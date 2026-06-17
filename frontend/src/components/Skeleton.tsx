import { Image } from "lucide-react";

export default function Skeleton() {
  return (
    <div className="border border-(--lgrey) bg-(--white) relative">
      <span className="bg-(--lgrey) text-(--white) small w-19.5 h-10 absolute top-5 right-5" />
      <Image size={180} stroke="var(--dgrey)" className="py-5 mx-auto" />
      <div className="bg-(--cream) p-2.5 border-t border-(--lgrey) flex flex-col gap-2.5">
        <span className="w-full h-7.5 bg-(--lgrey) rounded-sm" />
        <span className="w-[50%] h-6 bg-(--lgrey) rounded-sm" />
      </div>
    </div>
  );
}
