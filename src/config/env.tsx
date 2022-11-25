import { devApiUrl, devVideoUri, prodApiUrl, staginApiUrl } from '@env';
const devEnv = {
  devApiUrl,
  devVideoUri
};

const stagin = {
  staginApiUrl
};

const prod = {
  prodApiUrl
};

export default __DEV__ ? devEnv : prod;
