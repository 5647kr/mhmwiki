import { useContentStore } from "../../store/contentStore";

export default function Detail() {
  // 상세페이지용 데이터 가져오기
  // const { id } = useParams();
  // const { contentData, fetchContentData } = useContentStore();
  // const monster = contentData.find((m) => String(m.id) === String(id));
  const contentData = useContentStore((state) => state.contentData);

  console.log(contentData)

  // useEffect(() => {
  //   // 상세페이지로 바로 진입해서 데이터가 없는 경우를 대비
  //   if (contentData.length === 0) {
  //     fetchContentData();
  //   }
  // }, []);

  // if (contentData.length === 0) return <div>로딩 중...</div>;
  // if (!monster) return <div>데이터가 없습니다.</div>;

  // return <div>{monster.title} 상세 내용...</div>;
  return (
    <>
      <h1>Detail Component</h1>
    </>
  );
}
