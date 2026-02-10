interface FetchDataProps {
  path: string;
  page?: number | unknown;
  filter?: {
    series: string[];
    type: string[];
    weak: string[];
  };
}

export default async function fetchData({
  path,
  page,
  filter,
}: FetchDataProps) {
  const baseUrl = `http://localhost:3000/${path}`;
  const url = new URL(baseUrl);

  if (page) {
    url.searchParams.append("_page", String(page));
    url.searchParams.append("_limit", "20");
  }

  if (filter) {
    filter.series.forEach((series) => url.searchParams.append("seriesId_like", series));
    filter.type.forEach((type) => url.searchParams.append("type_like", type));
    filter.weak.forEach((weak) => url.searchParams.append("weakEl_like", weak));
  }

  const response = await fetch(url.toString());

  if (!response.ok) throw new Error("fetch 실패");

  return response.json();
}
