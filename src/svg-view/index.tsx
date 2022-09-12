import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from 'react-native-svg';
import { BLACK_50, BLACK_70 } from '../styles/color';

export const HomeIconSvg = ({ width = 22, height = 23, color = BLACK_70, fill = 'none', ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 23" fill="none" {...props}>
      <Path
        d="M4.6 21.4C3.8 21.4 2.5 20.8 2.3 19.7C2.1 18.6 1.1 12.7 1 9.29998C1 8.69998 1.2 8.09998 1.6 7.69998C4.2 5.29998 9.7 1.59998 10.7 1.59998C11.7 1.59998 17.5 5.39998 20.2 7.69998C20.6 8.09998 20.9 8.69998 20.8 9.29998C20.7 12.7 19.8 18.6 19.5 19.7C19.2 20.8 18 21.4 17.2 21.4H4.6ZM12.2 12.4H9.9C8.8 12.4 8 13.3 8 14.3V21.4H14.1V14.3C14.1 13.2 13.2 12.4 12.2 12.4Z"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        fill={fill}
      />
    </Svg>
  );
};

export const PersonSvg = ({ width = 20, height = 18, color = '#000000', fill = 'none', ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 23 22" fill="none" {...props}>
      <Path
        d="M22 19.4C20.9 17.3 18.3 15.7 14.5 15.2C14.1 15.2 13.9 14.9 13.9 14.5V14.3C13.9 13.9 14.1 13.5 14.4 13.4C16.3 12.4 17.6 10.3 17.6 7.79998C17.6 4.39998 15 1.59998 11.9 1.59998C11.8 1.59998 11.8 1.59998 11.7 1.59998C11.6 1.59998 11.6 1.59998 11.5 1.59998C8.30005 1.59998 5.80005 4.39998 5.80005 7.79998C5.80005 10.3 7.10005 12.4 9.00005 13.4C9.30005 13.6 9.50005 13.9 9.50005 14.3V14.5C9.50005 14.9 9.20005 15.1 8.90005 15.2C5.10005 15.7 2.60005 17.3 1.40005 19.4C1.20005 19.8 1.50005 20.4 2.00005 20.4H11.5H11.8H21.3C21.9 20.4 22.2 19.9 22 19.4Z"
        fill={fill}
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const StatisticIconSvg = ({
  width = 21,
  height = 19,
  color = BLACK_50,
  fill = 'none',
  ...props
}: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 21 19" fill="none" {...props}>
      <Path
        d="M2.7 3.39998H3.7M16.8 17.8H3.6C1.9 17.8 0.5 16.4 0.5 14.7V3.69998C0.5 1.99998 1.9 0.599976 3.6 0.599976H16.8C18.5 0.599976 19.9 1.99998 19.9 3.69998V14.7C20 16.4 18.6 17.8 16.8 17.8ZM20 6.09998H13.2C12 6.09998 10.9 7.09998 10.9 8.39998V9.49998C10.9 10.7 11.9 11.8 13.2 11.8H20V6.09998ZM5.6 3.39998H12.6H5.6Z"
        stroke={color}
        strokeMiterlimit={10}
        strokeLinecap="round"
        fill={fill}
      />
    </Svg>
  );
};

export const DiscoverIconSvg = ({
  width = 22,
  height = 19,
  color = BLACK_50,
  fill = 'none',
  ...props
}: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 19" fill="none" {...props}>
      <Path
        d="M16.3435 10.8028L16.3436 10.8029L16.3528 10.7976C16.9836 10.4368 17.3595 9.85352 17.3595 9.21212C17.3595 8.57073 16.9836 7.98743 16.3528 7.6266L16.3529 7.6265L16.3435 7.6214L9.72914 4.02291L9.72163 4.01883L9.71399 4.015C8.98823 3.65175 8.18031 3.69961 7.55397 3.99071C6.93847 4.27677 6.40196 4.85328 6.40196 5.61364V12.8106C6.40196 13.6271 6.92119 14.2163 7.56757 14.4936C8.20676 14.7678 9.00779 14.7627 9.71399 14.4092L9.72163 14.4054L9.72914 14.4013L16.3435 10.8028ZM4.45752 0.5H17.5425C19.6808 0.5 21.3631 2.2628 21.5 4.47718V14.5379C21.5 16.7092 19.7103 18.5 17.5425 18.5H4.45752C2.2897 18.5 0.5 16.7092 0.5 14.5379V4.46212C0.5 2.29081 2.2897 0.5 4.45752 0.5Z"
        stroke={color}
        fill={fill}
      />
    </Svg>
  );
};
