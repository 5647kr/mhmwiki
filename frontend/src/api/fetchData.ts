interface FetchDataProps {
  path: string;
  page?: number | unknown;
  search?: string;
  filter?: {
    series: string[];
    type: string[];
    weak: string[];
  };
}

export default async function fetchData({
  path,
  page,
  search,
  filter,
}: FetchDataProps) {
  const baseUrl = `http://localhost:3000/${path}`;
  const url = new URL(baseUrl);

  if (page) {
    url.searchParams.append("_page", String(page));
    url.searchParams.append("_limit", "20");
  }

  if (filter) {
    filter.series.forEach((series) =>
      url.searchParams.append("seriesId_like", series)
    );
    filter.type.forEach((type) => url.searchParams.append("type_like", type));

    if (filter.weak.length > 0) {
      if (filter.series.length > 0) {
        filter.series.forEach((series) => {
          filter.weak.forEach((weak) => {
            url.searchParams.append("seriesWeak_like", `${series}:${weak}`);
          });
        });
      } else {
        filter.weak.forEach((weak) => {
          url.searchParams.append("WeakEl_like", weak);
        });
      }
    }
  }

  if (search) {
    url.searchParams.append("name_like", search);
  }

  const response = await fetch(url.toString());

  if (!response.ok) throw new Error("fetch 실패");

  const items = await response.json();
  const totalCount = Number(response.headers.get("x-total-count")) || 0;

  return { items, totalCount };
}
