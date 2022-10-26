import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BLACK_100 } from '../../styles/color';
import { TYPOGRAPHY_STYLES } from '../../styles/typography';
import { TextField } from '../text-field';

type HeaderProps = {
  left?: React.ReactNode;
  onLeftPress?: () => void;
  title?: string | React.ReactNode;
  right?: React.ReactNode;
  onRightPress?: () => void;
  transparent?: boolean;
};

export const HeaderScreen = (props: HeaderProps): JSX.Element => {
  const { title, left, onLeftPress, right, onRightPress, transparent } = props;
  return (
    <View style={[styles.container, transparent && styles.bgTransparent]}>
      {left && (
        <TouchableOpacity disabled={!onLeftPress} onPress={onLeftPress}>
          {left}
        </TouchableOpacity>
      )}
      <View>
        {typeof title === 'string' ? <TextField label={title} style={[TYPOGRAPHY_STYLES.Headline5, styles.title]} /> : title}
      </View>
      {right && (
        <TouchableOpacity disabled={!onRightPress} onPress={onRightPress}>
          {right}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bgTransparent: { backgroundColor: 'transparent' },
  title: { color: BLACK_100 }
});
