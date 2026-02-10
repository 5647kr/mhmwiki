function MainHeader() {
  return (
    <header className="p-5 flex flex-col gap-10">
      <h1 className="text-center text-xl font-bold">MHMWIKI</h1>
      <div className="flex justify-center text-[#a0a0a0] text-base">
        <div className="w-full text-center">
          <h2>등록된 몬스터</h2>
          <p className="font-bold">247마리</p>
        </div>
        <div className="w-full text-center">
          <h2>마지막 업데이트</h2>
          <p className="font-bold">2026.02.01</p>
        </div>
      </div>
    </header>
  );
}

function DetailHeader() {
  return (
    <>
      <h1>DetailHeader</h1>
    </>
  );
}

export { MainHeader, DetailHeader };
