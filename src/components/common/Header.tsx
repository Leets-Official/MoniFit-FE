import { AvartarIcon } from "@/assets/icons";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  src?: string;
  onStampClick?: () => void;
  showStampButton?: boolean;
}

export const Header = ({
  src,
  showStampButton = false,
  onStampClick,
}: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="flex h-13 w-full items-center justify-between px-4 py-2">
      <button onClick={() => navigate("/main")}>
        <img src={"/banner.png"} alt="banner" />
      </button>

      {showStampButton && (
        <button
          onClick={onStampClick}
          className="text-body2 h-8 w-35 rounded-[60px] border border-[#7976FF80] text-[#DCDCDC]"
        >
          스탬프 보러 가기
        </button>
      )}

      <button
        onClick={() => navigate("/mypage")}
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full"
      >
        {src ? (
          <img src={src} alt="avatar" className="h-full w-full object-cover" />
        ) : (
          <AvartarIcon />
        )}
      </button>
    </header>
  );
};
