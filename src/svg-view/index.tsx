import Svg, { Circle, ClipPath, Defs, Ellipse, G, Path, Rect, SvgProps } from 'react-native-svg';
import { BLACK_100, BLACK_50 } from '../styles/color';

export const HomeIconSvg = ({ width = 24, height = 21, color = 'black', fill = 'none', ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 21" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.6011 0.173834C12.323 -0.0579436 11.919 -0.0579458 11.6408 0.173834L0.861809 9.15635C0.143294 9.75511 0.566697 10.9246 1.50199 10.9246H3.14534L3.55034 19.0244C3.60356 20.0889 4.48209 20.9246 5.54784 20.9246H10.371C10.7852 20.9246 11.121 20.5888 11.121 20.1746V13.9246C11.121 13.6484 11.3448 13.4246 11.621 13.4246H12.621C12.8971 13.4246 13.121 13.6484 13.121 13.9246V20.1746C13.121 20.5888 13.4568 20.9246 13.871 20.9246H18.6941C19.7598 20.9246 20.6384 20.0889 20.6916 19.0244L21.0966 10.9246H22.7399C23.6752 10.9246 24.0986 9.75511 23.3801 9.15635L12.6011 0.173834Z"
        stroke={color}
        fill={fill}
      />
    </Svg>
  );
};

export const PersonSvg = ({ width = 19, height = 21, color = '#000000', fill = 'none', ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 21" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.3582 5.75C15.3582 8.92564 12.7838 11.5 9.60815 11.5C6.43252 11.5 3.85815 8.92564 3.85815 5.75C3.85815 2.57436 6.43252 0 9.60815 0C12.7838 0 15.3582 2.57436 15.3582 5.75ZM13.3582 5.75C13.3582 7.82107 11.6792 9.5 9.60815 9.5C7.53709 9.5 5.85815 7.82107 5.85815 5.75C5.85815 3.67893 7.53709 2 9.60815 2C11.6792 2 13.3582 3.67893 13.3582 5.75Z"
        fill={fill}
        stroke={color}
      />
      <Path
        d="M0.520516 19.7228C0.445589 19.9683 0.582491 20.225 0.823674 20.3128L1.75686 20.6525C2.04011 20.7555 2.34835 20.5856 2.43676 20.2975C3.37768 17.2301 6.23247 15 9.60814 15C12.9838 15 15.8386 17.2301 16.7796 20.2975C16.868 20.5856 17.1762 20.7555 17.4595 20.6525L18.3926 20.3128C18.6338 20.225 18.7707 19.9683 18.6958 19.7228C17.5079 15.831 13.8886 13 9.60814 13C5.32765 13 1.70838 15.831 0.520516 19.7228Z"
        fill={fill}
        stroke={color}
      />
    </Svg>
  );
};

export const InboxIconSvg = ({ width = 20, height = 21, fill = 'none', color = 'none', ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 21" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 2C0 0.895431 0.895431 0 2 0H18C19.1046 0 20 0.89543 20 2V15C20 16.1046 19.1046 17 18 17H13.4599L10.7621 20.1759C10.3628 20.6461 9.6372 20.6461 9.23785 20.1759L6.54007 17H2C0.895431 17 0 16.1046 0 15V2ZM6 8.5C6 8.22386 6.22386 8 6.5 8H13.5C13.7761 8 14 8.22386 14 8.5V9.5C14 9.77614 13.7761 10 13.5 10H6.5C6.22386 10 6 9.77614 6 9.5V8.5Z"
        fill={fill}
        stroke={color}
      />
    </Svg>
  );
};
//#161722

export const DiscoverIconSvg = ({
  width = 21,
  height = 21,
  color = BLACK_50,
  fill = 'none',
  ...props
}: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.384 16.2124C12.8826 17.335 11.019 18 9 18C4.02954 18 0 13.9705 0 9C0 4.02954 4.02954 0 9 0C13.9705 0 18 4.02954 18 9C18 11.2307 17.1885 13.272 15.8445 14.8445L20.2915 19.2915C20.4868 19.4868 20.4868 19.8035 20.2915 19.9985L19.5845 20.7058C19.3892 20.9011 19.0725 20.9011 18.8774 20.7058L14.384 16.2124ZM16 9C16 12.866 12.866 16 9 16C5.13403 16 2 12.866 2 9C2 5.13403 5.13403 2 9 2C12.866 2 16 5.13403 16 9Z"
        fill={fill}
        stroke={color}
      />
    </Svg>
  );
};

export const RecordVideo = ({ width = 44, height = 29, color = BLACK_50, fill = 'none', ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 44 29" fill="none" {...props}>
      <Rect x={7.5} y={0.5} width={36} height={28} rx={8} fill="#E6436D" />
      <Rect x={0.5} y={0.5} width={36} height={28} rx={8} fill="#65D2E9" />
      <Rect x={4} y={0.5} width={36} height={28} rx={8} fill="white" />
      <Path
        d="M21.25 8.25C20.9739 8.25 20.75 8.47386 20.75 8.75V13.5H16C15.7239 13.5 15.5 13.7239 15.5 14V15.5C15.5 15.7761 15.7239 16 16 16H20.75V20.75C20.75 21.0261 20.9739 21.25 21.25 21.25H22.75C23.0261 21.25 23.25 21.0261 23.25 20.75V16H28C28.2761 16 28.5 15.7761 28.5 15.5V14C28.5 13.7239 28.2761 13.5 28 13.5H23.25V8.75C23.25 8.47386 23.0261 8.25 22.75 8.25H21.25Z"
        fill="#161722"
      />
    </Svg>
  );
};

