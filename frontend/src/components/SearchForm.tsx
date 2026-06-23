import { Search } from "lucide-react";
import { useState, useEffect, type SetStateAction, type Dispatch } from "react";
import { useNavigate } from "react-router";
import { useQueryHook } from "../hook/useQueryHook";

export default function SearchForm({
  setShowSearchForm,
}: {
  setShowSearchForm: Dispatch<SetStateAction<boolean>>;
}) {
  const [search, setSearch] = useState("");
  const [submitKeyword, setSubmitKeyword] = useState("");
  const navigate = useNavigate();

  const { data, isFetching } = useQueryHook({
    key: ["content", submitKeyword],
    search: submitKeyword,
    enabled: !!submitKeyword,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;

    setSubmitKeyword(search.trim());
  };

  useEffect(() => {
    if (!submitKeyword || isFetching) return;

    const searchContent = data?.[0];

    if (searchContent) {
      navigate(`/monster/${searchContent.id}`);
      setSubmitKeyword("");
      setSearch("");
      setShowSearchForm(false);
    } else {
      window.alert(
        `${submitKeyword}의 검색결과가 없습니다. 다시 확인해주시기 바랍니다.`,
      );
      setSubmitKeyword("");
    }
  }, [data, isFetching, submitKeyword, navigate]);

  return (
    <form
      onSubmit={handleSearchForm}
      className="bg-(--black) border border-(--dgrey) py-2.5 px-5 absolute top-20 right-5 flex items-center gap-2.5 w-60 z-10"
    >
      <Search size={14} stroke="var(--grey)" />
      <input
        type="text"
        className="small focus:outline-0 text-(--grey) flex-1"
        placeholder="몬스터 이름을 입력해주세요."
        value={search}
        onChange={handleSearch}
      />
    </form>
  );
}
