import { default as React } from 'react';
import { Keyboard, ScrollViewProps } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const KeyboardWithScroll = (props: ScrollViewProps): JSX.Element => {
  return (
    <KeyboardAwareScrollView
      {...props}
      bounces={false}
      extraScrollHeight={30}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      onTouchCancel={Keyboard.dismiss}
    />
  );
};
