const main = document.querySelector("main");
const rouletteWrap = main.querySelector("#roulette");
const rouletteBtn = main.querySelector(".circleBtn");
const rouletteCloseBtn = rouletteWrap.querySelector(".closeBtn");
const teamGen = rouletteWrap.querySelector(".teamGen");
const list = teamGen.querySelector(".team-result ul");

rouletteBtn.addEventListener("click", () => {
  rouletteWrap.classList.add("active");
  document.body.style.overflow = "hidden";
});

rouletteCloseBtn.addEventListener("click", () => {
  rouletteWrap.classList.remove("active");
  document.body.style.overflow = "visible";
});

const total = teamGen.querySelector(".total");
const textarea = teamGen.querySelector("textarea");
const genBtn = teamGen.querySelector(".team-genBtn");
const personNum = teamGen.querySelector("input");
const resetBtn = teamGen.querySelector(".team-resetBtn");
const copyBtn = teamGen.querySelector(".copyBtn");
const resultTxt = teamGen.querySelector(".team-resultBtn h4");

let teamArr = [];
let names = [];
let num;

textarea.addEventListener("input", (e) => {
  const value = e.target.value;
  names = value.trim().split("\n");
  total.textContent = `${names.length}명`;
});

personNum.addEventListener("input", (e) => {
  if (parseInt(e.target.value) < 1) {
    e.target.value = "1";
  }

  if (parseInt(e.target.value) > 4) {
    e.target.value = "4";
  }

  num = parseInt(e.target.value);
});

genBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!num) {
    alert("인원수를 입력해주세요");
    personNum.focus();
    return;
  }

  if (names.length === 0) {
    alert("이름을 1인 이상 입력해주세요");
    textarea.focus();
    return;
  }

  teamArr = generateTeam();

  createTeamItem(teamArr);
  resultTxt.textContent = `결과: ${teamArr.length}팀`;
});

function generateTeam() {
  let result = [];

  for (let i = names.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [names[i], names[j]] = [names[j], names[i]];
  }

  let teamNum = Math.ceil(names.length / num);

  for (let i = 0; i < teamNum; i++) {
    const team = names.slice(i * num, (i + 1) * num);
    result.push(team);
  }

  return result;
}

function createTeamItem(teamArr) {
  list.innerHTML = "";

  const htmlContent = teamArr
    .map((team, index) => {
      return `
      <li>
        <strong>${index + 1}팀</strong>
        <div>
          ${team.map((name) => `<p>${name}</p>`).join("")}
        </div>
      </li>
    `;
    })
    .join("");

  list.innerHTML = htmlContent;
}

resetBtn.addEventListener("click", () => {
  list.innerHTML = "";
  textarea.value = "";
  names = [];
  teamArr = [];
  total.textContent = "0명";
  resultTxt.textContent = "결과: 0팀";
});

copyBtn.addEventListener("click", () => {
  if (teamArr.length === 0) return alert("먼저 팀을 생성해주세요!");

  const textToCopy = teamArr
    .map((team, i) => `${i + 1}팀: ${team.join(", ")}`)
    .join("\n");

  const textCopy = "[팀 편성 결과] \n" + textToCopy;

  navigator.clipboard.writeText(textCopy).then(() => {
    copyBtn.textContent = "복사됨";
    copyBtn.disabled = true;

    setTimeout(() => {
      copyBtn.textContent = "복사";
      copyBtn.disabled = false;
    }, 5000);
  });
});