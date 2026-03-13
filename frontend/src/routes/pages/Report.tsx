import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Report() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isWrite, setIsWrite] = useState(false);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (title !== "" || paragraph !== "" || file) {
      setIsWrite(true);
    }
  }, [title, paragraph, file]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const selectFile = e.target.files[0];

      if (selectFile.size > 10 * 1024 * 1024) {
        alert("파일 용량은 10MB를 초과할 수 없습니다.");
        e.target.value = "";
        return;
      }
      setFile(selectFile);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const webhookURL = `${API_URL}${API_KEY}`;

    const formData = new FormData();

    // 메시지 데이터 구성
    const messageData = {
      content: `🔔 **새로운 폼 접수!**\n**제목:** ${title}\n**내용:** ${paragraph}`,
    };

    formData.append("payload_json", JSON.stringify(messageData));

    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch(webhookURL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("성공적으로 전송되었습니다!");
        setTitle("");
        setParagraph("");
        setFile(null);
        navigate(-1);
      } else {
        alert("전송 실패: " + response.statusText);
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("전송이 실패하였습니다. 다시 시도해주십시오.");
    }
  };

  const handleBackPage = () => {
    const isEditing = title !== "" || paragraph !== "" || file;
    const message = isEditing
      ? "작성한 내용은 모두 소실 됩니다. 정말 돌아가시겠습니까?"
      : "이전 페이지로 돌아가시겠습니까?";

    if (window.confirm(message)) {
      navigate(-1);
    }
  };

  return (
    <>
      <section className="col-span-full sm:col-[2/8] lg:col-[3/11] py-10">
        <h1 className="text-center text-xl font-bold">
          헌터 여러분들의 많은 제보를 기다리고 있습니다.
        </h1>
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
          <div className="flex flex-col gap-2.5">
            <label htmlFor="title">
              제목 <span className="text-[#E63946]">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="p-2.5 rounded-[10px] border border-[#a0a0a0] bg-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label htmlFor="paragraph">
              내용 <span className="text-[#E63946]">*</span>
            </label>
            <textarea
              id="paragraph"
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
              className="p-2.5 rounded-[10px] border border-[#a0a0a0] bg-white focus:outline-none resize-none h-80"
            ></textarea>
          </div>
          <div className="flex flex-col gap-2.5">
            <label>첨부파일</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm file:p-2.5 file:rounded-[10px] file:border file:border-[#a0a0a0] file:bg-white file:cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-5 mt-10">
            <button
              onClick={handleBackPage}
              className="py-5 rounded-[10px] w-full border border-[#e0e0e0] cursor-pointer"
            >
              이전 페이지로 돌아가기
            </button>
            <button
              type="submit"
              className={`py-5 rounded-[10px] w-full ${
                isWrite
                  ? "bg-white border border-[#a0a0a0] cursor-pointer"
                  : "bg-[#eee] text-[#e0e0e0] cursor-not-allowed"
              }`}
              disabled={!isWrite}
            >
              제출하기
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
