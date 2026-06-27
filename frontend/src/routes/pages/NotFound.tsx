import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleNavigatePrevious = () => {
    navigate(-1);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-30 bg-(--black) flex justify-center items-center flex-col">
      <h2 className="text-(--grey) syne text-[80px] font-black">404</h2>
      <hr className="w-20 border border-(--red) mt-15 mb-10" />
      <h3 className="text-(--white) font-black syne headingTitle">
        PAGE NOT FOUND
      </h3>
      <div className="mt-5 mb-30">
        <p className="subParagraph text-(--grey)">
          요청하신 페이지를 찾을 수 없습니다.
        </p>
        <p className="subParagraph text-(--grey)">
          주소가 잘못되었거나 삭제된 페이지입니다.
        </p>
      </div>
      <div className="flex gap-5">
        <button
          type="button"
          onClick={handleNavigateHome}
          className="py-5 px-10 small bg-(--red) text-(--white)"
        >
          홈으로 돌아가기
        </button>
        <button
          type="button"
          onClick={handleNavigatePrevious}
          className="py-5 px-10 small border border-(--grey) text-(--grey)"
        >
          이전 페이지
        </button>
      </div>
    </div>
  );
}
