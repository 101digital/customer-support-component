import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const InformationIcon: React.FC<Props> = ({ width, height, color = '#0073F0' }) => {
  return (
    <SvgCss
      xml={`<svg xmlns="http://www.w3.org/2000/svg" width="16.896" height="16.896" viewBox="0 0 16.896 16.896">
      <path  fill-rule="evenodd" d="M16.9 8.448a8.448 8.448 0 1 1-2.474-5.973A8.448 8.448 0 0 1 16.9 8.448zM9.5 4.224a1.056 1.056 0 1 1-.309-.747 1.056 1.056 0 0 1 .309.747zM7.392 7.392a1.056 1.056 0 1 0 0 2.112v3.168a1.056 1.056 0 0 0 1.056 1.056H9.5a1.056 1.056 0 0 0 0-2.112V8.448a1.056 1.056 0 0 0-1.052-1.056z"/>
    </svg>`}
      width={width}
      height={height}
      fill={color}
    />
  );
};
export { InformationIcon };
