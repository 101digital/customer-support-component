import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const GalleryIcon: React.FC<Props> = ({ width, height, color }) => {
  return (
    <SvgCss
      xml={`<svg xmlns="http://www.w3.org/2000/svg" width="13.902" height="13.902" viewBox="0 0 13.902 13.902">
      <defs>
          <style>
              .cls-1{fill:#646876}
          </style>
      </defs>
      <g id="Layer_2" transform="translate(-1 -1)">
          <path id="Path_11843" d="M14.3 14.85l-2-2.02a.088.088 0 0 0-.079-.032.111.111 0 0 0-.079.037l-1.335 1.413a.927.927 0 0 1-.672.292.927.927 0 0 1-.672-.292L6.6 11.194a.111.111 0 0 0-.148 0L1.995 14.67l-.575-.746 4.439-3.476a1.033 1.033 0 0 1 1.39.111l2.859 3.054 1.326-1.413a1.029 1.029 0 0 1 .741-.329 1.01 1.01 0 0 1 .751.306l2 2.02z" class="cls-1" transform="translate(-.225 -4.953)"/>
          <path id="Path_11844" d="M13.086 14.9H2.817A1.817 1.817 0 0 1 1 13.086V2.817A1.817 1.817 0 0 1 2.817 1h10.269A1.817 1.817 0 0 1 14.9 2.817v10.269a1.817 1.817 0 0 1-1.814 1.814zM2.817 1.927a.89.89 0 0 0-.89.89v10.269a.89.89 0 0 0 .89.89h10.269a.89.89 0 0 0 .89-.89V2.817a.89.89 0 0 0-.89-.89z" class="cls-1"/>
          <circle id="Ellipse_251" cx=".927" cy=".927" r=".927" class="cls-1" transform="translate(9.031 4.165)"/>
          <path id="Path_11845" d="M2 15.272l4.416-3.554.816-.1 2.674 2.855s.463.635.857.2l1.33-1.413s.264-.579.83 0 2.053 2.475 2.053 2.475l-.032 3.35a1.348 1.348 0 0 1-1.5 1.052c-1.362 0-10.195-.144-10.195-.144S2 20.3 2 18.784z" class="cls-1" transform="translate(-.537 -5.699)"/>
      </g>
      </svg>
      `}
      width={width}
      height={height}
      fill={color}
    />
  );
};
export { GalleryIcon };
