
import React from 'react';

export const ScaleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52v1.667c0 .921-.75 1.667-1.667 1.667h-1.666a1.667 1.667 0 0 1-1.667-1.667v-1.667m-6.333 0c1.01.143 2.01.317 3 .52m-3-.52v1.667c0 .921.75 1.667 1.667 1.667h1.666a1.667 1.667 0 0 0 1.667-1.667v-1.667m0 0l-1.667-1.667M6.75 4.97l-1.667-1.667M18.75 4.97l1.667-1.667"
    />
  </svg>
);
