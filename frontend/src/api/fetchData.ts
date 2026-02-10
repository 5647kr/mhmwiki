export default async function fetchData(path: string) {
  const response = await fetch(`http://localhost:3000/${path}`);

  if (!response.ok) throw new Error("fetch 실패");

  return response.json();
}
