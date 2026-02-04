import { AvartarIcon } from "@/assets/icons";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  src?: string;
  onStampClick: () => void;
  showStampButton?: boolean;
}

export const Header = ({
  src,
  showStampButton = false,
  onStampClick,
}: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between w-full px-4 py-2 h-13">
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
        className="flex items-center justify-center overflow-hidden rounded-full h-9 w-9"
      >
        {src ? (
          <img src={src} alt="avatar" className="object-cover w-full h-full" />
        ) : (
          <AvartarIcon />
        )}
      </button>
    </header>
  );
};
