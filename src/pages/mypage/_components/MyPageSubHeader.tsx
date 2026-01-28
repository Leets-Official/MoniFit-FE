import { ChevronLeftIcon } from "@/assets/icons";

type Props = {
  title: string;
  onBack: () => void;
  right?: React.ReactNode;
};

export default function MyPageSubHeader({ title, onBack, right }: Props) {
  return (
    <header className="flex h-13 w-full items-center justify-between px-4 py-2">
      <button
        type="button"
        onClick={onBack}
        className="flex h-9 w-9 items-center justify-center"
        aria-label="back"
      >
        <ChevronLeftIcon
          className="text-gray-10"
          style={{ width: "38px", height: "38px" }}
        />
      </button>

      <h1 className="text-sub1 text-gray-10">{title}</h1>

      <div className="min-w-9 text-right">{right}</div>
    </header>
  );
}
