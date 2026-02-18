export default function BlurWrap({
  activeSeriesId,
}: {
  activeSeriesId: string;
}) {
  const loadingMessages: { [key: string]: string } = {
    a: "최초의 헌터, 코코트 마을의 전설을 기록 중...",
    b: "길드 기사단, G급 수렵 구역의 생태를 분석 중...",
    c: "휴대용 거점, 길드 정찰대가 미지의 땅을 탐색 중...",
    d: "점보 마을의 부흥과 도스(Dos) 생태계 관측 중...",
    e: "설산의 비경, 포케 마을 수호대가 구역을 정찰 중...",
    f: "수해의 수수께끼, 흑룡의 그림자를 추적 중...",
    g: "해룡의 영역, 모가 마을 수중 생태 조사 중...",
    h: "탄지아 항구, 심해의 연옥에 도달하기 위한 분석 중...",
    i: "유쿠모 마을, 온천향의 평화를 위해 아종 조사 중...",
    j: "아뉴단 이동 중, 금기된 영역의 순백 용린을 추적 중...",
    k: "돈도르마 전투 거리, 광룡화 현상 긴급 분석 중...",
    l: "용력원, 4대 몬스터의 세력권을 감시 중...",
    m: "용식선 발진, 유령선과 천혜룡 조사 중...",
    n: "제5기단 신대륙 도착, 고룡 이동 현상 정밀 조사 중...",
    o: "세리에나 전선 기지, 바다 너머 극한지 생태 관측 중...",
    p: "카무라 마을 수호단, 백룡야행의 재앙을 감시 중...",
    q: "왕국 관측대 엘가도, 큐리아와 왕역 삼공을 추적 중...",
    r: "금지된 땅 조사대 '새벽 부대', 미개척지 진입 중...",
  };

  const message = loadingMessages[activeSeriesId] || "데이터 조사 중...";
  return (
    <div className="absolute pt-12.5 inset-0 z-10 flex items-center justify-center overflow-hidden rounded-sm">
      {/* 배경 블러 처리 레이어 */}
      <div className="absolute inset-0 bg-[#1B4965]/80 backdrop-blur-md z-0" />

      {/* 문구 레이어 */}
      <strong className="relative z-50 px-4 text-center text-white font-bold text-lg drop-shadow-lg leading-relaxed">
        {message}
      </strong>
    </div>
  );
}
