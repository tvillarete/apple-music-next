import React from "react";

const Play = React.memo(
  React.forwardRef<SVGSVGElement>(
    (props: React.SVGProps<SVGSVGElement>, ref) => (
      <svg
        width="19"
        height="22"
        viewBox="0 0 19 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <path
          d="M17.7847 12.7321C19.118 11.9623 19.118 10.0377 17.7847 9.26795L3.00006 0.732051C1.66672 -0.0377492 5.72205e-05 0.924501 5.72205e-05 2.4641V19.5359C5.72205e-05 21.0755 1.66672 22.0377 3.00006 21.2679L17.7847 12.7321Z"
          fill="currentColor"
        />
      </svg>
    )
  )
);

export default Play;
