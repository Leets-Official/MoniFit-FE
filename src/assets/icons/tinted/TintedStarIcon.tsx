import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { color?: string };

export default function TintedStarIcon({ color = "currentColor", ...props }: Props) {
  return (
    <svg viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M19.832 24.7494L24.9244 27.8186C25.857 28.3811 26.9981 27.5496 26.7527 26.498L25.4029 20.7264L29.9063 16.8378C30.7284 16.1286 30.2867 14.7835 29.2069 14.6979L23.2801 14.1966L20.9609 8.74286C20.5437 7.75238 19.1203 7.75238 18.7031 8.74286L16.384 14.1843L10.4572 14.6857C9.37738 14.7713 8.93563 16.1164 9.75777 16.8256L14.2611 20.7141L12.9113 26.4858C12.6659 27.5374 13.8071 28.3689 14.7397 27.8064L19.832 24.749"
        fill={color}
      />
    </svg>
  );
}
