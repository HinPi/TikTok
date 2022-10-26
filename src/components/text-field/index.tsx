import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { TYPOGRAPHY_STYLES } from '../../styles/typography';

type Props = { label?: string | React.ReactNode; style?: TextStyle; primary?: boolean; border?: boolean };

export const TextField = (props: Props & TextProps): JSX.Element => {
  const { primary, label, style, allowFontScaling = false, ...other } = props;
  return (
    <Text {...other} style={[TYPOGRAPHY_STYLES.Body2, style]} allowFontScaling={allowFontScaling}>
      {label}
    </Text>
  );
};
