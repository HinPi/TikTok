import React from 'react';
import { TextInput as RNTextInput } from 'react-native-paper';
import { BLACK_20, BLACK_40, DARK_RED, PRIMARY } from '../../styles/color';
import { TYPOGRAPHY_STYLES } from '../../styles/typography';

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
    value,
    right,
    label,
    onChangeText,
    secureTextEntry,
    defaultValue,
    multiline,
    numberOfLines = 1,
    ...other
  } = props;

  return (
    <RNTextInput
      {...other}
      theme={{ roundness: 12 }}
      mode={mode}
      label={label}
      defaultValue={defaultValue}
      //   right={
      //     values && (
      //       <RNTextInput.Icon
      //         icon={() => (
      //           <TouchableOpacity
      //             onPress={() => {
      //               setValue('');
      //             }}
      //             activeOpacity={0.5}
      //             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      //           >
      //             <RemoveSvg />
      //           </TouchableOpacity>
      //         )}
      //       />
      //     )
      //   }
      onChangeText={onChangeText}
      allowFontScaling={false}
      outlineColor={error ? DARK_RED : outlineColor}
      selectionColor={error ? DARK_RED : selectionColor}
      activeOutlineColor={error ? DARK_RED : activeOutlineColor}
      placeholderTextColor={placeholderTextColor}
      style={[TYPOGRAPHY_STYLES.Body2, style]}
      //   secureTextEntry={secureText}
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
  );
};
