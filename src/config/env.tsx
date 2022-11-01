import { devApiUrl, devUri, prodApiUrl, staginApiUrl } from '@env';
const devEnv = {
  devApiUrl,
  devUri
};

const stagin = {
  staginApiUrl
};

const prod = {
  prodApiUrl
};

export default __DEV__ ? devEnv : prod;
