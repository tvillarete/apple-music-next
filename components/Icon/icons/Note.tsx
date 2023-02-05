import React from "react";

const Note = React.memo(
  React.forwardRef<SVGSVGElement>(
    (props: React.SVGProps<SVGSVGElement>, ref) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <rect
          x="15.0757"
          y="4.67871"
          width="1.3019"
          height="13.0217"
          fill="currentColor"
        />
        <path
          d="M15.0757 16.1704H16.3776V20.3048L15.0757 20.728V16.1704Z"
          fill="currentColor"
        />
        <path
          d="M15.0758 16.3294L15.8357 18.6773L14.0994 18.2826L13.4484 17.7007C14.8309 17.5603 15.0556 17.457 15.0758 16.3294Z"
          fill="currentColor"
        />
        <path
          d="M20.9224 0.515077C22.1287 0.367609 23.1865 1.32116 23.1646 2.53623L23.1401 3.89583C23.1225 4.87178 22.403 5.69252 21.4378 5.83769L17.4154 6.44265C16.1916 6.62671 15.0961 5.66633 15.1184 4.42894L15.145 2.95588C15.1629 1.95899 15.9124 1.12756 16.902 1.00657L20.9224 0.515077Z"
          fill="currentColor"
        />
        <path
          d="M16.3778 19.9409C16.6575 21.4839 15.3394 23.0149 13.4339 23.3604C11.5283 23.706 9.67799 22.7353 9.39829 21.1923C9.11859 19.6493 10.4366 18.1183 12.3422 17.7727C14.2477 17.4272 16.0981 18.3979 16.3778 19.9409Z"
          fill="currentColor"
        />
        <path
          d="M16.3777 7.93386C16.5404 6.63169 16.8659 6.46892 18.656 6.30615H16.3777V7.93386Z"
          fill="currentColor"
        />
        <rect
          y="4.17627"
          width="11.4538"
          height="1.70152"
          rx="0.850761"
          fill="currentColor"
        />
        <rect
          y="4.17627"
          width="11.4538"
          height="1.70152"
          rx="0.850761"
          fill="currentColor"
        />
        <rect
          y="8.35303"
          width="11.4538"
          height="1.70152"
          rx="0.850761"
          fill="currentColor"
        />
        <rect
          y="12.5293"
          width="11.4538"
          height="1.70152"
          rx="0.850761"
          fill="currentColor"
        />
      </svg>
    )
  )
);

export default Note;
