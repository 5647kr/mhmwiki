import { fetchContentData, fetchFilterData } from "./fetch.js";

const main = document.querySelector("main");
const actionWrap = main.querySelector("#action");
const rouletteBtn = main.querySelector(".circleBtn");
const rouletteCloseBtn = actionWrap.querySelector(".closeBtn");
const teamGen = actionWrap.querySelector(".teamGen");
const rouletteGen = actionWrap.querySelector(".rouletteGen");
const stateBtn = actionWrap.querySelectorAll(".rouletteState button");
const list = teamGen.querySelector(".team-result ul");
const select = rouletteGen.querySelector(".control select");
let state = "teamGen";
const strongTag = rouletteGen.querySelector("strong");

rouletteBtn.addEventListener("click", () => {
  actionWrap.classList.add("active");
  document.body.style.overflow = "hidden";
});

rouletteCloseBtn.addEventListener("click", () => {
  actionWrap.classList.remove("active");
  document.body.style.overflow = "visible";
});

stateBtn.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    stateBtn.forEach((btn) => {
      btn.parentElement.classList.remove("active");
    });

    e.target.parentElement.classList.add("active");
    state = e.target.value;

    manageState(state);

    if (state === "rouletteGen_monster") {
      await contentDataFetch();
      await filterDataFetch();
      select.style.display = "block";
      strongTag.classList.add("active");
    } else {
      select.style.display = "none";
      strongTag.classList.remove("active");
    }

    if (state.includes("rouletteGen")) {
      manageRouletteList();
    }
  });
});

const contentWrap = {
  teamGen: teamGen,
  rouletteGen: rouletteGen,
};

function manageState(state) {
  Object.keys(contentWrap).forEach((key) => {
    if (state.includes(key)) {
      contentWrap[key].classList.add("active");
    } else {
      contentWrap[key].classList.remove("active");
    }
  });
}

// 팀 편성 컨텐츠 start
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

// 팀 편성 컨텐츠 end

// 몬스터, 무기, 아이템을 룰렛
let rouletteList = [];
let monsterList = [];
let filterMonster = [];
let customList = ["", ""];
const weaponList = [
  "대검",
  "태도",
  "한손검",
  "쌍검",
  "해머",
  "수렵피리",
  "랜스",
  "건랜스",
  "슬래시액스",
  "차지액스",
  "조충곤",
  "라이트보우건",
  "헤비보우건",
  "활",
];
const itemList = [
  "회복아이템 금지",
  "부적 금지",
  "복장 금지",
  "덫 금지",
  "섬광, 유인, 거름탄 금지",
  "버프아이템 금지",
  "아이루 금지",
];
const rouletteBoard = rouletteGen.querySelector(".rouletteBoard");
const actionBtn = rouletteGen.querySelector(".actionBtn");
const addBtn = rouletteGen.querySelector(".itemAddBtn");
const rouletteResetBtn = rouletteGen.querySelector(".resetBtn");

let currentRotation = 0;
let velocity = 0;
const maxVelocity = 12;
let isRunning = false;
let isStopping = false;
let isWaitingToStop = false;
let rafId;

// 몬스터 데이터 fetch
async function contentDataFetch() {
  monsterList = await fetchContentData();

  filterMonsterList("r");
}

// 시리즈 데이터 fetch
async function filterDataFetch() {
  let filterJson = localStorage.getItem("filter");
  if (filterJson) {
    const filterStorage = JSON.parse(filterJson);
    filterRender(filterStorage.series);
    return;
  } else {
    const data = await fetchFilterData();
    localStorage.setItem("filter", JSON.stringify(data));
    filterRender(data.series);
  }
}

function manageRouletteList() {
  if (state.includes("monster")) createRouletteList(filterMonster);
  if (state.includes("weapon")) createRouletteList(weaponList);
  if (state.includes("item")) createRouletteList(itemList);
  if (state.includes("custom")) createRouletteList(customList);
}

function createRouletteList(list) {
  rouletteList = [];
  list.forEach((item) => {
    let obj = {
      name: state.includes("monster") ? item.name : item,
      weight: 1,
      color: `hsl(${Math.random() * 360}, 70%, 80%)`,
    };
    rouletteList.push(obj);
  });

  createInputList();
}

const rouletteUL = rouletteGen.querySelector(".control ul");

function filterRender(data) {
  select.innerHTML = "";
  select.default = "r";

  data.forEach((series) => {
    const option = document.createElement("option");

    option.value = series.id;
    option.textContent = series.title;

    select.appendChild(option);
  });
  select.value = "r";
}

select.addEventListener("input", (e) => {
  const seriesId = e.target.value;

  filterMonsterList(seriesId);
  createInputList();
});

function filterMonsterList(seriesId) {
  filterMonster = monsterList.filter((content) => {
    const seriesArr = content.seriesId.split(",").map((id) => id.trim());
    const seriesMatch = seriesArr.includes(seriesId);

    return seriesMatch;
  });

  filterMonster.sort((a, b) => {
    return a.name.localeCompare(b.name, "ko");
  });
  manageRouletteList();
}

