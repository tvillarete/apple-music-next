import React from "react";

const VolumeDown = React.memo(
  React.forwardRef<SVGSVGElement>(
    (props: React.SVGProps<SVGSVGElement>, ref) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="22"
        viewBox="0 0 15 22"
        fill="none"
        ref={ref}
        {...props}
      >
        <path
          d="M1.25458 5.84654C0.755744 5.98379 0.349862 6.10655 0.0641582 7.05379C0.0174485 7.20866 0 7.37069 0 7.53244V14.4803C0 14.7898 0.061973 15.1017 0.230788 15.3611C0.544456 15.8432 0.867349 16.0253 1.38324 16.1406C1.50185 16.1671 1.62365 16.1769 1.74518 16.1769H5.77679C6.28181 16.1769 6.76813 16.3679 7.13811 16.7117L12.3018 21.5093C12.4332 21.6314 12.5818 21.7335 12.7429 21.8125L12.7818 21.8316C13.0076 21.9423 13.2558 21.9999 13.5073 21.9999H13.8986C14.3703 21.9999 14.7896 21.6995 14.9414 21.253C14.9802 21.1388 15 21.019 15 20.8985V1.76483C15 0.864154 14.3961 -0.0920204 13.5015 0.0121524C13.3398 0.0309724 13.1822 0.0722978 13.0191 0.140598C12.8786 0.199393 12.7549 0.290718 12.6407 0.39147L7.1296 5.25595C6.76416 5.57851 6.29352 5.75651 5.80609 5.75651H1.88334C1.6708 5.75651 1.4595 5.79016 1.25458 5.84654Z"
          fill="currentColor"
        />
      </svg>
    )
  )
);

export default VolumeDown;
