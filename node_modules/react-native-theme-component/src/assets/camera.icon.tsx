import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const CameraIcon: React.FC<Props> = ({ width, height, color }) => {
  return (
    <SvgCss
      xml={`<svg xmlns="http://www.w3.org/2000/svg" width="13.809" height="12.083" viewBox="0 0 13.809 12.083">
      <defs>
          <style>
              .cls-1{fill:#646876}
          </style>
      </defs>
      <g id="camera" transform="translate(0 -30.522)">
          <path id="Path_11841" d="M186.109 198.939a1.726 1.726 0 1 1-2.441 0 1.726 1.726 0 0 1 2.441 0" class="cls-1" transform="translate(-177.984 -163.164)"/>
          <path id="Path_11842" d="M12.083 32.248H10.89l-.863-1.726H3.781l-.863 1.727H1.727A1.729 1.729 0 0 0 0 33.976v6.9a1.728 1.728 0 0 0 1.726 1.727h10.357a1.728 1.728 0 0 0 1.726-1.726v-6.9a1.728 1.728 0 0 0-1.726-1.729zM6.9 40.447A3.452 3.452 0 1 1 10.357 37 3.456 3.456 0 0 1 6.9 40.447z" class="cls-1"/>
      </g>
      </svg>
      `}
      width={width}
      height={height}
      fill={color}
    />
  );
};
export { CameraIcon };