function createInputList() {
  rouletteUL.innerHTML = "";

  rouletteList.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("rouletteItem");
    li.innerHTML = `
      <div style="width:15px; height:15px; background:${item.color}; border-radius:50%"></div>
      <input type="text" value="${item.name}" oninput="updateName(${index}, this.value)" placeholder="새 항목">
      <input type="number" value="${item.weight}" min="1" max="99" oninput="updateWeight(${index}, this.value)">
      <button class="del-btn" onclick="removeItem(${index})">✕</button>
    `;
    rouletteUL.appendChild(li);
  });
  updateRoulette();
}

function updateRoulette() {
  const totalWeight = rouletteList.reduce(
    (a, b) => a + (parseInt(b.weight) || 0),
    0
  );

  let currentPercent = 0;
  let gradientStr = "";
  rouletteList.forEach((item, i) => {
    const w = parseInt(item.weight) || 0;
    const nextPercent = currentPercent + (w / totalWeight) * 100;
    gradientStr += `${item.color} ${currentPercent}% ${nextPercent}%${
      i === rouletteList.length - 1 ? "" : ", "
    }`;
    currentPercent = nextPercent;
  });
  rouletteBoard.style.background = `conic-gradient(${gradientStr})`;

  const existingLabels = rouletteBoard.querySelectorAll(".roulette-label");
  existingLabels.forEach((el) => el.remove());

  let currentDeg = 0;
  rouletteList.forEach((item) => {
    const w = parseInt(item.weight) || 0;
    const itemDeg = (w / totalWeight) * 360;

    // 텍스트를 감쌀 div 생성
    const label = document.createElement("div");
    label.className = "roulette-label";

    const rotation = currentDeg + itemDeg / 2;
    label.style.transform = `rotate(${rotation}deg)`;

    const span = document.createElement("span");
    span.textContent = item.name;

    label.appendChild(span);
    rouletteBoard.appendChild(label);

    currentDeg += itemDeg;
  });
}

function animate() {
  currentRotation += velocity;
  rouletteBoard.style.transform = `rotate(${currentRotation}deg)`;

  if (isStopping && !isWaitingToStop) {
    velocity *= 0.992;

    if (velocity < 0.05) {
      velocity = 0;
      isStopping = false;
      isRunning = false;
      cancelAnimationFrame(rafId);
      actionBtn.textContent = "회전 시작";
      actionBtn.classList.remove("running");
      calculateWinner(currentRotation % 360);
      return;
    }
  }
  rafId = requestAnimationFrame(animate);
}

actionBtn.onclick = () => {
  if (isStopping || isWaitingToStop) return;

  const hasEmptyValue = rouletteList.some((item) => item.name.trim() === "");

  if (hasEmptyValue) {
    alert("항목을 작성해주세요.");

    const emptyIndex = rouletteList.findIndex(
      (item) => item.name.trim() === ""
    );
    const inputs = rouletteUL.querySelectorAll('input[type="text"]');
    if (inputs[emptyIndex]) {
      inputs[emptyIndex].focus();
    }

    return;
  }

  if (!isRunning) {
    isRunning = true;
    velocity = maxVelocity;
    actionBtn.textContent = "정지";
    actionBtn.classList.add("running");

    toggleControls(true);
    animate();
  } else {
    isWaitingToStop = true;
    actionBtn.textContent = "멈추는 중...";
    actionBtn.classList.add("waiting");

    setTimeout(() => {
      isWaitingToStop = false;
      isStopping = true;
    }, 2000);
  }
};

window.updateWeight = (i, v) => {
  rouletteList[i].weight = parseInt(v) || 1;
  updateRoulette();
};
window.updateName = (i, v) => {
  rouletteList[i].name = v;
  updateRoulette();
};
window.removeItem = (i) => {
  if (rouletteList.length > 2) {
    rouletteList.splice(i, 1);
    createInputList();
  }
};
addBtn.onclick = () => {
  rouletteList.push({
    name: "",
    weight: 1,
    color: `hsl(${Math.random() * 360}, 70%, 80%)`,
  });
  createInputList();
};

function toggleControls(disable) {
  addBtn.disabled = disable;

  const delBtns = document.querySelectorAll(".del-btn");
  delBtns.forEach((btn) => (btn.disabled = disable));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => (input.disabled = disable));

  stateBtn.forEach((btn) => (btn.disabled = disable));

  rouletteResetBtn.disabled = disable;
}

function calculateWinner(finalDeg) {
  const totalWeight = rouletteList.reduce(
    (a, b) => a + (parseInt(b.weight) || 0),
    0
  );
  let needleDeg = (360 - (finalDeg % 360)) % 360;
  let cumulativeDeg = 0;
  let winner = "";

  for (let item of rouletteList) {
    const itemDeg = (item.weight / totalWeight) * 360;
    if (needleDeg >= cumulativeDeg && needleDeg < cumulativeDeg + itemDeg) {
      winner = item.name;
      break;
    }
    cumulativeDeg += itemDeg;
  }

  setTimeout(() => {
    alert(`축하합니다! [ ${winner} ] 에 당첨되었습니다!`);
    toggleControls(false);
  }, 500);
}

rouletteResetBtn.addEventListener("click", () => {
  if (state === "rouletteGen_monster") {
    select.value = "r";
    filterMonsterList("r");
  } else {
    manageRouletteList();
  }

  currentRotation = 0;
  rouletteBoard.style.transform = `rotate(0deg)`;
});
