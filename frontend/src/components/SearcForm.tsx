import { Search } from "lucide-react";

export default function SearcForm() {
  return (
    <form className="bg-(--black) border border-(--dgrey) py-2.5 px-5 absolute top-20 right-5 flex items-center gap-2.5 w-60 z-10">
      <Search size={14} stroke="var(--grey)" />
      <input type="text" className="small focus:outline-0 text-(--grey) flex-1" />
    </form>
  );
}
