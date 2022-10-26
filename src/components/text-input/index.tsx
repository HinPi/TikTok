import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput as RNTextInput } from 'react-native-paper';
import { BLACK_20, BLACK_40, DARK_RED, PRIMARY } from '../../styles/color';
import { TYPOGRAPHY_STYLES } from '../../styles/typography';
import { HideSvg, ShowSvg } from '../../svg-view';

export type TextInputProps = React.ComponentProps<typeof RNTextInput>;

export const TextInput = (props: TextInputProps): JSX.Element => {
  const {
    outlineColor = BLACK_20,
    selectionColor = PRIMARY,
    activeOutlineColor = PRIMARY,
    placeholderTextColor = BLACK_40,
    mode = 'outlined',
    style,
    error,
    left,
    right,
    secureTextEntry,
    ...other
  } = props;
  const [secureText, setSecureText] = useState(secureTextEntry);

  return (
    <RNTextInput
      {...other}
      theme={{ roundness: 12 }}
      mode={mode}
      allowFontScaling={false}
      left={left && <RNTextInput.Icon name={() => left} />}
      right={
        secureTextEntry && (
          <RNTextInput.Icon
            name={() => (
              <TouchableOpacity
                onPress={() => setSecureText(!secureText)}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                {secureText ? <HideSvg /> : <ShowSvg />}
              </TouchableOpacity>
            )}
          />
        )
      }
      outlineColor={error ? DARK_RED : outlineColor}
      selectionColor={error ? DARK_RED : selectionColor}
      activeOutlineColor={error ? DARK_RED : activeOutlineColor}
      placeholderTextColor={placeholderTextColor}
      style={[TYPOGRAPHY_STYLES.Body2, styles.bgColor, style]}
      secureTextEntry={secureText}
    />
  );
};

const styles = StyleSheet.create({
  bgColor: { backgroundColor: 'rgba(242, 244, 250, 0.6)' }
});
