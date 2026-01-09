interface WindowsIconProps {
   className?: string;
}

export function WindowsIcon({ className }: WindowsIconProps) {
   return (
      <svg
         enableBackground="new 0 0 128 128"
         id="Social_Icons"
         version="1.1"
         viewBox="0 0 128 128"
         xmlSpace="preserve"
         xmlns="http://www.w3.org/2000/svg"
         xmlnsXlink="http://www.w3.src/org/1999/xlink"
         aria-label="Windows Icon"
         role="img"
         className={className}
      >
         <g id="_x33__stroke">
            <g id="Windows_Phone_1_">
               <rect clipRule="evenodd" fill="none" fillRule="evenodd" height="128" width="128" />
               <path
                  clipRule="evenodd"
                  d="M128,67.591L127.984,128l-69.358-9.759 l-0.097-50.763L128,67.591z M58.626,10.091L127.984,0v60.682l-69.358,0.549V10.091z M52.285,67.118l0.041,50.346l-52.284-7.166    L0.038,66.781L52.285,67.118z M0,18.123l52.31-7.102l0.023,50.301L0.049,61.618L0,18.123z"
                  fill="white"
                  fillRule="evenodd"
                  id="Windows_Phone"
               />
            </g>
         </g>
      </svg>
   );
}
