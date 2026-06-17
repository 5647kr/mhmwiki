export default function Item() {
  return (
    <div className="border border-(--lgrey) bg-(--white) relative">
      <span className="bg-(--grey) text-(--white) small py-2.5 px-5 absolute top-5 right-5">
        무속성
      </span>
      <img src="https://picsum.photos/200" alt="" className="aspect-square py-5 mx-auto" />
      <div className="bg-(--cream) p-2.5 border-t border-(--lgrey) flex flex-col gap-2.5">
        <h2 className="subHeadingTitle text-[#606060] font-blod">다이묘자자미</h2>
        <ul className="flex gap-2.5 small text-[#a0a0a0]">
          <li>갑각종</li>
          <li>원종</li>
        </ul>
      </div>
    </div>
  );
}
