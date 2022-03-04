import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="19.675" height="18.445" viewBox="0 0 19.675 18.445">
<g id="risk" transform="translate(0 -15.055)">
    <path id="Path_11390" fill="#d32f2f" d="M1.847 33.5A1.844 1.844 0 0 1 .2 30.831l7.991-14.757a1.844 1.844 0 0 1 3.3 0l7.993 14.756a1.845 1.845 0 0 1-1.65 2.669H1.847z" data-name="Path 11390" transform="translate(-.003)"/>
    <path id="Path_11391" fill="#ef5350" d="M9.838 15.056a1.844 1.844 0 0 0-1.65 1.02L.195 30.832A1.844 1.844 0 0 0 1.844 33.5h7.994z" data-name="Path 11391" transform="translate(0 -.001)"/>
    <path id="Path_11392" fill="#fff" d="M211.554 139.665a.6.6 0 0 1 .586-.72h1.205a.616.616 0 0 1 .6.72l-.106 5.6c-.033.368-.764.6-1.1.6s-1.019-.235-1.053-.6zm1.189 7.424a1.145 1.145 0 0 1 1.188 1.155v.167a1.189 1.189 0 0 1-2.377 0v-.167a1.155 1.155 0 0 1 1.188-1.156z" data-name="Path 11392" transform="translate(-202.913 -118.832)"/>
</g>
</svg>
`;

const RiskIcon: React.FC<Props> = ({ size, color }) => {
  return <SvgCss xml={xml} width={size} height={size} fill={color} />;
};
export { RiskIcon };
