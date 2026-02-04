export default function CheckBox({
  children,
  onChange,
  checked,
}: {
  onChange: () => void;
  checked: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <label className="w-full block text-base py-2 px-4 bg-[#eee] rounded-sm cursor-pointer has-checked:bg-[#606060] has-checked:text-white text-center">
        <input
          type="checkbox"
          onChange={onChange}
          checked={checked}
          className="a11y-hidden"
        />
        {children}
      </label>
    </>
  );
}
