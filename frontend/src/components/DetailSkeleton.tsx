import { ItemSkeleton } from "./Item";

export default function DetailSkeleton() {
  return (
    <>
      {/* 이미지 영역 스켈레톤 */}
      <div className="bg-(--cream) py-10 px-4 md:px-5 lg:px-6">
        {/* 대형몬스터 / 종별 / 이름 */}
        <div className="w-full max-w-60 h-5 rounded-sm pb-5 bg-(--lgrey)" />

        <div className="flex flex-col md:flex-row gap-2.5 mt-2.5">
          {/* 이미지 */}
          <div className="w-full max-w-100 aspect-square rounded-sm pb-5 bg-(--lgrey)" />

          {/* 우측 기본 정보 */}
          <div className="flex flex-col justify-center gap-2.5">
            {/* 종별 */}
            <div className="w-full max-w-60 h-5 rounded-sm pb-5 bg-(--lgrey)" />
            {/* 이름 */}
            <div className="w-full max-w-100 h-10 rounded-sm pb-5 bg-(--lgrey)" />
            {/* 종별, 간판, 등등 */}
            <div className="w-full max-w-100 h-10 rounded-sm pb-5 bg-(--lgrey)" />
          </div>
        </div>
      </div>

      {/* 이미지 영역 하단 간단 정보 스켈레톤 */}
      <div className="bg-(--cream) border-t border-(--lgrey)">
        <ul className="flex">
          <li className="p-5 border-r border-(--lgrey) w-full">
            <div className="w-full max-w-20 h-6  rounded-sm pb-5 bg-(--lgrey)" />
            <div className="w-full max-w-25 h-6.5 mt-2.5 rounded-sm pb-5 bg-(--lgrey)" />
          </li>
          <li className="p-5 border-r border-(--lgrey) w-full">
            <div className="w-full max-w-20 h-6  rounded-sm pb-5 bg-(--lgrey)" />
            <div className="w-full max-w-25 h-6.5 mt-2.5 rounded-sm pb-5 bg-(--lgrey)" />
          </li>
          <li className="p-5 w-full">
            <div className="w-full max-w-20 h-6  rounded-sm pb-5 bg-(--lgrey)" />
            <div className="w-full max-w-25 h-6.5 mt-2.5 rounded-sm pb-5 bg-(--lgrey)" />
          </li>
        </ul>
      </div>

      {/* 정보 영역 */}
      <div className="bg-(--white) p-10 flex flex-col gap-10">
        {/* 기본 정보 */}
        <div>
          <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
            기본 정보
          </h3>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 py-10">
            <li>
              <div className="w-full max-w-20 h-6  rounded-sm pb-5 bg-(--lgrey)" />
              <div className="w-full max-w-25 h-6.5 mt-2.5 rounded-sm pb-5 bg-(--lgrey)" />
            </li>
            <li>
              <div className="w-full max-w-20 h-6  rounded-sm pb-5 bg-(--lgrey)" />
              <div className="w-full max-w-25 h-6.5 mt-2.5 rounded-sm pb-5 bg-(--lgrey)" />
            </li>
            <li>
              <div className="w-full max-w-20 h-6  rounded-sm pb-5 bg-(--lgrey)" />
              <div className="w-full max-w-25 h-6.5 mt-2.5 rounded-sm pb-5 bg-(--lgrey)" />
            </li>
            <li>
              <div className="w-full max-w-20 h-6  rounded-sm pb-5 bg-(--lgrey)" />
              <div className="w-full max-w-25 h-6.5 mt-2.5 rounded-sm pb-5 bg-(--lgrey)" />
            </li>
          </ul>

          <div>
            <div className="w-full h-6 rounded-sm pb-5 bg-(--lgrey)" />
          </div>
        </div>

        {/* 속성 정보 */}
        <div>
          <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
            속성 정보
          </h3>

          <ul className="flex flex-col md:flex-row gap-5 py-10">
            <li className="w-full">
              <div className="w-full max-w-20 h-6  rounded-sm pb-5 bg-(--lgrey)" />
              <div className="w-full max-w-25 h-6.5 mt-2.5 rounded-sm pb-5 bg-(--lgrey)" />
            </li>
            <li className="w-full">
              <div className="w-full max-w-20 h-6  rounded-sm pb-5 bg-(--lgrey)" />
              <div className="w-full max-w-25 h-6.5 mt-2.5 rounded-sm pb-5 bg-(--lgrey)" />
            </li>
            <li className="w-full">
              <div className="w-full max-w-20 h-6 rounded-sm pb-5 bg-(--lgrey)" />
              <div className="w-full max-w-25 h-6.5 mt-2.5 rounded-sm pb-5 bg-(--lgrey)" />
            </li>
          </ul>
        </div>

        {/* 아이템 효과 정보 */}
        <div>
          <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
            아이템 효과 정보
          </h3>

          <div className="w-full h-50 rounded-sm my-10 bg-(--lgrey)" />
        </div>

        {/* 약점표 */}
        <div>
          <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
            약점표
          </h3>

          <div className="w-full h-50 rounded-sm my-10 bg-(--lgrey)" />
        </div>

        {/* 부위 파괴 정보 */}
        <div>
          <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
            부위 파괴
          </h3>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 py-10">
            <li>
              <div className="w-full max-w-20 h-6  rounded-sm pb-5 bg-(--lgrey)" />
              <div className="w-full max-w-25 h-6.5 mt-2.5 rounded-sm pb-5 bg-(--lgrey)" />
            </li>
            <li>
              <div className="w-full max-w-20 h-6  rounded-sm pb-5 bg-(--lgrey)" />
              <div className="w-full max-w-25 h-6.5 mt-2.5 rounded-sm pb-5 bg-(--lgrey)" />
            </li>
            <li>
              <div className="w-full max-w-20 h-6  rounded-sm pb-5 bg-(--lgrey)" />
              <div className="w-full max-w-25 h-6.5 mt-2.5 rounded-sm pb-5 bg-(--lgrey)" />
            </li>
            <li>
              <div className="w-full max-w-20 h-6  rounded-sm pb-5 bg-(--lgrey)" />
              <div className="w-full max-w-25 h-6.5 mt-2.5 rounded-sm pb-5 bg-(--lgrey)" />
            </li>
          </ul>
        </div>

        {/* 크기 정보 */}
        <div>
          <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
            크기 정보
          </h3>

          <div className="w-full h-20 rounded-sm mt-10 bg-(--lgrey)" />
          <div className="w-full h-10 rounded-sm mt-5 bg-(--lgrey)" />
        </div>

        {/* 연관 몬스터 정보 */}
        <div>
          <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
            연관 몬스터
          </h3>

          <ul className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] border-t border-l border-(--lgrey)">
            <li className="w-full">
              <ItemSkeleton />
            </li>
            <li className="w-full">
              <ItemSkeleton />
            </li>
            <li className="w-full">
              <ItemSkeleton />
            </li>
            <li className="w-full">
              <ItemSkeleton />
            </li>
          </ul>
        </div>

        {/* 생태 정보 */}
        <div>
          <h3 className="subHeadingTitle pl-4 border-l-4 border-(--red) font-bold">
            생태 정보
          </h3>

          <div className="w-full h-40 rounded-sm mt-10 bg-(--lgrey)" />
        </div>
      </div>
    </>
  );
}
