import { useNavigate } from "react-router";
import { Frown } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate(); // navigate 함수 생성
  return (
    <div className="col-span-full sm:col-[2/8] md:col-[3/11] h-screen flex justify-center items-center gap-10">
      <Frown size={100} className="text-[#E63946]" />
      <div>
        <strong className="text-center mt-5 text-2xl text-[#E63946]">
          404
          <br />
          Page not found
        </strong>
        <div className="py-2.5">
          <p>페이지를 찾을 수 없습니다.</p>

          <p>페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다.</p>
          <p>입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer px-4 py-2 border border-[#E63946] rounded-md hover:bg-[#E63946] hover:text-white transition-colors"
        >
          이전 페이지로 돌아가기
        </button>
      </div>
    </div>
  );
}
