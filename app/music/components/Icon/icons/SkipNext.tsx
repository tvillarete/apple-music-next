import React from "react";

const SkipNext = React.memo(
  React.forwardRef<SVGSVGElement>(
    (props: React.SVGProps<SVGSVGElement>, ref) => (
      <svg
        viewBox="0 0 40 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <path
          d="M36.0374 14.1875C37.3707 13.4177 37.3707 11.4932 36.0374 10.7234L20.6199 1.82218C19.2866 1.05237 17.6199 2.01463 17.6199 3.55423V21.3567C17.6199 22.8963 19.2866 23.8586 20.6199 23.0888L36.0374 14.1875Z"
          fill="currentColor"
        />
        <path
          d="M18.4175 14.0972C19.7508 13.3274 19.7508 11.4029 18.4175 10.6331L3.00007 1.73184C1.66673 0.962043 6.88434e-05 1.92429 6.88434e-05 3.46389V21.2664C6.88434e-05 22.806 1.66674 23.7682 3.00007 22.9984L18.4175 14.0972Z"
          fill="currentColor"
        />
      </svg>
    )
  )
);

export default SkipNext;
