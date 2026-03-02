import { useNavigate } from "react-router";

export default function Charm() {
  const navigate = useNavigate();
  return (
    <div className="col-span-full sm:col-[2/8] lg:col-[3/11] flex flex-col gap-5 justify-center items-center text-3xl font-bold h-[calc(100vh-20px)]">
      <strong>호석 등급 판별 및 검증 개발 중...</strong>
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer px-4 py-2 border border-[#E63946] rounded-md hover:bg-[#E63946] hover:text-white transition-colors"
      >
        이전 페이지로 돌아가기
      </button>
    </div>
  );
}
