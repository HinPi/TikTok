import create from "zustand";

interface AppCredentials {
  name?: string;
  userName?: string;
  avatar?: string;
  token?: string;
}

interface Store extends AppCredentials {
  credentials?: AppCredentials;
  isLogged?: boolean;
  isConnected?: boolean;
  setCredentials: (credentials: AppCredentials) => void;
}

export const useStore = create<Store>((set) => ({
  credentials: undefined,
  isLogged: false,
  isConnected: true,
  setCredentials: (credentials: AppCredentials) => {
    set((state) => ({ ...state, credentials, isLogged: true }));
  },
}));
