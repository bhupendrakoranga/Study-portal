import { MouseEventHandler } from 'react';
interface IconProps {
  color?: string;
  width?: string | number;
  height?: string | number;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

export const DropdownUpIcon = ({ onclick }: { onclick?: () => void }) => {
  return (
    <svg
      onClick={onclick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18.6001 15L12.6001 9L6.6001 15"
        stroke="#7A94B8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DropdownDownIcon = ({ onclick }: { onclick?: () => void }) => {
  return (
    <svg
      onClick={onclick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6.6001 9L12.6001 15L18.6001 9"
        stroke="#7A94B8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Mathica = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="140"
      height="140"
      viewBox="0 0 140 140"
      fill="none"
    >
      <path
        d="M40.8333 91.1458H61.25M80.2083 59.0625H100.625M80.2083 44.4792H100.625M39.375 51.7708H51.0417M51.0417 51.7708H62.7083M51.0417 51.7708V40.1042M51.0417 51.7708V63.4375M82.25 99.8958L90.4983 91.6475M90.4983 91.6475L98.7525 83.3992M90.4983 91.6475L82.25 83.3933M90.4983 91.6475L98.7525 99.8958M17.5 70C17.5 45.2492 17.5 32.8767 25.1883 25.1883C32.8767 17.5 45.255 17.5 70 17.5C94.7508 17.5 107.123 17.5 114.812 25.1883C122.5 32.8767 122.5 45.255 122.5 70C122.5 94.7508 122.5 107.123 114.812 114.812C107.123 122.5 94.745 122.5 70 122.5C45.2492 122.5 32.8767 122.5 25.1883 114.812C17.5 107.123 17.5 94.745 17.5 70Z"
        stroke="#29313D"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Newton = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="140"
      height="140"
      viewBox="0 0 140 140"
      fill="none"
    >
      <path
        d="M35.8011 70C23.8233 60.6667 17.4067 51.4695 20.0958 45.8209C23.1486 39.4042 36.9989 39.2 54.6914 44.2614M106.099 70C118.076 79.3334 124.493 88.5306 121.804 94.1792C118.751 100.596 104.901 100.8 87.185 95.7387C81.6704 94.1408 76.2531 92.2242 70.9606 89.9987C68.3061 88.9153 65.6839 87.7547 63.0972 86.5181C59.6901 84.8953 56.3368 83.1618 53.0425 81.3206"
        stroke="#29313D"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M85.7344 103.056C82.4289 117.155 77.035 126.311 70.9372 126.311C63.8439 126.311 57.6955 113.906 54.6914 95.7387L53.7502 91.177M56.2469 36.5362C59.57 22.6684 64.9016 13.689 70.9391 13.689C78.0344 13.689 84.1575 26.0945 87.185 44.2634"
        stroke="#29313D"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M54.6914 44.2634C59.8441 45.7315 65.3119 47.6526 70.9605 50.0015M87.185 95.7368C81.6704 94.1395 76.2531 92.2236 70.9605 89.9987C68.3061 88.9154 65.6838 87.7547 63.0972 86.5182C59.6901 84.8953 56.3367 83.1619 53.0425 81.3206"
        stroke="#29313D"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M89.1878 66.7917C89.2824 71.6453 89.165 76.5007 88.8358 81.344C88.7308 83.0104 88.6025 84.6495 88.4469 86.2595M46.1183 97.8387C32.6297 100.549 22.6333 99.4993 20.0958 94.1793C17.9453 89.6623 21.6164 82.8781 29.295 75.5709"
        stroke="#29313D"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.8011 70C40.6331 73.7858 46.3653 77.5717 52.7606 81.1611C52.8545 81.2137 52.9485 81.2681 53.0425 81.3206"
        stroke="#29313D"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M87.1849 44.2633C87.4533 45.8247 87.6963 47.4328 87.9141 49.0797M95.5305 42.2061C109.142 39.4333 119.253 40.4522 121.804 45.8228C123.871 50.1667 120.552 56.6125 113.458 63.6028M106.099 70C101.195 66.1811 95.3652 62.3389 88.8358 58.6794"
        stroke="#29313D"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M88.8358 58.6794C95.3653 62.3389 101.195 66.1811 106.099 70"
        stroke="#29313D"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M81.0172 85.4526C80.4689 85.7249 79.9128 85.9951 79.3489 86.2596"
        stroke="#29313D"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M70.9606 50.0015C73.6023 51.1064 76.217 52.2747 78.8025 53.5054C82.2067 55.1109 85.5533 56.836 88.8359 58.6776"
        stroke="#29313D"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M52.675 71.406C52.6083 65.2929 52.7308 59.1792 53.0425 53.0737"
        stroke="#29313D"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M70.9605 89.9986C68.3061 88.9153 65.6838 87.7546 63.0972 86.5181C59.6901 84.8952 56.3367 83.1618 53.0425 81.3206"
        stroke="#29313D"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M71.6061 76.9807C75.1102 76.9807 77.9508 74.1401 77.9508 70.636C77.9508 67.1319 75.1102 64.2913 71.6061 64.2913C68.102 64.2913 65.2614 67.1319 65.2614 70.636C65.2614 74.1401 68.102 76.9807 71.6061 76.9807Z"
        stroke="#29313D"
        strokeWidth="4"
        strokeMiterlimit="10"
      />
      <path
        d="M61.4639 94.0412C61.4639 94.0412 62.1211 93.9246 63.35 93.4015M96.6428 77.7137C96.6428 77.7137 99.3728 75.9696 99.8433 75.569M61.6525 53.0737C61.1022 53.3518 60.552 53.6396 60.0017 53.9351M43.2075 63.7157C43.2075 63.7157 43.6509 63.2509 44.7903 62.5684M77.2975 45.1151C77.2975 45.1151 80.4358 43.9679 81.0775 43.8298"
        stroke="#29313D"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Shakespeare = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="110"
      height="110"
      viewBox="0 0 110 110"
      fill="none"
    >
      <g
        stroke="#29313D"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 55C2.5 30.2492 2.5 17.8767 10.1883 10.1883C17.8767 2.5 30.255 2.5 55 2.5C79.7508 2.5 92.1233 2.5 99.8117 10.1883C107.5 17.8767 107.5 30.255 107.5 55C107.5 79.7508 107.5 92.1233 99.8117 99.8117C92.1233 107.5 79.745 107.5 55 107.5C30.2492 107.5 17.8767 107.5 10.1883 99.8117C2.5 92.1233 2.5 79.745 2.5 55Z" />
        <foreignObject x="24" y="34" width="62" height="42">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="62"
            height="42"
            viewBox="0 0 62 42"
            fill="none"
          >
            <path
              d="M23.125 2.625H2.125V39.375H21.8125M2.125 21H21.8125M36.25 7.875V39.375V22.3125C36.25 19.1796 37.4945 16.1751 39.7098 13.9598C41.9251 11.7445 44.9296 10.5 48.0625 10.5C51.1954 10.5 54.1999 11.7445 56.4152 13.9598C58.6305 16.1751 59.875 19.1796 59.875 22.3125V39.375"
              stroke="#29313D"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </foreignObject>
      </g>
    </svg>
  );
};

export const DeleteIcon = ({
  color = 'black',
  width = 24,
  height = 24,
  onClick,
}: IconProps) => {
  return (
    <svg
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 6H15.5L14.71 5.21C14.5213 4.99812 14.2676 4.85369 14 4.79889V4C14 3.44772 13.5523 3 13 3H11C10.4477 3 10 3.44772 10 4V4.79889C9.73239 4.85369 9.47868 4.99812 9.29 5.21L8.5 6H7C6.44772 6 6 6.44772 6 7V8H18V7C18 6.44772 17.5523 6 17 6ZM9.5 7H14.5L14.79 7.21C14.913 7.29952 15 7.44955 15 7.60751V8H9V7.60751C9 7.44955 9.08699 7.29952 9.21 7.21L9.5 7ZM7 9H18V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V9ZM8 17C8 16.4477 8.44772 16 9 16C9.55228 16 10 16.4477 10 17C10 17.5523 9.55228 18 9 18C8.44772 18 8 17.5523 8 17ZM12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16ZM15 16C14.4477 16 14 16.4477 14 17C14 17.5523 14.4477 18 15 18C15.5523 18 16 17.5523 16 17C16 16.4477 15.5523 16 15 16Z"
        fill={color}
      />
    </svg>
  );
};

export const PlusIcon = ({
  color = 'black',
  width = 24,
  height = 24,
  onClick,
}: IconProps) => {
  return (
    <svg
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <rect x="10" y="2" width="4" height="20" fill={color} />
      <rect x="2" y="10" width="20" height="4" fill={color} />
    </svg>
  );
};

export const MinusIcon = ({
  color = 'black',
  width = 24,
  height = 24,
  onClick,
}: IconProps) => {
  return (
    <svg
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <rect x="2" y="10" width="20" height="4" fill={color} />
    </svg>
  );
};
