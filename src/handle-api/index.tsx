import { devApiUrl } from '@env';
import { useEffect, useState } from 'react';
type Response = { response?: any; loading?: boolean };

export const useFetch = (path: string, refreshing?: boolean): Response => {
  const [state, setState] = useState<Response>({});
  useEffect(() => {
    const fetchData = async () => {
      setState({ loading: true });
      try {
        const baseResponse = await fetch(devApiUrl + path, {
          method: 'GET'
        });
        const response = await baseResponse.json();
        setState({ response, loading: false });
      } catch (error: any) {
        setState({ loading: false });
      }
    };
    fetchData();
  }, [devApiUrl, refreshing]);

  return state;
};
