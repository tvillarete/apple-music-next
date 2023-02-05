import React from "react";

const Album = React.memo(
  React.forwardRef<SVGSVGElement>(
    (props: React.SVGProps<SVGSVGElement>, ref) => (
      <svg
        width="17"
        height="22"
        viewBox="0 0 17 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <path
          d="M2 7H15C15.5523 7 16 7.44772 16 8V20C16 20.5523 15.5523 21 15 21H2C1.44772 21 1 20.5523 1 20V8C1 7.44772 1.44772 7 2 7Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <mask id="path-2-inside-1_1053_9" fill="white">
          <path d="M13 3H4C2.89543 3 2 3.89543 2 5H15C15 3.89543 14.1046 3 13 3Z" />
        </mask>
        <path
          d="M2 5H0V7H2V5ZM15 5V7H17V5H15ZM4 5H13V1H4V5ZM2 7H15V3H2V7ZM13 5H17C17 2.79086 15.2091 1 13 1V5ZM4 1C1.79086 1 0 2.79086 0 5H4V1Z"
          fill="currentColor"
          mask="url(#path-2-inside-1_1053_9)"
        />
        <mask id="path-4-inside-2_1053_9" fill="white">
          <path d="M11.5 0.5H5.5C4.67157 0.5 4 1.17157 4 2H13C13 1.17157 12.3284 0.5 11.5 0.5Z" />
        </mask>
        <path
          d="M4 2H2V4H4V2ZM13 2V4H15V2H13ZM5.5 2.5H11.5V-1.5H5.5V2.5ZM4 4H13V0H4V4ZM11.5 2.5C11.2239 2.5 11 2.27614 11 2H15C15 0.0670036 13.433 -1.5 11.5 -1.5V2.5ZM5.5 -1.5C3.567 -1.5 2 0.0670034 2 2H6C6 2.27614 5.77614 2.5 5.5 2.5V-1.5Z"
          fill="currentColor"
          mask="url(#path-4-inside-2_1053_9)"
        />
      </svg>
    )
  )
);

export default Album;
