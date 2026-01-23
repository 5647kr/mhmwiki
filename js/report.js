const main = document.querySelector("main");
const reportWrap = main.querySelector("#report");
const reportBtn = main.querySelector(".reportBtn");
const closeBtn = reportWrap.querySelector(".closeBtn");
const reportForm = reportWrap.querySelector("form");

reportBtn.addEventListener("click", () => {
  reportWrap.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
  reportWrap.classList.remove("active");
  document.body.style.overflow = "visible";
});

const part1 = "https://discord.com/api/webhooks/1464231926566092887/";
const part2 =
  "YbkMIdkZHA9BpfTUXcDJ8Qv70qPeF6Vt1MrZuabqek7vx7cTjoLybr8Mg2lAfhan8PeS";
const webhookURL = part1 + part2;

reportForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let title = reportForm.querySelector(".title");
  let content = document.querySelector(".content");
  let imageFile = document.querySelector(".imageFile");

  // 1. 전송할 데이터 뭉치(FormData) 생성
  const formData = new FormData();

  // 2. 디스코드 메시지 구성 (JSON 형태의 문자열로 넣어야 함)
  const messageData = {
    content: `🔔 **새로운 폼 접수!**\n**제목:** ${title.value}\n**내용:** ${content.value}`,
  };
  formData.append("payload_json", JSON.stringify(messageData));

  // 3. 이미지 파일 첨부 (파일이 있을 경우만)
  if (imageFile.files[0]) {
    if (imageFile.files[0].size > 10 * 1024 * 1024) {
      alert("파일 용량은 10MB를 초과할 수 없습니다.");
      return;
    }
    formData.append("file", imageFile.files[0]);
  }

  // 4. 디스코드로 전송
  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("성공적으로 전송되었습니다!");

      title.value = "";
      content.value = "";
      imageFile.value = "";
      reportWrap.classList.remove("active");
    } else {
      alert("전송 실패: " + response.statusText);
    }
  } catch (error) {
    console.error("에러 발생:", error);
    alert("오류가 발생했습니다.");
  }
});
