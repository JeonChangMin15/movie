import { FcQuestions } from "react-icons/fc";

interface EmptyProps {
  keyword?: string;
}

export const Empty = ({ keyword }: EmptyProps) => {
  return (
    <div className="bg-slate-100 px-5 lg:px-20">
      <div className="flex items-center pt-5 text-xl font-semibold">
        <span>"{keyword}"의 검색결과</span>
      </div>

      <div className="flex justify-center items-center flex-col gap-y-1 min-h-screen">
        <div className="-translate-y-20">
          <FcQuestions size={120} />
        </div>
        <div className="flex -translate-y-20">
          <span className="font-bold">{keyword}</span>
          <span>의 검색결과가 없습니다</span>
        </div>
        <div className="-translate-y-20">다른 키워드로 검색해보세요.</div>
      </div>
    </div>
  );
};