export const ArrowBackSvg = ({ color = BLACK_100, width = 30, height = 20, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg height={height} width={width} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M15.0005 7.0007H3.83047L8.71047 2.1207C9.10047 1.7307 9.10047 1.0907 8.71047 0.700703C8.32047 0.310703 7.69047 0.310703 7.30047 0.700703L0.710469 7.2907C0.320469 7.6807 0.320469 8.3107 0.710469 8.7007L7.30047 15.2907C7.69047 15.6807 8.32047 15.6807 8.71047 15.2907C9.10047 14.9007 9.10047 14.2707 8.71047 13.8807L3.83047 9.0007H15.0005C15.5505 9.0007 16.0005 8.5507 16.0005 8.0007C16.0005 7.4507 15.5505 7.0007 15.0005 7.0007Z"
        fill={color}
      />
    </Svg>
  );
};

export const PauseSvg = ({ width = 48, height = 54, color = BLACK_50, fill = 'none', ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 48 54" fill="none" {...props}>
      <Path
        d="M45.5 31.3301C48.8333 29.4056 48.8333 24.5944 45.5 22.6699L8 1.01923C4.66666 -0.905266 0.5 1.50036 0.5 5.34937V48.6506C0.5 52.4996 4.66667 54.9053 8 52.9808L45.5 31.3301Z"
        fill="#FFF"
        fillOpacity={1.5}
      />
    </Svg>
  );
};

