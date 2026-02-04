import type { ReactNode } from "react";

type CommonCardProps = {
  title?: string;
  children: ReactNode;

  /** 높이/패딩 등 화면별 커스텀 */
  className?: string;

  titleClassName?: string;
  contentClassName?: string;
};

export default function CommonCard({
  title,
  children,
  className = "",
  titleClassName = "",
  contentClassName = "",
}: CommonCardProps) {
  return (
    <section
      className={[
        // 고정 width 309
        "w-77.25",
        "border-primary-60 border-[0.5px]",
        "overflow-hidden rounded-[14px] bg-transparent",
        "px-5 py-4",
        className,
      ].join(" ")}
    >
      {title ? (
        <h2
          className={[
            "text-sub1-size text-gray-10 font-semibold",
            titleClassName,
          ].join(" ")}
        >
          {title}
        </h2>
      ) : null}

      <div className={[title ? "mt-3" : "", contentClassName].join(" ").trim()}>
        {children}
      </div>
    </section>
  );
}
