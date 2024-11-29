import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function NotFound() {
  const navigate = useNavigate();
  const [dark, setDark] = useState<string | null>(null);

  useEffect(() => {
    setDark(localStorage.getItem("theme"));
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-9 min-h-screen w-full ${
        dark === "dark" ? "bg-gray-900 text-zinc-200" : ""
      }`}>
      <h1 className="text-9xl font-semibold text-purple-400">404</h1>
      <div className="flex flex-col items-center gap-2 text-lg">
        <span>죄송합니다. 페이지를 찾을 수 없습니다.</span>
        <span>존재하지 않는 주소를 입력하셨거나,</span>
        <span>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</span>
      </div>
      <button
        className={`bg-purple-400 rounded-lg text-white p-3 hover:bg-purple-500 ${
          dark === "dark" ? "bg-indigo-700 hover:bg-indigo-800" : ""
        }`}
        onClick={() => navigate("/")}>
        홈으로 돌아가기
      </button>
    </div>
  );
}
