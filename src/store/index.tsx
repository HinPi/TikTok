import { devApiUrl } from '@env';
import create from 'zustand';
import { PATH } from '../constants';
import { removeItem, setItem } from '../device-info';

interface AppCredentials {
  name?: string;
  userName?: string;
  avatar?: string;
  token?: string;
}

type infoLogin = {
  userID: string;
  name: string;
  imgURL: string;
  provider: string;
};
interface Store extends AppCredentials {
  credentials?: AppCredentials;
  isLogged?: boolean;
  isConnected?: boolean;
  setCredentials: (credentials: AppCredentials) => void;
  login: (params: infoLogin) => Promise<void>;
  logout: () => Promise<void>;
  postData: (token?: string, path?: string, params?: { message?: string }) => Promise<void>;
}

export const useStore = create<Store>((set) => ({
  credentials: undefined,
  isLogged: false,
  isConnected: true,
  setCredentials: (credentials: AppCredentials) => {
    set((state) => ({ ...state, credentials, isLogged: true }));
  },
  login: async (params: infoLogin) => {
    try {
      const response = await fetch(devApiUrl + PATH.LOGIN, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const resJson = await response.json();

      setItem('credentials', { token: resJson.accessToken, avatar: params.imgURL, name: params.name });
      set((state) => ({
        ...state,
        credentials: { token: resJson.accessToken, avatar: params.imgURL, name: params.name },
        isLogged: true
      }));
    } catch (error) {
      set((state) => ({ ...state, error }));
    }
  },
  postData: async (token?: string, path?: string, params?: { message?: string }) => {
    try {
      const response = await fetch(devApiUrl + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(params)
      });
      const resJson = await response.json();
      console.log(resJson);
    } catch (err) {
      console.log(err);
    }
  },
  logout: async () => {
    removeItem('credentials');
    set((state) => ({ ...state, isLogged: false, token: undefined, avatar: undefined, name: undefined }));
  }
}));
