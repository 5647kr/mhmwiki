import {
  ArrowRight,
  Ban,
  Camera,
  CircleCheck,
  MessageCircleMore,
  Plus,
  SearchAlert,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFetchStore } from "../../store/fetchStore";

interface ReportForm {
  reportType: string;
  monster: string;
  series: string;
  title: string;
  desc: string;
  source: string;
  file: File | null;
}

export default function Report() {
  const series = useFetchStore((state) => state.series);
  const fetchData = useFetchStore((state) => state.fetchData);

  useEffect(() => {
    if (!series) return;

    fetchData("series");
  }, [fetchData]);

  const [reportForm, setReportForm] = useState<ReportForm>({
    reportType: "error",
    monster: "",
    series: "MH",
    title: "",
    desc: "",
    source: "",
    file: null,
  });

  const handleReportForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if ("files" in e.target && e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("파일 용량은 10MB를 초과할 수 없습니다.");
        e.target.value = "";
        return;
      }

      setReportForm((reportForm) => ({
        ...reportForm,
        [e.target.name]: selectedFile,
      }));
      return;
    }

    setReportForm((reportForm) => ({
      ...reportForm,
      [e.target.name]: e.target.value,
    }));
  };

  const submitReportForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    let type = "";

    switch (reportForm.reportType) {
      case "error":
        type = "오류 수정";
        break;
      case "omit":
        type = "정보 누락";
        break;
      case "new":
        type = "신규 발견";
        break;
      case "etc":
        type = "기타";
        break;
      default:
        type = "오류 수정";
    }

    const messageText = `
    🔔 **제보 접수!**
    **제보 유형:** ${type}
    **관련 몬스터:** ${reportForm.monster || "없음"}
    **시리즈:** ${reportForm.series}
    **제목:** ${reportForm.title}
    **내용:** ${reportForm.desc}
    **출처:** ${reportForm.source || "없음"}
  `;

    formData.append("payload_json", JSON.stringify({ content: messageText }));

    if (reportForm.file) {
      formData.append("files[0]", reportForm.file);
    }

    const reportURL = import.meta.env.VITE_DISCORD_REPORT;

    try {
      const response = await fetch(reportURL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("제보가 성공적으로 접수되었습니다. 감사합니다!");
        setReportForm({
          reportType: "error",
          monster: "",
          series: "MH",
          title: "",
          desc: "",
          source: "",
          file: null,
        });

        const fileInput = document.getElementById("file") as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }
      } else {
        alert("제보 전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (error) {
      alert("네트워크 오류 발생");
    }
  };

  return (
    <>
      {/* title */}
      <section className="py-5 px-4 md:px-5 lg:px-6 bg-(--black) ">
        <div className="flex gap-2.5 items-center">
          <hr className="border border-(--red) w-10" />
          <strong className="text-(--red) small font-normal">
            DATA REPORT
          </strong>
        </div>
        <h2 className="my-5 text-[80px] text-(--white) syne font-black leading-20">
          오류 누락
          <br />
          데이터 제보
        </h2>

        <p className="text-(--grey) small ">
          잘못된 정보를 발견하셨나요? 빠진 데이터가 있나요? 헌터 여러분의 제보가
          MHMWIKI를 완성합니다. <br /> 모든 제보는 검토 후 반영됩니다.
        </p>
      </section>

      {/* 제보 유형 선택 */}
      <div className="bg-(--cream)">
        <section className="w-full max-w-[1920px] mx-auto py-5 px-4 md:px-5 lg:px-6 bg-(--cream)">
          <div className="flex items-center gap-2.5 pb-5">
            <h3 className="text-(--grey) small font-normal">제보 유형 선택</h3>
            <hr className="flex-1 border-0.5 border-(--grey)" />
          </div>

          <ul className="flex flex-col gap-2.5 md:flex-row">
            <li className="w-full">
              <label
                className={`${reportForm.reportType === "error" ? "border-(--red)" : "border-(--lgrey)"} border w-full py-5 px-2.5 cursor-pointer flex flex-col gap-2.5 bg-(--white) relative`}
              >
                <TriangleAlert
                  className={`${reportForm.reportType === "error" ? "text-(--black)" : "text-(--grey)"}`}
                />
                <strong
                  className={`${reportForm.reportType === "error" ? "text-(--black)" : "text-(--grey)"} subHeadingTitle font-bold`}
                >
                  오류 수정
                </strong>
                <p
                  className={`${reportForm.reportType === "error" ? "text-(--black)" : "text-(--grey)"} small`}
                >
                  수치, 이름, 속성 등 <br />
                  잘못 표기된 정보
                </p>
                <input
                  type="radio"
                  name="reportType"
                  value="error"
                  className="absolute top-5 right-5 accent-(--red)"
                  checked={reportForm.reportType === "error"}
                  onChange={handleReportForm}
                />
              </label>
            </li>

            <li className="w-full">
              <label
                className={`${reportForm.reportType === "omit" ? "border-(--red)" : "border-(--lgrey)"} border w-full py-5 px-2.5 cursor-pointer flex flex-col gap-2.5 bg-(--white) relative`}
              >
                <Plus
                  className={`${reportForm.reportType === "omit" ? "text-(--black)" : "text-(--grey)"}`}
                />
                <strong
                  className={`${reportForm.reportType === "omit" ? "text-(--black)" : "text-(--grey)"} subHeadingTitle font-bold`}
                >
                  정보 누락
                </strong>
                <p
                  className={`${reportForm.reportType === "omit" ? "text-(--black)" : "text-(--grey)"} small`}
                >
                  누락된 몬스터, 출현 시리즈, <br /> 약점 데이터 등
                </p>
                <input
                  type="radio"
                  name="reportType"
                  value="omit"
                  className="absolute top-5 right-5 accent-(--red)"
                  checked={reportForm.reportType === "omit"}
                  onChange={handleReportForm}
                />
              </label>
            </li>

            <li className="w-full">
              <label
                className={`${reportForm.reportType === "new" ? "border-(--red)" : "border-(--lgrey)"} border w-full py-5 px-2.5 cursor-pointer flex flex-col gap-2.5 bg-(--white) relative`}
              >
                <SearchAlert
                  className={`${reportForm.reportType === "new" ? "text-(--black)" : "text-(--grey)"}`}
                />
                <strong
                  className={`${reportForm.reportType === "new" ? "text-(--black)" : "text-(--grey)"} subHeadingTitle font-bold`}
                >
                  신규 발견
                </strong>
                <p
                  className={`${reportForm.reportType === "new" ? "text-(--black)" : "text-(--grey)"} small`}
                >
                  미등록 몬스터 또는 <br /> 새로 확인된 데이터
                </p>
                <input
                  type="radio"
                  name="reportType"
                  value="new"
                  className="absolute top-5 right-5 accent-(--red)"
                  checked={reportForm.reportType === "new"}
                  onChange={handleReportForm}
                />
              </label>
            </li>

            <li className="w-full">
              <label
                className={`${reportForm.reportType === "etc" ? "border-(--red)" : "border-(--lgrey)"} border w-full py-5 px-2.5 cursor-pointer flex flex-col gap-2.5 bg-(--white) relative`}
              >
                <MessageCircleMore
                  className={`${reportForm.reportType === "etc" ? "text-(--black)" : "text-(--grey)"}`}
                />
                <strong
                  className={`${reportForm.reportType === "etc" ? "text-(--black)" : "text-(--grey)"} subHeadingTitle font-bold`}
                >
                  기타
                </strong>
                <p
                  className={`${reportForm.reportType === "etc" ? "text-(--black)" : "text-(--grey)"} small`}
                >
                  텍스트 오류, 이미지 문제, <br /> ui 오류 등
                </p>
                <input
                  type="radio"
                  name="reportType"
                  value="etc"
                  className="absolute top-5 right-5 accent-(--red)"
                  checked={reportForm.reportType === "etc"}
                  onChange={handleReportForm}
                />
              </label>
            </li>
          </ul>
        </section>
      </div>

      {/* 제보 내용 작성 */}
      <div className="bg-(--white)">
        <section className="w-full max-w-[1920px] mx-auto py-5 px-4 md:px-5 lg:px-6 bg-(--white)">
          <div className="flex items-center gap-2.5 pb-5">
            <h3 className="text-(--grey) small font-normal">제보 내용 작성</h3>
            <hr className="flex-1 border-0.5 border-(--grey)" />
          </div>

          <div>
            <div className="p-2.5 border border-(--grey) bg-(--cream)">
              <h4 className="paragraph syne font-bold text-(--black)">
                REPORT FORM
              </h4>
            </div>
            <form onSubmit={submitReportForm} className="flex flex-col">
              {/* 관련 몬스터 */}
              <div className="flex items-center border-b border-x border-(--grey)">
                <label
                  htmlFor="monster"
                  className="p-2.5 w-24 border-r border-(--grey) flex items-center small"
                >
                  관련 <br />
                  몬스터
                  <p className="text-(--red) text-[10px]">필수</p>
                </label>
                <input
                  type="text"
                  id="monster"
                  name="monster"
                  value={reportForm.monster}
                  onChange={handleReportForm}
                  required
                  autoComplete="off"
                  className="focus:outline-none p-2.5 flex-1 placeholder:text-(--grey) small"
                  placeholder="예) 리오레우스, 네르기간테..."
                />
              </div>

              {/* 시리즈 */}
              <div className="flex items-center border-b border-x  border-(--grey)">
                <label
                  htmlFor="series"
                  className="p-2.5 w-24 border-r border-(--grey) flex items-center small"
                >
                  시리즈
                  <p className="text-(--red) text-[10px]">필수</p>
                </label>
                <select
                  className="focus:outline-none p-2 flex-1 placeholder:text-(--grey) small"
                  name="series"
                  id="series"
                  value={reportForm.series}
                  onChange={handleReportForm}
                >
                  {series.map((item) => (
                    <option value={item.title} key={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* 제목 */}
              <div className="flex items-center border-b border-x  border-(--grey)">
                <label
                  htmlFor="title"
                  className="p-2.5 w-24 border-r border-(--grey) flex items-center small"
                >
                  제목
                  <p className="text-(--red) text-[10px]">필수</p>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={reportForm.title}
                  required
                  autoComplete="off"
                  onChange={handleReportForm}
                  className="focus:outline-none p-2.5 flex-1 placeholder:text-(--grey) small"
                  placeholder="제보 내용을 한 줄로 요약해주세요."
                />
              </div>

              {/* 상세 내용 */}
              <div className="flex items-center border-b border-x  border-(--grey)">
                <label
                  htmlFor="desc"
                  className="w-24 p-2.5  flex items-start justify-center flex-col border-r border-(--grey) h-40 small"
                >
                  상세 <br />
                  내용
                  <p className="text-(--red) text-[10px]">필수</p>
                </label>
                <textarea
                  id="desc"
                  name="desc"
                  value={reportForm.desc}
                  required
                  autoComplete="off"
                  onChange={handleReportForm}
                  className="focus:outline-none p-2.5 flex-1 h-40 resize-none small placeholder:text-(--grey)"
                  placeholder="현재 잘못된 내용과 올바른 내용을 구체적으로 작성해주세요.

예)리오레우스의 용속성 약점이 1로 표기되어 있으나 MHWs 기준 10이 맞습니다.
                "
                />
              </div>

              {/* 출처 */}
              <div className="flex items-center border-b border-x border-(--grey)">
                <label
                  htmlFor="source"
                  className="p-2.5 w-24 border-r border-(--grey) flex items-center small"
                >
                  출처 / 근거
                </label>
                <input
                  type="text"
                  id="source"
                  name="source"
                  value={reportForm.source}
                  autoComplete="off"
                  onChange={handleReportForm}
                  className="focus:outline-none p-2.5 flex-1 placeholder:text-(--grey) small"
                  placeholder="공식 문서, 영상 url, 인게임 직접 확인 등"
                />
              </div>

              {/* 첨부 파일 */}
              <div className="flex items-center border-b border-x  border-(--grey)">
                <label
                  htmlFor="file"
                  className="p-2.5 w-24 border-r border-(--grey) flex items-center small"
                >
                  첨부 파일
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="file"
                  name="file"
                  onChange={handleReportForm}
                  className="focus:outline-none p-2.5 flex-1 placeholder:text-(--grey) small cursor-pointer"
                  placeholder="공식 문서, 영상 url, 인게임 직접 확인 등"
                />
              </div>

              {/* 제보 가이드라인 */}
              <div className="py-10 bg-(--white)">
                <div className="flex items-center gap-2.5 pb-5">
                  <h3 className="text-(--grey) small font-normal">
                    제보 가이드라인
                  </h3>
                  <hr className="flex-1 border-0.5 border-(--grey)" />
                </div>

                <div>
                  <div className="p-2.5 border border-(--grey) bg-(--cream)">
                    <h4 className="paragraph syne font-bold text-(--black)">
                      GUIDELINE
                    </h4>
                  </div>
                  <ul className="flex flex-col border-x border-(--grey)">
                    <li className="p-2.5 border-b border-(--grey) flex gap-2.5 items-center">
                      <CircleCheck stroke="var(--cyan)" strokeWidth={2} />
                      <div>
                        <h5 className="subParagraph text-(--black) font-bold mb-px">
                          구체적으로 작성해주세요.
                        </h5>

                        <p className="small text-(--grey)">
                          어느 작품의 어느 몬스터인지, 무엇이 잘못되었고 무엇이
                          맞는지를 명확히 적어주세요.
                        </p>
                      </div>
                    </li>
                    <li className="p-2.5 border-b border-(--grey) flex gap-2.5 items-center">
                      <Camera />
                      <div>
                        <h5 className="subParagraph text-(--black) font-bold mb-px">
                          스크린샷을 첨부하면 빠른 수정이 가능합니다.
                        </h5>

                        <p className="small text-(--grey)">
                          인게임 화면이나 공략서 사진이 있다면 빠르게
                          반영됩니다.
                        </p>
                      </div>
                    </li>
                    <li className="p-2.5 border-b border-(--grey) flex gap-2.5 items-center">
                      <Ban stroke="var(--red)" strokeWidth={2} />
                      <div>
                        <h5 className="subParagraph text-(--red) font-bold mb-px">
                          중복 제보는 피해주세요.
                        </h5>

                        <p className="small text-(--grey)">
                          같은 내용을 여러 번 제보하면 처리가 지연됩니다
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 제출 버튼 */}
              <div className="py-5 bg-(--white)">
                <button
                  type="submit"
                  className="bg-(--red) w-full p-5 flex items-center justify-between"
                >
                  <span className="text-(--white) subHeadingTitle font-bold">
                    제보 접수하기
                  </span>
                  <ArrowRight size={20} stroke="var(--white)" />
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
