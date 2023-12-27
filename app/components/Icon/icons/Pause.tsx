import React from "react";

const Play = React.memo(
  React.forwardRef<SVGSVGElement>(
    (props: React.SVGProps<SVGSVGElement>, ref) => (
      <svg
        width="18"
        height="24"
        viewBox="0 0 18 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <g id="Pause">
          <rect
            id="Rectangle"
            x="0.639893"
            width="6.72"
            height="24"
            rx="2"
            fill="currentColor"
          />
          <rect
            id="Rectangle_2"
            x="11.2"
            width="6.72"
            height="24"
            rx="2"
            fill="currentColor"
          />
        </g>
      </svg>
    )
  )
);

export default Play;
