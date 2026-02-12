interface IconProps {
  className?: string;
  fill?: string;
}

export const ReportIcon = ({
  className,
  fill = "currentColor",
}: IconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9 7.16V0C4 0.5 0 4.79 0 10C0 15.21 4 19.5 9 20V12.84C8 12.43 7 11.32 7 10C7 8.68 8 7.57 9 7.16ZM12.86 9H20C19.52 4.25 16 0.47 11 0V7.16C12 7.46 12.52 8.14 12.86 9ZM11 12.84V20C16 19.53 19.52 15.75 20 11H12.86C12.52 11.86 12 12.54 11 12.84Z"
        fill={fill}
      />
    </svg>
  );
};
