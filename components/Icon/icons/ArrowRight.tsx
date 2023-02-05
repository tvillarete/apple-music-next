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
          d="M5.6186 1.85561C4.56538 0.830714 2.88074 0.85367 1.85584 1.90689V1.90689C0.830937 2.9601 0.853892 4.64475 1.90711 5.66965L19.281 22.5764C20.3342 23.6013 22.0188 23.5784 23.0437 22.5251V22.5251C24.0686 21.4719 24.0457 19.7873 22.9925 18.7624L5.6186 1.85561Z"
          fill="currentColor"
        />
        <path
          d="M5.70594 39.6882C4.65272 40.7131 2.96807 40.6901 1.94317 39.6369V39.6369C0.918275 38.5837 0.941231 36.8991 1.99445 35.8742L19.3683 18.9674C20.4215 17.9425 22.1062 17.9655 23.1311 19.0187V19.0187C24.156 20.0719 24.133 21.7565 23.0798 22.7814L5.70594 39.6882Z"
          fill="currentColor"
        />
      </svg>
    )
  )
);

export default ArrowLeft;
