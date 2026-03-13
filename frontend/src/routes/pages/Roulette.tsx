import { Disc, Users, X } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { useQueryHook } from "../../hook/useQueryHook";

export default function Roulette() {
  const [activeState, setActiveState] = useState("team");

  const handleActiveState = (state: string) => {
    setActiveState(state);
  };
  return (
    <>
      {/* state 관리 */}
      <div className="fullScreen py-5 flex justify-end gap-2.5">
        <div>
          <button
            onClick={() => handleActiveState("team")}
            className={`flex flex-col items-center text-xs lg:text-sm gap-1 p-1 cursor-pointer bg-white ${
              activeState === "team" ? "text-[#606060]" : "text-[#e0e0e0]"
            }`}
          >
            <Users className="w-5 lg:w-6 h-5 lg:h-6" />팀 생성
          </button>
        </div>
        <div>
          <button
            onClick={() => handleActiveState("roulette")}
            className={`flex flex-col items-center text-xs lg:text-sm gap-1 p-1 cursor-pointer bg-white ${
              activeState === "roulette" ? "text-[#606060]" : "text-[#e0e0e0]"
            }`}
          >
            <Disc className="w-5 lg:w-6 h-5 lg:h-6" />
            룰렛
          </button>
        </div>
      </div>

      {activeState === "team" && <GenerateTeam />}
      {activeState === "roulette" && <RouletteComponents />}
    </>
  );
}

