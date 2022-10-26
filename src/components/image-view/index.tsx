import { useState } from 'react';
import { Image, ImageProps, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { PRIMARY } from '../../styles/color';

type Props = {
  iconColor?: string | undefined;
  iconSize?: number | 'small' | 'large' | undefined;
  width?: number | string | undefined;
  height?: number | string | undefined;
};

export const ImageView = (props: ImageProps & Props): JSX.Element => {
  const { iconSize = 40, iconColor = PRIMARY, width, height, style, ...other } = props;
  const [loading, setLoading] = useState(false);
  return (
    <View style={{ width: width, height: height }}>
      <Image
        {...other}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => {
          setLoading(false);
        }}
        style={[{ width: width, height: height }, style]}
      />
      {loading && <ActivityIndicator animating={true} color={iconColor} size={iconSize} style={styles.activityIndicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});
