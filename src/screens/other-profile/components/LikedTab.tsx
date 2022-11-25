import React from 'react';
import { View } from 'react-native';
import { TextField } from '../../../components/text-field';
import { TYPOGRAPHY_STYLES } from '../../../styles/typography';

export const LikedOtherTab = (props: any): JSX.Element => {
  const { name } = props;
  return (
    <View style={{ marginTop: 50 }}>
      <TextField
        label={"This user's liked videos are private"}
        style={{ ...TYPOGRAPHY_STYLES.Body2, fontWeight: 'bold', color: 'black', textAlign: 'center' }}
      />
      <View style={{ marginTop: 10 }}>
        <TextField
          label={`Videos liked by ${name} are currently hidden`}
          style={{ ...TYPOGRAPHY_STYLES.Body2, color: 'black', textAlign: 'center', opacity: 0.5 }}
        />
      </View>
    </View>
  );
};
