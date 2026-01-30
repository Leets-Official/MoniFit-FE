import { useNavigate } from "react-router-dom";

export default function MyPageTopBar() {
  const navigate = useNavigate();

  return (
    <header className="flex h-13 w-full items-center justify-between px-4 py-2">
      <button onClick={() => navigate("/")}>
        <img src={"/src/public/banner.png"} alt="banner" />
      </button>

      <div className="h-9 w-9" />
    </header>
  );
}
