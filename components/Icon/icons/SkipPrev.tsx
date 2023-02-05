import React from "react";

const SkipPrev = React.memo(
  React.forwardRef<SVGSVGElement>(
    (props: React.SVGProps<SVGSVGElement>, ref) => (
      <svg
        width="40"
        height="25"
        viewBox="0 0 40 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <path
          d="M3 14.3667C1.66667 13.5969 1.66667 11.6724 3 10.9026L18.4174 2.00137C19.7507 1.23157 21.4174 2.19383 21.4174 3.73343V21.5359C21.4174 23.0755 19.7507 24.0378 18.4174 23.268L3 14.3667Z"
          fill="currentColor"
        />
        <path
          d="M20.6199 14.2764C19.2865 13.5066 19.2865 11.5821 20.6199 10.8123L36.0373 1.91104C37.3706 1.14124 39.0373 2.10349 39.0373 3.64309V21.4456C39.0373 22.9852 37.3706 23.9474 36.0373 23.1776L20.6199 14.2764Z"
          fill="currentColor"
        />
      </svg>
    )
  )
);

export default SkipPrev;
