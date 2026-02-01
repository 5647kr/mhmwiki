import type { InputHTMLAttributes } from "react";

export default function CheckBox({
  children,
  ...props
}: {
  children: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <label className="text-base py-2 px-4 bg-[#eee] rounded-sm cursor-pointer">
        <input type="checkbox" {...props} className="hidden" />
        {children}
      </label>
    </>
  );
}
