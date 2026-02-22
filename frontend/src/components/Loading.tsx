export default function Loading() {
  const text = "몬스터 불러오는 중...";
  const letters = text.split("");

  return (
    <div className="col-span-full sm:col-[2/8] lg:col-[3/11] flex justify-center items-center text-3xl py-10 font-bold">
      <style>{`
        @keyframes wave-jump {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-wave-text {
          animation: wave-jump 1.2s infinite ease-in-out;
        }
      `}</style>

      {letters.map((char, index) => (
        <span
          key={index}
          className={`inline-block animate-wave-text ${
            char === " " ? "mx-2" : ""
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}