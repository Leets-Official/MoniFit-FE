import { AvartarIcon } from "@/assets/icons";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  src?: string;
  onStampClick: () => void;
  onImgClick: () => void;
  showButton: boolean;
}

export const Header = ({
  src,
  showButton = true,
  onStampClick,
  onImgClick,
}: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between w-full px-4 py-2 h-13">
      <button onClick={() => navigate("/")}>
        <img src={"/src/public/banner.png"} alt="banner" />
      </button>

      {showButton && (
        <button
          onClick={onStampClick}
          className="text-body2 h-8 w-35 rounded-[60px] border border-[#7976FF80] text-[#DCDCDC]"
        >
          스탬프 보러 가기
        </button>
      )}

      <button
        onClick={onImgClick}
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
