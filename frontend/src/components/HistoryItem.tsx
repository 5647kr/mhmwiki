export function HistoryItem(series: Series) {
  return (
    <div className="border-t-2 border-(--red)">
      <img
        src={`https://res.cloudinary.com/dx71aeltq/image/upload/f_auto,q_auto:eco,dpr_auto,c_scale/${series.id}.webp`}
        alt={series.title}
        className="object-cover aspect-video w-full"
      />

      <div className="p-2.5 bg-(--dgrey)">
        <div className="flex items-center gap-2.5 small">
          <span className="text-(--grey)">{series.open}</span>
          <span className="text-(--grey) border border-(--grey) py-1 px-2">
            {series.platform}
          </span>
        </div>
        <h3 className="text-(--white) font-bold py-2.5">{series.fullName}</h3>

        <h4 className="text-(--white)">{series.series}세대</h4>
        <p className="small text-(--grey)">GENERATION</p>
      </div>
    </div>
  );
}

export function HistroySkeleton() {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="border-t-2 border-(--red)">
          <div>...</div>
          <div className="bg-(--dgrey) p-2.5">
            <div className="" />
          </div>
        </div>
      ))}
    </>
  );
}
