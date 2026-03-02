import type React from "react";

export default function InfoWrap({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 rounded-[10px] border border-[#e0e0e0] h-full w-full hover:shadow-[0_2px_4px_rgba(96,96,96,0.25)] duration-500 transition-shadow">
      <h2 className="pb-2 border-b border-dashed border-[#e0e0e0] mb-5 text-base lg:text-lg font-bold">
        {title}
      </h2>
      {children}
    </div>
  );
}
