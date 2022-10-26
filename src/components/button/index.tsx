import { default as React } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { PRIMARY } from '../../styles/color';
import { TYPOGRAPHY_STYLES } from '../../styles/typography';

export type ButtonProps = React.ComponentProps<typeof Button>;

export const DefaultButton = (props: ButtonProps): JSX.Element => {
  const { disabled, children, color = PRIMARY, labelStyle, style, ...other } = props;
  return (
    <Button
      {...other}
      disabled={disabled || other.loading}
      color={color}
      labelStyle={[TYPOGRAPHY_STYLES.Button, labelStyle]}
      style={[styles.button, style]}
      mode="contained"
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({ button: { borderRadius: 4, padding: 4 } });