export const MenuSvg = ({ width = 32, height = 26, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 36 30" fill="none" {...props}>
      <Path d="M6 15H30" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6 7.5H30" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6 22.5H30" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

export const LogOutSvg = ({ width = 20, height = 20, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 96 96" fill="none" {...props}>
      <G clipPath="url(#clip0_105_65)">
        <Path
          d="M28 68L33.64 62.36L23.32 52L64 52V44L23.32 44L33.64 33.68L28 28L8 48L28 68ZM80 76H48V84H80C84.4 84 88 80.4 88 76L88 20C88 15.6 84.4 12 80 12H48V20H80L80 76Z"
          fill="#b0b0b4"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_105_65">
          <Rect width={96} height={96} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const ArrowRight = ({ width = 12, height = 18, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 5 11" fill="none" {...props}>
      <Path d="M0.5 0.799988L4.3 5.39999L0.5 10.2" fill="white" />
      <Path d="M0.5 0.799988L4.3 5.39999L0.5 10.2" stroke="black" strokeMiterlimit={10} strokeLinecap="round" />
    </Svg>
  );
};

export const HeartSvg = ({ width = 44, height = 41, fill = '#FFF', ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 44 41" fill="none" {...props}>
      <G filter="url(#filter0_d_4_1082)">
        <Path
          d="M20.0611 35.818C21.0718 36.5395 22.4282 36.5395 23.4389 35.818C28.4905 32.2118 33.3281 28.063 36.6744 22.7538C38.3509 20.0939 39.0537 17.9429 39.3301 16.184C39.4416 15.5647 39.5 14.9257 39.5 14.2725C39.5 8.59918 35.097 4 29.6655 4C26.4197 4 23.5411 5.64254 21.75 8.17528C19.9589 5.64254 17.0803 4 13.8345 4C8.40304 4 4 8.59918 4 14.2725C4 14.9257 4.05836 15.5647 4.16994 16.184C4.44634 17.9429 5.14906 20.0939 6.82555 22.7538C10.1719 28.063 15.0095 32.2118 20.0611 35.818Z"
          fill={fill}
        />
        <Path
          d="M20.0611 31.5C21.0718 32.2216 22.4282 32.2216 23.4389 31.5C29 28.5 31 27.5 36.6744 22.7538C38.3509 20.0939 39.0537 17.9429 39.3301 16.184C39.4416 15.5647 39.5 14.9257 39.5 14.2725C39.5 8.59918 35.097 4 29.6655 4C26.4197 4 23.5411 5.64254 21.75 8.17528C19.9589 5.64254 17.0803 4 13.8345 4C8.40304 4 4 8.59918 4 14.2725C4 14.9257 4.05836 15.5647 4.16994 16.184C4.44634 17.9429 5.14906 20.0939 6.82555 22.7538C13 27.5 15 28.5 20.0611 31.5Z"
          fill={fill}
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
};

export const CommentSvg = ({ width = 43, height = 43, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 43 43" fill="none" {...props}>
      <G filter="url(#filter0_d_4_1077)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.8242 33.4976C21.7164 33.4992 21.6083 33.5 21.5 33.5C11.835 33.5 4 27.0081 4 19C4 10.9919 11.835 4.5 21.5 4.5C31.165 4.5 39 10.9919 39 19C39 21.0253 38.4989 22.9536 37.5938 24.7044C36.3794 27.1797 34.5051 29.3888 32.472 31.2945C29.3743 34.1981 25.7901 36.39 23.2378 37.6253C22.5627 37.9521 21.8242 37.4404 21.8242 36.7278V33.4976ZM15.5 19.75C15.5 21.1307 14.3807 22.25 13 22.25C11.6193 22.25 10.5 21.1307 10.5 19.75C10.5 18.3693 11.6193 17.25 13 17.25C14.3807 17.25 15.5 18.3693 15.5 19.75ZM21.5 22.25C22.8807 22.25 24 21.1307 24 19.75C24 18.3693 22.8807 17.25 21.5 17.25C20.1193 17.25 19 18.3693 19 19.75C19 21.1307 20.1193 22.25 21.5 22.25ZM32.5 19.75C32.5 21.1307 31.3807 22.25 30 22.25C28.6193 22.25 27.5 21.1307 27.5 19.75C27.5 18.3693 28.6193 17.25 30 17.25C31.3807 17.25 32.5 18.3693 32.5 19.75Z"
          fill="#FBFBFB"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.5 33.5C31.165 33.5 39 27.0081 39 19C39 10.9919 31.165 4.5 21.5 4.5C11.835 4.5 4 10.9919 4 19C4 27.0081 11.835 33.5 21.5 33.5ZM13 22.25C14.3807 22.25 15.5 21.1307 15.5 19.75C15.5 18.3693 14.3807 17.25 13 17.25C11.6193 17.25 10.5 18.3693 10.5 19.75C10.5 21.1307 11.6193 22.25 13 22.25ZM24 19.75C24 21.1307 22.8807 22.25 21.5 22.25C20.1193 22.25 19 21.1307 19 19.75C19 18.3693 20.1193 17.25 21.5 17.25C22.8807 17.25 24 18.3693 24 19.75ZM30 22.25C31.3807 22.25 32.5 21.1307 32.5 19.75C32.5 18.3693 31.3807 17.25 30 17.25C28.6193 17.25 27.5 18.3693 27.5 19.75C27.5 21.1307 28.6193 22.25 30 22.25Z"
          fill="white"
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
};

export const ShareSvg = ({ width = 43, height = 36, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 43 36" fill="none" {...props}>
      <G filter="url(#filter0_d_4_1071)">
        <Path
          d="M37.9988 19.0845C38.4285 18.6965 38.4399 18.0257 38.0236 17.6233L24.7382 4.78295C24.1035 4.16949 23.0432 4.61928 23.0432 5.50199V10.8621C18.0772 10.7853 14.3463 12.0842 11.5737 14.0746C8.75779 16.0962 6.9636 18.807 5.858 21.4345C4.75341 24.0595 4.32774 26.6203 4.25995 28.3761C4.22652 29.242 4.27816 29.9566 4.40223 30.3933C4.43394 30.5048 4.47678 30.622 4.53837 30.7255C4.59258 30.8167 4.70727 30.9754 4.91565 31.0417C5.16639 31.1214 5.37921 31.0191 5.50256 30.9132C5.61389 30.8176 5.6887 30.6943 5.74047 30.5908L5.74705 30.5777L5.75234 30.5653L5.75284 30.5641L5.75411 30.5613L5.76432 30.5391C5.77418 30.518 5.79023 30.4845 5.81294 30.44C5.85837 30.3509 5.93042 30.2173 6.03287 30.049C6.23783 29.7123 6.56409 29.237 7.04199 28.6994C7.99659 27.6255 9.55921 26.2993 11.979 25.3314C13.3564 24.7805 15.6523 24.5297 17.9033 24.4891C20.0514 24.4504 22.0549 24.6041 23.0432 24.822V30.3392C23.0432 31.2058 24.0703 31.6622 24.7134 31.0814L37.9988 19.0845Z"
          fill="#FBFBFB"
        />
        <Path
          d="M33.906 17.6574C34.8657 16.5418 33.906 14.9506 33.906 14.9506L32.25 12.0469L24.7382 4.78295C24.1035 4.16949 23.0432 4.61928 23.0432 5.50199V10.8621C18.0772 10.7853 14.3463 12.0842 11.5737 14.0746C8.75779 16.0962 6.9636 18.807 5.858 21.4345C4.75341 24.0595 4.32774 26.6203 4.25995 28.3761C4.22652 29.242 4.27816 29.9566 4.40223 30.3933C4.43394 30.5048 4.47678 30.622 4.53837 30.7255C4.59258 30.8167 4.70727 30.9754 4.91565 31.0417C5.16639 31.1214 5.37921 31.0191 5.50256 30.9132C5.61389 30.8176 5.6887 30.6943 5.74047 30.5908L5.74705 30.5777L5.75234 30.5653L5.75284 30.5641L5.75411 30.5613L5.76432 30.5391C5.77418 30.518 5.79023 30.4845 5.81294 30.44C5.85837 30.3509 5.93042 30.2173 6.03287 30.049C6.23783 29.7123 6.56409 29.237 7.04199 28.6994C7.99659 27.6255 13.2932 23.8672 16.2932 22.3672C18.7932 20.8672 23.0432 19.8672 23.0432 19.8672V25.8672C23.0432 26.7337 24.0703 27.1901 24.7134 26.6094L33.906 17.6574Z"
          fill="white"
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
};

export const MusicSvg = ({ width = 12, height = 12, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 12 12" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.88889 9.76923V2.50968L10.6667 1.5097V8.30773H8.96293C7.98681 8.30773 7.11111 8.87609 7.11111 9.76923C7.11111 10.6624 7.98681 11.2308 8.96293 11.2308H10.1482C11.1243 11.2308 12 10.6624 12 9.76923V9.00005V0.692472C12 0.264671 11.63 -0.0607384 11.2237 0.00959066L4.11262 1.24034C3.79116 1.29598 3.55556 1.5848 3.55556 1.92322V9.07694H1.85185C0.875698 9.07694 0 9.64536 0 10.5385C0 11.4317 0.875698 12 1.85185 12H3.03704C4.01319 12 4.88889 11.4317 4.88889 10.5385V10.2308V9.76923Z"
        fill="white"
      />
    </Svg>
  );
};

export const TabUploadSvg = ({ width = 15, height = 16, fillOpacity = 1, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 15 16" fill="none" {...props}>
      <Path
        d="M2.5 0.5C2.5 0.223858 2.27614 0 2 0H1C0.723858 0 0.5 0.223858 0.5 0.5V6.5C0.5 6.77614 0.723858 7 1 7H2C2.27614 7 2.5 6.77614 2.5 6.5V0.5Z"
        fill="#161722"
        fillOpacity={fillOpacity}
      />
      <Path
        d="M2.5 9.5C2.5 9.22386 2.27614 9 2 9H1C0.723858 9 0.5 9.22386 0.5 9.5V15.5C0.5 15.7761 0.723858 16 1 16H2C2.27614 16 2.5 15.7761 2.5 15.5V9.5Z"
        fill="#161722"
        fillOpacity={fillOpacity}
      />
      <Path
        d="M8 9C8.27614 9 8.5 9.22386 8.5 9.5V15.5C8.5 15.7761 8.27614 16 8 16H7C6.72386 16 6.5 15.7761 6.5 15.5V9.5C6.5 9.22386 6.72386 9 7 9H8Z"
        fill="#161722"
        fillOpacity={fillOpacity}
      />
      <Path
        d="M8.5 0.5C8.5 0.223858 8.27614 0 8 0H7C6.72386 0 6.5 0.223858 6.5 0.5V6.5C6.5 6.77614 6.72386 7 7 7H8C8.27614 7 8.5 6.77614 8.5 6.5V0.5Z"
        fill="#161722"
        fillOpacity={fillOpacity}
      />
      <Path
        d="M14 9C14.2761 9 14.5 9.22386 14.5 9.5V15.5C14.5 15.7761 14.2761 16 14 16H13C12.7239 16 12.5 15.7761 12.5 15.5V9.5C12.5 9.22386 12.7239 9 13 9H14Z"
        fill="#161722"
        fillOpacity={fillOpacity}
      />
      <Path
        d="M14.5 0.5C14.5 0.223858 14.2761 0 14 0H13C12.7239 0 12.5 0.223858 12.5 0.5V6.5C12.5 6.77614 12.7239 7 13 7H14C14.2761 7 14.5 6.77614 14.5 6.5V0.5Z"
        fill="#161722"
        fillOpacity={fillOpacity}
      />
    </Svg>
  );
};

export const TabIsLikeSvg = ({ width = 20, height = 18, fillOpacity = 1, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 18" fill="none" {...props}>
      <Path
        d="M4.3166 2.36224C2.84322 2.75154 1.75 3.99138 1.75 5.49999C1.75 6.27149 2.04087 7.15823 2.58398 8.12751C3.12337 9.09016 3.88226 10.0824 4.74694 11.0508C6.29123 12.7803 8.11993 14.3756 9.5 15.5261C9.69958 15.3597 9.90855 15.184 10.1247 15C10.31 14.8422 10.5818 14.8389 10.7698 14.9935L11.1631 15.3171C11.402 15.5136 11.407 15.8776 11.1718 16.0785C10.738 16.4488 10.3339 16.7847 9.97678 17.0788C9.69984 17.3069 9.30016 17.3069 9.02322 17.0788C7.60316 15.9094 5.43987 14.0789 3.62806 12.0498C2.72191 11.035 1.88704 9.95232 1.2754 8.86073C0.667465 7.77577 0.25 6.62896 0.25 5.49999C0.25 3.20768 1.90678 1.4475 3.9334 0.912008C5.76106 0.42909 7.87954 0.927122 9.5 2.76843C11.1205 0.927123 13.2389 0.429109 15.0666 0.912047C17.0932 1.44756 18.75 3.20776 18.75 5.50007C18.75 5.90977 18.695 6.32183 18.5959 6.73242C18.5186 7.05263 18.1432 7.17659 17.871 6.99108L17.4057 6.67394C17.2308 6.55474 17.153 6.33882 17.1906 6.13053C17.23 5.91283 17.25 5.70248 17.25 5.50007C17.25 3.99145 16.1568 2.7516 14.6834 2.36227C13.2565 1.98523 11.4538 2.42128 10.124 4.41593L9.91602 4.72794C9.71811 5.0248 9.28189 5.0248 9.08398 4.72794L8.87597 4.41593C7.54618 2.42128 5.74348 1.98521 4.3166 2.36224Z"
        fill="#161722"
        fillOpacity={fillOpacity}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5581 7.05806C10.8021 6.81398 11.1979 6.81398 11.4419 7.05806L18.4419 14.0581C18.686 14.3021 18.686 14.6979 18.4419 14.9419C18.1979 15.186 17.8021 15.186 17.5581 14.9419L16.7766 14.1605C16.0559 14.471 15.2743 14.6249 14.5 14.6249C12.4747 14.6249 10.3993 13.5719 9.49366 11.4178C9.38167 11.1515 9.38167 10.8485 9.49366 10.5821C9.86365 9.70205 10.4289 9.0058 11.1062 8.49004L10.5581 7.94194C10.314 7.69786 10.314 7.30214 10.5581 7.05806ZM12.0011 9.38499L15.8034 13.1873C15.3843 13.312 14.9441 13.3749 14.5 13.3749C12.9091 13.3749 11.3669 12.5679 10.6747 11C10.977 10.3152 11.4414 9.77564 12.0011 9.38499Z"
        fill="#161722"
        fillOpacity={fillOpacity}
      />
      <Path
        d="M17.8155 11.8477C18.0151 11.5957 18.1871 11.313 18.3253 11C17.6331 9.43205 16.0909 8.62501 14.5 8.625C14.4585 8.625 14.4171 8.62555 14.3757 8.62664C14.305 8.62851 14.2363 8.60239 14.1863 8.55242L13.4809 7.84705C13.3424 7.70854 13.4104 7.47392 13.604 7.44394C13.9012 7.39793 14.2011 7.375 14.5 7.375C16.5253 7.37501 18.6007 8.428 19.5063 10.5821C19.6183 10.8485 19.6183 11.1515 19.5063 11.4178C19.3001 11.9084 19.0331 12.3419 18.7199 12.7188C18.6292 12.8281 18.4649 12.831 18.3645 12.7306L17.8302 12.1964C17.7363 12.1024 17.733 11.9519 17.8155 11.8477Z"
        fill="#161722"
        fillOpacity={fillOpacity}
      />
    </Svg>
  );
};

export const LockSvg = ({ width = 22, height = 20, strokeOpacity = 1, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 18" fill="none" {...props}>
      <G clipPath="url(#clip0_858_218)">
        <Path
          d="M10.5 16.8H2.7C1.5 16.8 0.5 15.8 0.5 14.6V8.7C0.5 7.5 1.5 6.5 2.7 6.5H10.4C11.6 6.5 12.6 7.5 12.6 8.7V14.6C12.7 15.8 11.7 16.8 10.5 16.8Z"
          stroke="black"
          strokeOpacity={strokeOpacity}
          strokeLinecap="round"
        />
        <Path
          d="M10.5 6.5V3.6C10.5 1.9 9.10001 0.5 7.40001 0.5H5.80001C4.10001 0.5 2.70001 1.9 2.70001 3.6V6.5H10.5Z"
          stroke="black"
          strokeOpacity={strokeOpacity}
          strokeLinecap="round"
        />
        <Path
          d="M8.7 10.7C8.7 9.50001 7.8 8.60001 6.6 8.60001C5.4 8.60001 4.5 9.50001 4.5 10.7C4.5 11.7 5.2 12.5 6.1 12.7L5.7 15H7.6L7.2 12.7C8.1 12.4 8.7 11.6 8.7 10.7Z"
          stroke="black"
          strokeOpacity={strokeOpacity}
          strokeLinecap="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_858_218">
          <Rect width={13.2} height={17.3} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const ArrowUpSvg = ({ width = 25, height = 25, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 22" fill="none" {...props}>
      <G clipPath="url(#clip0_125_23)">
        <Rect width={22} height={22} fill="white" />
        <Circle cx={11} cy={11} r={11} fill="#FF1111" />
        <Path d="M15 11L11 7L7 11" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M11 15V7" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </G>
      <Defs>
        <ClipPath id="clip0_125_23">
          <Rect width={22} height={22} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const HugHeartSvg = ({ width = 297, height = 157, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 447 307" fill="none" {...props}>
      <Path
        d="M201.368 157.888C81.9993 48.5388 -45.1324 184.388 221.368 306.388C414.474 205.401 364.525 -0.441628 201.368 157.888Z"
        fill="#ED647D"
        stroke="#ED647D"
        strokeLinecap="round"
      />
      <Path d="M355 83.0032C384.853 73.0818 398.026 63.8295 412.5 38.0032" stroke="black" strokeWidth={5} strokeLinecap="round" />
      <Path d="M412.5 37.5C407.999 1.00013 350 38.003 403.001 50.003" stroke="black" strokeWidth={5} strokeLinecap="round" />
      <Path d="M404 51.5032C420.97 52.9868 429.7 52.024 444 47.5032" stroke="black" strokeWidth={5} strokeLinecap="round" />
      <Path d="M160.5 271.503L157.5 273.503" stroke="black" strokeWidth={5} strokeLinecap="round" />
      <Path d="M133.5 244.503C179.5 210.503 194.5 218.503 154 255.503" stroke="black" strokeWidth={5} />
      <Path d="M154.5 256.003C185.5 221.003 199.5 237.003 160.5 271.503" stroke="black" strokeWidth={5} />
      <Path d="M94.0001 173.503C43.5 273.503 59.4999 332.003 157.5 273.503" stroke="black" strokeWidth={5} />
      <Path d="M332 244.504C299 191.503 290.5 196.003 311.5 244.504" stroke="black" strokeWidth={5} />
      <Path d="M310.999 245.003C286.999 207.503 272.5 212.003 297.499 256.503" stroke="black" strokeWidth={5} />
      <Path
        d="M296.501 256.503C263.001 211.503 251.5 231.003 283.501 278.503"
        stroke="black"
        strokeWidth={5}
        strokeLinecap="round"
      />
      <Path d="M283.5 278.5C347 338 395.5 285.503 319.5 169.503" stroke="black" strokeWidth={5} strokeLinecap="round" />
      <Path d="M154 42.0032L294 19.5032" stroke="black" strokeWidth={5} />
      <Path d="M171 55.0032C187.65 75.5586 194.35 70.1609 204.5 49.0032" stroke="black" strokeWidth={5} />
      <Path d="M216 51.0032C227.304 70.3585 235.054 67.5442 250.5 47.0032" stroke="black" strokeWidth={5} />
      <Path d="M180.5 79.5032C196.936 93.1016 205.754 92.8633 220.5 73.0032" stroke="black" strokeWidth={5} />
      <Path d="M154.5 153.003L172.5 109.003" stroke="black" strokeWidth={5} strokeLinecap="round" />
      <Path d="M274.5 162.503L235.5 99.5032" stroke="black" strokeWidth={5} strokeLinecap="round" />
      <Path
        d="M172.5 109.003C81.4998 -33.9969 342.5 -27.4969 235.5 99.5032"
        stroke="black"
        strokeWidth={5}
        strokeLinecap="round"
      />
      <Path d="M96 70.0032L79.5 35.5032" stroke="black" strokeWidth={5} />
      <Path d="M39 106.003L2 77.5032" stroke="black" strokeWidth={5} />
      <Path d="M63.5 82.5032L38.5 49.0032" stroke="black" strokeWidth={5} />
      <Path d="M112 242.003C155 201.003 174.5 210.503 137 242.003" stroke="black" strokeWidth={5} />
    </Svg>
  );
};

export const UnfollowSvg = ({ width = 24, height = 24, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M16 11L18 13L22 9" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

export const MessageSvg = ({ width = 66, height = 69, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 66 69" fill="none" {...props}>
      <Path
        d="M19 27.5C18.1716 27.5 17.5 28.1716 17.5 29C17.5 29.8284 18.1716 30.5 19 30.5H47C47.8284 30.5 48.5 29.8284 48.5 29C48.5 28.1716 47.8284 27.5 47 27.5H19Z"
        fill="#B0B0B3"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 0.5C2.01472 0.5 0 2.51472 0 5V52.5C0 54.9853 2.01472 57 4.5 57H22.0119C22.4807 57 22.9225 57.2192 23.2062 57.5924L31.0096 67.86C32.0101 69.1764 33.99 69.1764 34.9904 67.86L42.7938 57.5924C43.0775 57.2192 43.5193 57 43.9881 57H61.5C63.9853 57 66 54.9853 66 52.5V5C66 2.51472 63.9853 0.5 61.5 0.5H4.5ZM3 5C3 4.17157 3.67157 3.5 4.5 3.5H61.5C62.3284 3.5 63 4.17157 63 5V52.5C63 53.3284 62.3284 54 61.5 54H43.9881C42.5818 54 41.2563 54.6575 40.4053 55.7771L33 65.521L25.5947 55.7771C24.7437 54.6575 23.4182 54 22.0119 54H4.5C3.67157 54 3 53.3284 3 52.5V5Z"
        fill="#B0B0B3"
      />
    </Svg>
  );
};

export const ChatSvg = ({ width = 24, height = 20, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 20" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.792884 1.70711C0.162919 1.07714 0.609085 0 1.49999 0H22C22.7678 0 23.2492 0.829481 22.8682 1.49614L12.8682 18.9961C12.4322 19.7592 11.2947 19.6291 11.0422 18.7873L8.11461 9.02883L0.792884 1.70711ZM10.1841 8.96697L12.2881 15.9802L20.2768 2H3.9142L9.162 7.24779L14.4961 4.13622C14.9732 3.85794 15.5855 4.01908 15.8638 4.49613C16.142 4.97318 15.9809 5.5855 15.5039 5.86378L10.1841 8.96697Z"
        fill="black"
      />
    </Svg>
  );
};

export const CameraSvg = ({ width = 28, height = 22, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 22" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5 11.75C19.5 14.7876 17.0376 17.25 14 17.25C10.9624 17.25 8.5 14.7876 8.5 11.75C8.5 8.71243 10.9624 6.25 14 6.25C17.0376 6.25 19.5 8.71243 19.5 11.75ZM17.5 11.75C17.5 13.683 15.933 15.25 14 15.25C12.067 15.25 10.5 13.683 10.5 11.75C10.5 9.817 12.067 8.25 14 8.25C15.933 8.25 17.5 9.817 17.5 11.75Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2208 0C9.3599 0 8.59562 0.55086 8.32339 1.36754L7.77924 3H3.5C1.84315 3 0.5 4.34315 0.5 6V18.5C0.5 20.1569 1.84315 21.5 3.5 21.5H24.5C26.1569 21.5 27.5 20.1569 27.5 18.5V6C27.5 4.34315 26.1569 3 24.5 3H20.2208L19.6766 1.36754C19.4044 0.55086 18.6401 0 17.7792 0H10.2208ZM10.2208 2H17.7792L18.3234 3.63246C18.5956 4.44914 19.3599 5 20.2208 5H24.5C25.0523 5 25.5 5.44772 25.5 6V18.5C25.5 19.0523 25.0523 19.5 24.5 19.5H3.5C2.94772 19.5 2.5 19.0523 2.5 18.5V6C2.5 5.44772 2.94772 5 3.5 5H7.77924C8.6401 5 9.40438 4.44914 9.67661 3.63246L10.2208 2Z"
        fill="white"
      />
    </Svg>
  );
};

export const RemoveSvg = ({ width = 22, height = 22, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 22" fill="none" {...props}>
      <Circle cx={11} cy={11} r={11} fill="#CAC7C7" />
      <Path d="M8.17163 8.17163C11.1886 11.1886 13.1999 13.1999 13.8285 13.8285" stroke="white" strokeLinecap="round" />
      <Path d="M8.17163 13.8284L13.8285 8.17151" stroke="white" strokeLinecap="round" />
    </Svg>
  );
};

export const InboxSvg = ({ width = 28, height = 24, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 24" fill="none" {...props}>
      <G clipPath="url(#clip0_204_2)">
        <Rect width={24} height={24} fill="white" />
        <Path
          d="M18 3H5.22222C4.63285 3 4.06762 3.21071 3.65087 3.58579C3.23413 3.96086 3 4.46957 3 5V21L7.44444 17H20.7778C21.3671 17 21.9324 16.7893 22.3491 16.4142C22.7659 16.0391 23 15.5304 23 15V8"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path d="M23 8C27 8 28.6667 8 29 8V19.5H14L13 21.5H12.5V18" stroke="black" strokeWidth={1.3} />
      </G>
      <Path d="M24 19.5H27V14V8H23" stroke="black" strokeWidth={1.3} />
      <G clipPath="url(#clip1_204_2)">
        <Path d="M23 1V5.08333" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M21 3H25.0833" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </G>
      <Defs>
        <ClipPath id="clip0_204_2">
          <Rect width={24} height={24} fill="white" />
        </ClipPath>
        <ClipPath id="clip1_204_2">
          <Rect width={7} height={7} fill="white" transform="translate(19)" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const SendSvg = ({ width = 35, height = 31, fill = '#FF0000', ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 39 36" fill="none" {...props}>
      <Ellipse cx={19.5} cy={18} rx={19.5} ry={18} fill={fill} />
      <Path d="M28 9L17 20" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M28 9L21 29L17 20L8 16L28 9Z" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

export const FriendsSvg = ({ width = 72, height = 66, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 36 30" fill="none" {...props}>
      <Path
        d="M24 26.25V23.75C24 22.4239 23.3679 21.1521 22.2426 20.2145C21.1174 19.2768 19.5913 18.75 18 18.75H9C7.4087 18.75 5.88258 19.2768 4.75736 20.2145C3.63214 21.1521 3 22.4239 3 23.75V26.25"
        stroke="#D9D9D9"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.5 13.75C16.8137 13.75 19.5 11.5114 19.5 8.75C19.5 5.98858 16.8137 3.75 13.5 3.75C10.1863 3.75 7.5 5.98858 7.5 8.75C7.5 11.5114 10.1863 13.75 13.5 13.75Z"
        stroke="#D9D9D9"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M33 26.25V23.75C32.999 22.6422 32.5565 21.566 31.742 20.6904C30.9276 19.8148 29.7872 19.1895 28.5 18.9125"
        stroke="#D9D9D9"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M24 3.91251C25.2906 4.18788 26.4346 4.81338 27.2515 5.69039C28.0684 6.56741 28.5118 7.64604 28.5118 8.75626C28.5118 9.86647 28.0684 10.9451 27.2515 11.8221C26.4346 12.6991 25.2906 13.3246 24 13.6"
        stroke="#D9D9D9"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const CallEnd = ({ width = 22.882, height = 7.844, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22.882 7.844" {...props}>
      <Path
        d="M11.441 1.771a15.2 15.2 0 00-4.386.637v2.749a.889.889 0 01-.534.8A11.116 11.116 0 003.98 7.595a.991.991 0 01-.667.252.969.969 0 01-.672-.261L.281 5.392a.843.843 0 010-1.257A16.829 16.829 0 0111.441 0 16.829 16.829 0 0122.6 4.134a.846.846 0 01.281.629.836.836 0 01-.281.624l-2.36 2.191a.989.989 0 01-.672.261 1 1 0 01-.667-.252 11.117 11.117 0 00-2.541-1.638.889.889 0 01-.534-.8V2.4a15.349 15.349 0 00-4.385-.629z"
        fill="#fff"
      />
    </Svg>
  );
};

export const VideoIconSvg = ({ width = 22.882, height = 7.844, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 33 21" fill="none" {...props}>
      <Path
        d="M30.1933 19.124C29.8914 19.1238 29.5929 19.0576 29.3172 18.9296C29.253 18.8999 29.1918 18.8637 29.1345 18.8214L23.5602 14.7339C23.2775 14.5266 23.0468 14.2515 22.8875 13.9319C22.7283 13.6123 22.6451 13.2574 22.645 12.8973V7.32273C22.6451 6.96259 22.7283 6.60774 22.8875 6.2881C23.0468 5.96845 23.2775 5.69339 23.5602 5.48608L29.1345 1.39855C29.1918 1.35631 29.253 1.3201 29.3172 1.29043C29.6455 1.13835 30.0052 1.07416 30.3634 1.10368C30.7216 1.1332 31.0671 1.25549 31.3684 1.45945C31.6697 1.66341 31.9174 1.94258 32.0888 2.27158C32.2602 2.60057 32.35 2.96898 32.35 3.34332V16.8767C32.35 17.4725 32.1228 18.044 31.7183 18.4653C31.3139 18.8866 30.7653 19.1233 30.1933 19.1233V19.124ZM16.9837 20.22H4.58292C3.36783 20.2187 2.20288 19.7153 1.34368 18.8202C0.484492 17.9252 0.00124889 16.7116 0 15.4458V4.77417C0.00124889 3.50838 0.484492 2.29481 1.34368 1.39976C2.20288 0.50471 3.36783 0.00130101 4.58292 0H17.0161C18.2225 0.00148645 19.3792 0.501404 20.2323 1.39009C21.0853 2.27878 21.5652 3.48367 21.5667 4.74047V15.4458C21.5654 16.7116 21.0822 17.9252 20.223 18.8202C19.3638 19.7153 18.1988 20.2187 16.9837 20.22Z"
        fill="black"
      />
    </Svg>
  );
};

export const CameraSwitchSvg = ({ width = 22.882, height = 7.844, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg viewBox="0 0 19.046 16.357" {...props}>
      <Defs></Defs>
      <Path
        d="M21.045 11.238a.682.682 0 00-.627-.423h-.8a7.708 7.708 0 00-.443-1.608 8.178 8.178 0 00-15.239 0 .682.682 0 101.27.493 6.815 6.815 0 0112.7 0 6.134 6.134 0 01.314 1.118h-.532a.686.686 0 00-.484 1.165l1.363 1.363.109.068h.034a.634.634 0 00.341.129.682.682 0 00.484-.2l1.365-1.362a.682.682 0 00.145-.743zm-2.256 3.033a.682.682 0 00-.879.388 6.815 6.815 0 01-12.7 0 6.134 6.134 0 01-.314-1.118h.532a.686.686 0 00.484-1.165l-1.367-1.363-.109-.068a.682.682 0 00-.825.089L2.248 12.4a.669.669 0 00.45 1.145h.8a7.708 7.708 0 00.443 1.608 8.178 8.178 0 0015.239 0 .682.682 0 00-.391-.882z"
        transform="translate(-2.052 -4)"
      />
      <Path
        d="M13.602 12.179a2.045 2.045 0 10-2.045 2.045 2.045 2.045 0 002.045-2.045zm-2.726 0a.682.682 0 11.682.682.682.682 0 01-.682-.682z"
        transform="translate(-2.052 -4)"
      />
    </Svg>
  );
};

export const LeaveSvg = ({ width = 24, height = 24, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#clip0_226_104)" fill="#fff">
        <Path d="M3 0h11c1.7 0 3 1.3 3 3v6H8c-1.7 0-3 1.3-3 3s1.3 3 3 3h9v6c0 1.7-1.3 3-3 3H3c-1.7 0-3-1.3-3-3V3c0-1.7 1.4-3 3-3z" />
        <Path d="M20.6 13H8c-.6 0-1-.4-1-1s.4-1 1-1h12.6l-1.3-1.3c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l3 3c.4.4.4 1 0 1.4l-3 3c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.3-1.3z" />
      </G>
      <Defs>
        <ClipPath id="clip0_226_104">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const MicOffSvg = ({ width = 24, height = 24, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 12.691 12.691" {...props}>
      <Path d="M0 0h12.691v12.691H0zm0 0h12.691v12.691H0z" fill="none" />
      <Path
        d="M10.062 5.819h-.9a2.607 2.607 0 01-.231 1.087l.654.652a3.431 3.431 0 00.477-1.739zm-2.131.087c0-.029.008-.058.008-.087V2.637a1.593 1.593 0 00-3.185 0v.1zm-5.686-4.33l-.677.673 3.19 3.191v.382a1.589 1.589 0 001.587 1.591 1.638 1.638 0 00.345-.04l.881.88a2.928 2.928 0 01-1.226.273 2.753 2.753 0 01-2.813-2.704h-.9a3.7 3.7 0 003.185 3.564v1.737h1.062V9.384a3.765 3.765 0 001.348-.48l2.222 2.22.677-.674z"
        fill={props.fill}
      />
    </Svg>
  );
};

export const MicOnSvg = ({ width = 24, height = 24, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} fill="#FFF" viewBox="0 0 15.238 16" {...props}>
      <Defs>
        <ClipPath id="a">
          <Path transform="translate(.235 .255)" d="M0 0H15.238V16H0z" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#a)">
        <Path
          d="M6.765 8.909a2.225 2.225 0 002.229-2.224l.007-4.45a2.236 2.236 0 00-4.472 0v4.448a2.232 2.232 0 002.236 2.226zm3.95-2.224a3.856 3.856 0 01-3.95 3.781 3.856 3.856 0 01-3.95-3.781H1.548a5.182 5.182 0 004.472 4.982v2.431h1.491v-2.431a5.182 5.182 0 004.472-4.982z"
          transform="translate(-.235 -.255) translate(1.174 .899)"
        />
        <Path d="M0 .567h13.531v13.531H0z" transform="translate(-.235 -.255) translate(1.174 .899)" fill="none" />
      </G>
    </Svg>
  );
};

export const VideoOffSvg = ({ width = 24, height = 24, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 31 30" {...props}>
      <Defs>
        <ClipPath id="a">
          <Path d="M0 0H31V30H0z" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#a)">
        <Path
          d="M21.5 16.9a1.05 1.05 0 00.5-.9V8a1.193 1.193 0 00-.5-.9.908.908 0 00-1 0L17 8.9A3.058 3.058 0 0014 6h-3.7l11 11c0-.1.1-.1.2-.1zm.2 3.4l-4.8-4.8L7.4 6 3.7 2.3a.967.967 0 00-1.4 0 .967.967 0 000 1.4L4.6 6A3.019 3.019 0 002 9v6a2.946 2.946 0 003 3h9a2.64 2.64 0 001.9-.7l4.4 4.4a.99.99 0 101.4-1.4z"
          transform="translate(-47 -52) translate(50 55)"
          fill={props.fill}
          data-name="Group 2115"
        />
      </G>
    </Svg>
  );
};

export const VideoOnSvg = ({ width = 24, height = 24, ...props }: SvgProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 9.6" {...props}>
      <Path
        d="M15.6.88a.727.727 0 00-.8 0L12 2.32A2.446 2.446 0 009.6 0H2.4A2.357 2.357 0 000 2.4v4.8a2.357 2.357 0 002.4 2.4h7.2A2.446 2.446 0 0012 7.28l2.88 1.44a.843.843 0 001.04-.32A.721.721 0 0016 8V1.6a.955.955 0 00-.4-.72z"
        fill={props.fill}
      />
    </Svg>
  );
};
