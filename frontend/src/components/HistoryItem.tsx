import { Image } from "lucide-react";

export function HistoryItem(series: Series) {
  return (
    <div className="border border-(--dgrey) hover:border-[#444] border-t-0">
      <img
        src={`https://res.cloudinary.com/dx71aeltq/image/upload/f_auto,q_auto:eco,dpr_auto,c_scale/${series.id}.webp`}
        alt={series.title}
        className="object-cover aspect-video w-full border-t-2 border-(--red)"
      />

      <div className="p-2.5 bg-(--dgrey)">
        <div className="flex flex-col items-start lg:flex-row lg:items-center gap-2.5 small">
          <span className="text-(--grey)">{series.open}</span>
          <span className="text-(--grey) border border-(--grey) py-1 px-2">
            {series.platform}
          </span>
        </div>
        <h3 className="text-(--white) font-bold pt-2.5 paragraph">
          {series.koTitle}
        </h3>
        <h3 className="text-(--grey) font-bold pb-2.5 subParagraph">
          {series.fullName}
        </h3>

        <h4 className="text-(--white) small">{series.series}세대</h4>
        <p className="small text-(--grey)">GENERATION</p>
      </div>
    </div>
  );
}

export function HistroySkeleton() {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <li
          key={index}
          className="relative w-[50%] px-5 even:self-end before:absolute before:z-10 before:w-4 before:h-4 before:bg-(--red) before:rounded-full before:top-4 
            odd:before:right-0 odd:before:translate-x-1/2 even:before:left-0 even:before:-translate-x-1/2 
            
            after:absolute after:z-5 after:w-8 after:h-8 after:bg-(--black) after:border after:border-(--red) after:rounded-full after:top-2
            odd:after:right-0 odd:after:translate-x-1/2 even:after:left-0 even:after:-translate-x-1/2 "
        >
          <div className="border border-(--dgrey) hover:border-[#444] border-t-0">
            <div className="bg-[#444] aspect-video w-full border-t-2 border-(--red) flex justify-center items-center">
              <Image size={40} stroke="var(--grey)" />
            </div>

            <div className="p-2.5 bg-(--dgrey)">
              <div className="flex flex-col items-start lg:flex-row lg:items-center gap-2.5 small">
                <div className="w-[50%] h-8 bg-(--grey) rounded-sm" />
                <div className="w-[50%] h-8 bg-(--grey) rounded-sm" />
              </div>

              <div className="w-[50%] h-8 bg-(--grey) rounded-sm mt-2.5" />
              <div className="w-[50%] h-8 bg-(--grey) rounded-sm mt-1 mb-2.5" />

              <div className="w-10 h-5 bg-(--grey) rounded-sm" />
              <div className="w-22 h-5 bg-(--grey) rounded-sm mt-1" />
            </div>
          </div>
        </li>
      ))}
    </>
  );
}
