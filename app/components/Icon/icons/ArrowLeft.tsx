import React from "react";

const ArrowLeft = React.memo(
  React.forwardRef<SVGSVGElement>(
    (props: React.SVGProps<SVGSVGElement>, ref) => (
      <svg
        width="25"
        height="42"
        viewBox="0 0 25 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <path
          d="M19.3682 1.85561C20.4214 0.830714 22.1061 0.85367 23.131 1.90689V1.90689C24.1559 2.9601 24.1329 4.64475 23.0797 5.66965L5.70583 22.5764C4.65262 23.6013 2.96797 23.5784 1.94307 22.5251V22.5251C0.91817 21.4719 0.941125 19.7873 1.99434 18.7624L19.3682 1.85561Z"
          fill="currentColor"
        />
        <path
          d="M19.2809 39.6882C20.3341 40.7131 22.0187 40.6901 23.0436 39.6369V39.6369C24.0685 38.5837 24.0456 36.8991 22.9924 35.8742L5.61849 18.9674C4.56528 17.9425 2.88063 17.9655 1.85573 19.0187V19.0187C0.830832 20.0719 0.853787 21.7565 1.907 22.7814L19.2809 39.6882Z"
          fill="currentColor"
        />
      </svg>
    )
  )
);

export default ArrowLeft;
