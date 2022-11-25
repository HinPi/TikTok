import { devApiUrl } from '@env';
import { useEffect, useState } from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import { useStore } from '../store';
type Response = { response?: any; loading?: boolean };

export const useFetch = (path: string, isFocused?: boolean): Response => {
  const { token } = useStore((store) => store.credentials || {});
  const [state, setState] = useState<Response>({});
  useEffect(() => {
    const fetchData = async () => {
      setState({ loading: true });
      try {
        const baseResponse = await RNFetchBlob.fetch('GET', devApiUrl + path, {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        });
        const response = await baseResponse.json();
        setState({ response, loading: false });
      } catch (error: any) {
        console.log(error);
        setState({ loading: false });
      }
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [devApiUrl, isFocused]);

  return state;
};

//300000ms