function GenerateTeam() {
  const [member, setMember] = useState("");
  const [personByTeam, setPersonByTeam] = useState<number | "">("");
  const [memberList, setMemberList] = useState<string[]>([]);
  const [teamList, setTeamList] = useState<string[][]>([]);
  const [isCopy, setIsCopy] = useState(false);

  // 팀원 인원수 설정
  const handlePersonByTeam = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    if (rawValue === "") {
      setPersonByTeam("");
      return;
    }

    const value = parseInt(rawValue, 10);

    if (isNaN(value)) return;

    if (value < 1) {
      setPersonByTeam(1);
    } else if (value > 4) {
      setPersonByTeam(4);
    } else {
      setPersonByTeam(value);
    }
  };

  // 맴버 목록 생성
  const handleMemberList = (
    e: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setMember(value);
    const list = value
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name !== "");
    setMemberList(list);
  };

  // 팀 생성
  const generateTeam = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!personByTeam) {
      alert("인원수를 입력해주세요.");
      return;
    }

    if (memberList.length === 0) {
      alert("이름을 입력해주세요.");
      return;
    }

    // 1. 원본 배열 복사 (중요: 원본 memberList를 직접 수정하면 안 됨)
    const shuffled = [...memberList];

    // 2. Fisher-Yates Shuffle 알고리즘 적용
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 3. 팀 나누기 로직
    const result: string[][] = [];
    const num = Number(personByTeam);
    const totalTeams = Math.ceil(shuffled.length / num);

    for (let i = 0; i < totalTeams; i++) {
      const team = shuffled.slice(i * num, (i + 1) * num);
      result.push(team);
    }

    // 4. 결과 상태 업데이트
    setTeamList(result);
  };

  // 리셋
  const resetState = () => {
    setMember("");
    setPersonByTeam("");
    setMemberList([]);
    setTeamList([]);
  };

  const handleCopy = () => {
    if (teamList.length === 0) {
      alert("먼저 팀을 생성해주세요!");
      return;
    }

    const textToCopy = teamList
      .map((teamList, i) => `${i + 1}팀: ${teamList.join(", ")}`)
      .join("\n");

    const finalText = `[팀 편성 결과]\n${textToCopy}`;

    navigator.clipboard.writeText(finalText);

    setIsCopy(true);

    setTimeout(() => {
      setIsCopy(false);
    }, 5000);
  };

  return (
    <section className="fullScreen my-5">
      <div className="flex flex-col xl:flex-row gap-10">
        {/* 팀 생성을 위한 상호작용 */}
        <div className="w-full">
          <p className="text-right subParagraph font-bold">
            {memberList.length}명
          </p>
          <textarea
            className="resize-none p-5 rounded-[10px] border border-[#e0e0e0] w-full h-75 focus:outline-0 text-[#606060] paragraph mt-2.5 overflow-y-auto transparent-scroll"
            placeholder="이름1&#10;이름2&#10;이름3"
            value={member}
            onChange={(e) => handleMemberList(e)}
          />

          <div className="mt-10">
            <p className="subParagraph font-bold">팀당 인원수</p>
            <input
              type="number"
              min={1}
              max={4}
              value={personByTeam}
              onChange={(e) => handlePersonByTeam(e)}
              placeholder="1 ~ 4"
              className="focus:outline-0 p-2.5 rounded-[10px] border border-[#e0e0e0] w-full mt-2.5"
            />
          </div>
          <div className="paragraph mt-5 flex gap-5">
            <button
              onClick={resetState}
              className="py-2.5 border border-[#E63946] text-[#E63946] rounded-[10px] w-full cursor-pointer"
            >
              초기화
            </button>
            <button
              onClick={(e) => generateTeam(e)}
              className="py-2.5 border border-[#606060] rounded-[10px] w-full cursor-pointer"
            >
              팀 생성
            </button>
          </div>
        </div>

        {/* 팀 생성 결과 */}
        <div className="w-full">
          <div className="flex justify-between subParagraph font-bold">
            <p>팀 결과: {teamList.length}팀</p>
            <button
              onClick={handleCopy}
              disabled={isCopy}
              className="cursor-pointer"
            >
              {isCopy ? "복사됨" : "복사"}
            </button>
          </div>

          <ul className="flex flex-col gap-2.5 mt-5">
            {teamList.map((team, i) => (
              <li
                key={i}
                className="flex flex-col gap-2.5 p-5 border border-[#e0e0e0] rounded-[10px] subParagraph hover:shadow-[0_2px_4px_rgba(96,96,96,0.25)]"
              >
                <strong className="pb-2.5 border-b border-[#e0e0e0]">
                  {i + 1}팀
                </strong>
                <p>{team.join(", ")}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

interface RouletteItem {
  name: string;
  weight: number;
  color: string;
}

const ITEMLIST = [
  "회복아이템 금지",
  "부적 금지",
  "복장 금지",
  "덫 금지",
  "섬광, 유인, 거름탄 금지",
  "버프아이템 금지",
  "아이루 금지",
];

const WEAPONLIST = [
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

function RouletteComponents() {
  const [initItem, setInitItem] = useState<string[]>([]);
  const [items, setItems] = useState<RouletteItem[]>([]);
  const [btnText, setBtnText] = useState("시작!");
  const [isProcessing, setIsProcessing] = useState(false);
  const [rouletteState, setRouletteState] = useState("monster");
  const [selectSeriesId, setSelectSeriesId] = useState("r");

  const { data: filter } = useQueryHook({
    key: ["filterData"],
    path: "filter",
  });
  const { data: monster } = useQueryHook({
    key: ["contentData", selectSeriesId],
    path: "monster",
    selectSeriesId: selectSeriesId,
  });

  const MONSTERLIST = monster?.items;

  const wheelRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const isStoppingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let currentData: string[] = [];
    switch (rouletteState) {
      case "monster":
        currentData = MONSTERLIST?.map((item: Content) => item.name) || [];
        break;
      case "item":
        currentData = ITEMLIST;
        break;
      case "weapon":
        currentData = WEAPONLIST;
        break;
      default:
        currentData = MONSTERLIST || [];
    }

    setInitItem(currentData);

    const newItems: RouletteItem[] = currentData.map((name) => ({
      name,
      weight: 1,
      color: `hsl(${Math.random() * 360}, 60%, 70%)`,
    }));

    setItems(newItems);

    rotationRef.current = 0;
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(0deg)`;
    }
  }, [rouletteState, monster]);

  // 초기화 함수
  const resetToDefault = () => {
    const defaultItems = initItem.map((name) => ({
      name,
      weight: 1,
      color: `hsl(${Math.random() * 360}, 60%, 70%)`,
    }));
    setItems(defaultItems);

    rotationRef.current = 0;
    if (wheelRef.current) wheelRef.current.style.transform = `rotate(0deg)`;
  };

  const { gradientStr, labels } = useMemo(() => {
    const totalWeight = items.reduce((a, b) => a + (Number(b.weight) || 0), 0);
    let currentDeg = 0;
    let currentPercent = 0;

    const gStr = items
      .map((item) => {
        const w = Number(item.weight) || 0;
        const nextPercent = currentPercent + (w / totalWeight) * 100;
        const str = `${item.color} ${currentPercent}% ${nextPercent}%`;
        currentPercent = nextPercent;
        return str;
      })
      .join(", ");

    const lbls = items.map((item) => {
      const w = Number(item.weight) || 0;
      const itemDeg = (w / totalWeight) * 360;
      const rotation = currentDeg + itemDeg / 2;
      currentDeg += itemDeg;
      return { name: item.name, rotation };
    });

    return {
      gradientStr: items.length > 0 ? `conic-gradient(${gStr})` : "#374151",
      labels: lbls,
    };
  }, [items]);

  const animate = () => {
    if (!wheelRef.current) return;
    rotationRef.current += velocityRef.current;
    wheelRef.current.style.transform = `rotate(${rotationRef.current}deg)`;

    if (isStoppingRef.current) {
      velocityRef.current *= 0.99;
      if (velocityRef.current < 0.1) {
        velocityRef.current = 0;
        isStoppingRef.current = false;
        setIsProcessing(false);
        setBtnText("시작!");
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        calculateWinner(rotationRef.current % 360);
        return;
      }
    }
    rafRef.current = requestAnimationFrame(animate);
  };

  const handleAction = () => {
    if (items.length < 2) {
      alert("최소 2개 이상의 항목이 필요합니다.");
      return;
    }
    if (isProcessing && btnText === "정지!") {
      setBtnText("멈추는 중...");
      setTimeout(() => {
        isStoppingRef.current = true;
      }, 1500);
      return;
    }
    if (!isProcessing) {
      setIsProcessing(true);
      setBtnText("정지!");
      isStoppingRef.current = false;
      velocityRef.current = 15;
      animate();
    }
  };

  const calculateWinner = (finalDeg: number) => {
    const totalWeight = items.reduce((a, b) => a + (Number(b.weight) || 0), 0);
    let needleDeg = (360 - (finalDeg % 360)) % 360;
    let cumulativeDeg = 0;
    let winner = "";

    for (const item of items) {
      const itemDeg = (item.weight / totalWeight) * 360;
      if (needleDeg >= cumulativeDeg && needleDeg < cumulativeDeg + itemDeg) {
        winner = item.name;
        break;
      }
      cumulativeDeg += itemDeg;
    }
    alert(`🎯 당첨: ${winner}`);
  };

  const addItem = () => {
    const newItem = {
      name: `새 항목 ${items.length + 1}`,
      weight: 1,
      color: `hsl(${Math.random() * 360}, 60%, 70%)`,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (index: number) => {
    if (items.length <= 2) {
      alert("최소 2개 항목은 유지해야 합니다.");
      return;
    }
    setItems(items.filter((_, i) => i !== index));
  };

  const updateWeight = (index: number, value: string) => {
    let num = parseInt(value);
    if (isNaN(num) || num < 1) num = 1;

    const newItems = [...items];
    newItems[index].weight = num;
    setItems(newItems);
  };

  return (
    <>
      <div className="fullScreen">
        <ul className="flex gap-5">
          <li className="flex gap-2.5 items-center">
            <input
              type="radio"
              id="monster"
              name="roulette"
              value={rouletteState}
              checked={rouletteState === "monster"}
              onChange={() => setRouletteState("monster")}
              className="
    appearance-none 
    w-3.5 h-3.5
    border border-[#e0e0e0] 
    rounded-full 
    outline-none 
    cursor-pointer
    checked:bg-[#606060] checked:border-white 
    checked:ring-1 checked:ring-[#606060]
  "
            />
            <label htmlFor="monster">몬스터 룰렛</label>
          </li>
          <li className="flex gap-2.5 items-center">
            <input
              type="radio"
              id="item"
              name="roulette"
              value={rouletteState}
              checked={rouletteState === "item"}
              onChange={() => setRouletteState("item")}
              className="
    appearance-none 
    w-3.5 h-3.5
    border border-[#e0e0e0] 
    rounded-full 
    outline-none 
    cursor-pointer
    checked:bg-[#606060] checked:border-white 
    checked:ring-1 checked:ring-[#606060]
  "
            />
            <label htmlFor="item">아이템 룰렛</label>
          </li>
          <li className="flex gap-2.5 items-center">
            <input
              type="radio"
              id="weapon"
              name="roulette"
              value={rouletteState}
              checked={rouletteState === "weapon"}
              onChange={() => setRouletteState("weapon")}
              className="
    appearance-none 
    w-3.5 h-3.5
    border border-[#e0e0e0] 
    rounded-full 
    outline-none 
    cursor-pointer
    checked:bg-[#606060] checked:border-white 
    checked:ring-1 checked:ring-[#606060]
  "
            />
            <label htmlFor="weapon">무기 룰렛</label>
          </li>
        </ul>
        {rouletteState === "monster" && (
          <select
            value={selectSeriesId}
            onChange={(e) => setSelectSeriesId(e.target.value)}
            className="focus:outline-0"
          >
            {filter?.items.series.map((item: Series) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="fullScreen flex flex-col xl:flex-row gap-20 relative">
        {/* 룰렛 종류 설정 */}

        {/* 룰렛 돌림판 */}
        <div className="flex flex-col gap-5 flex-1">
          <div className="relative w-full aspect-square flex justify-center items-center p-10">
            {/* 룰렛 화살표 */}
            <div className="absolute top-5 z-30 text-[#E63946] text-[30px]">
              ▼
            </div>
            {/* 룰렛 검은 배경 */}
            <div className="w-full aspect-square rounded-[50%] border-10 border-[#1F2937] overflow-hidden relative box-border">
              <div
                className={`w-full h-full rounded-[50%] transition-transform ease-out`}
                ref={wheelRef}
                style={{
                  background: gradientStr,
                }}
              >
                {labels.map((label, i) => (
                  <div
                    key={i}
                    className="absolute top-0 left-0 w-full h-full "
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      transform: `rotate(${label.rotation}deg)`,
                    }}
                  >
                    <div className="absolute top-6 left-[50%] transform -translate-x-[50%] w-17.5 text-center">
                      <span className="text-xs font-bold break-keep text-[#606060]">
                        {label.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 룰렛 중앙 원형 */}
              <div className="absolute top-[50%] left-[50%] tranform -translate-y-[50%] -translate-x-[50%] w-3.5 h-3.5 bg-[#111827] border-2 border-[#EAB308] rounded-[50%] z-25" />
            </div>
          </div>

          {/* 룰렛 버튼 */}
          <div className="flex gap-2.5 justify-center">
            <button
              onClick={handleAction}
              disabled={btnText === "돌리는 중..."}
              className={`w-full py-2.5 rounded-[10px] font-bold text-sm lg:text-base cursor-pointer ${
                btnText === "정지!"
                  ? "bg-[#E63946] text-white"
                  : btnText === "멈추는 중..."
                  ? "bg-[#606060] text-white"
                  : "bg-white border border-[#606060]"
              }`}
            >
              {btnText}
            </button>

            {/* 리셋 버튼 추가 */}
            <button
              onClick={resetToDefault}
              disabled={isProcessing}
              className={`w-full py-2.5 rounded-[10px] font-bold text-sm lg:text-base cursor-pointer bg-white border border-[#E63946] text-[#E63946] ${
                isProcessing ? "opacity-50" : "opacity-100"
              }`}
            >
              초기화
            </button>
          </div>
        </div>

        {/* 제약 목록 */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <span className="subParagraph font-bold">제약 목록</span>
            <button
              onClick={addItem}
              className="p-1 text-xs font-bold cursor-pointer"
            >
              + 추가
            </button>
          </div>

          <ul className="flex flex-col gap-2.5 max-h-[calc(100vh-360px)] pr-2.5 overflow-y-auto py-2.5 transparent-scroll">
            {items.map((item, idx) => (
              <li
                className="flex items-center text-xs lg:text-sm gap-2.5"
                key={idx}
              >
                <div
                  className="w-2.5 h-2.5 rounded-[50%]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[idx].name = e.target.value;
                    setItems(newItems);
                  }}
                  className="flex-1 bg-transparent border-b border-[#e0e0e0] text-xs lg:text-sm focus:outline-0"
                />
                <input
                  type="number"
                  value={item.weight}
                  min="1"
                  onChange={(e) => updateWeight(idx, e.target.value)}
                  className="w-10 focus:outline-0 border-0 text-center text-xs lg:text-sm bg-[#e0e0e0]"
                />
                <button
                  onClick={() => removeItem(idx)}
                  className="cursor-pointer"
                >
                  <X className="w-5 lg:w-5 h-5 lg:h-6" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
