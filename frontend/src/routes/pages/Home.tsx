import { ArrowRight, RotateCw } from "lucide-react";
import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <section className="px-4 md:px-5 lg:px-6 py-10 bg-(--black) flex flex-col lg:flex-row gap-10">
        <div className="w-full">
          <div className="text-(--red) flex items-center gap-2.5 pb-10">
            <hr className="w-full" />
            <h2 className="whitespace-nowrap small w-fit">
              MONSTER HUNTER MONSTER WIKI
            </h2>
            <hr className="w-full" />
          </div>

          <span className="text-[#444] small">2004 - 2026 ALL SERIES</span>

          <div className="pt-5 pb-7.5">
            <h3 className="syne font-black text-(--red) text-[80px] leading-13">
              MON
              <br />
              <span className="syne font-black text-(--grey)">STER</span>
              <br />
              <span className="syne font-black text-(--white)">WIKI</span>
            </h3>
          </div>

          <span className="small text-(--grey) leading-4 block">
            초대 몬스터 헌터부터 와일즈까지 역대 시리즈에 등장한
            <br /> 모든 대형 몬스터의 완전한 데이터베이스
          </span>

          <div className="mt-10">
            <ul className="flex gap-2 border border-(--dgrey)">
              <li className="w-full px-2.5 py-5 border-r border-(--dgrey)">
                <div>
                  <h4 className="syne font-black text-(--white) text-[32px]">
                    200
                  </h4>
                  <p className="text-[#444] small">MONSTER</p>
                </div>
              </li>
              <li className="w-full px-2.5 py-5 border-r border-(--dgrey)">
                <div>
                  <h4 className="syne font-black text-(--white) text-[32px]">
                    20
                  </h4>
                  <p className="text-[#444] small">TITLES</p>
                </div>
              </li>
              <li className="w-full px-2.5 py-5 border-r border-(--dgrey)">
                <div>
                  <h4 className="syne font-black text-(--white) text-[32px]">
                    21<span className="text-(--red) font-bold text-xl">YR</span>
                  </h4>
                  <p className="text-[#444] small">HISTORY</p>
                </div>
              </li>
              <li className="w-full px-2.5 py-5">
                <div>
                  <h4 className="syne font-black text-(--white) text-[32px]">
                    20
                  </h4>
                  <p className="text-[#444] small">TYPE</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* random Content */}
        <div className="w-full mt-10 lg:mt-0">
          {/* random Content Img */}
          <div className="flex justify-center relative">
            <button
              type="button"
              className="bg-[#1a1a1a] border border-[#0f0f0f] p-2.5 absolute left-0 top-0"
            >
              <RotateCw size={20} stroke="#444" />
            </button>
            <img src="https://picsum.photos/200" alt="" />
            <div className="flex gap-2.5 items-center bg-(--red) text-(--white) small p-2.5 w-fit absolute right-0 top-0">
              <span className="w-2.5 h-2.5 rounded-full bg-(--white) animate-bounce" />
              오늘의 몬스터
            </div>
          </div>

          <div className="text-(--red) flex items-center gap-2.5 py-10">
            <hr className="w-full" />
            <h2 className="whitespace-nowrap small w-fit">수룡종</h2>
            <hr className="w-full" />
          </div>

          {/* content Info */}
          <div>
            <h3 className="text-[40px] text-(--white)">안쟈나프</h3>

            <div className="py-5">
              <span className="border border-(--dgrey) bg-[#0c0c0c] text-[#444] small py-1.25 px-2.5">
                화속성
              </span>
              <span className="border border-(--dgrey) bg-[#0c0c0c] text-[#444] small py-1.25 px-2.5 ml-2.5">
                위험도 6/10
              </span>
            </div>

            <Link
              to="#"
              className="group w-full border border-[#1a1a1a] p-2.5 bg-[#0f0f0f] text-[#444] flex justify-between items-center hover:border-[#444] hover:bg-[#1a1a1a] hover:text-(--white)"
            >
              <span className="small">상세 정보 보기</span>
              <ArrowRight size={20} className="group-hover:text-(--red)" />
            </Link>
          </div>
        </div>
      </section>

      {/* filter section */}
      <section>filter</section>

      {/* content section */}
      <section></section>
    </>
  );
}
