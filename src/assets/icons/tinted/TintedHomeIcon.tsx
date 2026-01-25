import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { color?: string };

export default function TintedHomeIcon({ color = "currentColor", ...props }: Props) {
  return (
    <svg viewBox="0 0 44 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M18.9292 28.8733V22.2067H24.2625V28.8733C24.2625 29.6067 24.8625 30.2067 25.5958 30.2067H29.5958C30.3292 30.2067 30.9292 29.6067 30.9292 28.8733V19.54H33.1958C33.8092 19.54 34.1025 18.78 33.6358 18.38L22.4892 8.34C21.9825 7.88667 21.2092 7.88667 20.7025 8.34L9.55583 18.38C9.1025 18.78 9.3825 19.54 9.99583 19.54H12.2625V28.8733C12.2625 29.6067 12.8625 30.2067 13.5958 30.2067H17.5958C18.3292 30.2067 18.9292 29.6067 18.9292 28.8733Z"
        fill={color}
      />
    </svg>
  );
}
