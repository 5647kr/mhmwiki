export default function QuickMenu({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-18 aspect-square rounded-[50%] bg-white border border-[#e0e0e0] shadow-[0_2px_4px_rgba(96,96,96,0.25)]">
      {children}
    </div>
  );
}
