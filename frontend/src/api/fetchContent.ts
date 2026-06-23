export async function fetchContent({
  page,
  pageNum,
  filterState,
}: {
  page: number;
  pageNum: number;
  filterState: { series: string[]; type: string[]; weak: string[] };
}) {
  try {
    const baseUrl = "http://localhost:3000/monster"; // 개발서버
    //const baseUrl = "https://mhmwiki-backend.vercel.app/monster"; // 배포 서버
    const url = new URL(baseUrl);

    if (page) {
      url.searchParams.append("_page", String(page));
      url.searchParams.append("_limit", "20");
    }

    if (filterState) {
      filterState.series.forEach((series) =>
        url.searchParams.append("seriesId_like", series),
      );
      filterState.type.forEach((type) =>
        url.searchParams.append("type_like", `^${type}`),
      );
      filterState.weak.forEach((weak) =>
        url.searchParams.append("weakEl_like", weak),
      );
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error("content fetch failed");
    }

    const data = await response.json();

    const headers = response.headers.get("X-Total-Count");
    const totalCount = headers ? parseInt(headers, 10) : 0;

    return {
      data,
      nextPage: pageNum >= totalCount ? undefined : page + 1,
      isLastPage: page * pageNum >= totalCount,
      totalCount,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchContentItem({
  id,
  contentLength,
  search,
}: {
  id?: string;
  contentLength?: number;
  search?: string;
}) {
  try {
    let baseUrl = "http://localhost:3000/monster"; // 개발서버
    //const baseUrl = "https://mhmwiki-backend.vercel.app/monster"; // 배포 서버

    if (id) {
      baseUrl = `${baseUrl}/${id}`;
    }

    if (contentLength) {
      const randomNum = Math.floor(Math.random() * contentLength) + 1;
      baseUrl = `${baseUrl}?_page=${randomNum}&_limit=1`;
    }

    if (search) {
      baseUrl = `${baseUrl}?name_like=${search}`;
    }

    const response = await fetch(baseUrl);

    if (!response.ok) throw new Error("contentItem fetch failed");

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
