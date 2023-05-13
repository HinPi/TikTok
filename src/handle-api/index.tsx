import { API_BASE_URL, FCM_SERVER_URL, VIDEOSDK_TOKEN, devApiUrl } from '@env';
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

export const getToken = () => {
  return VIDEOSDK_TOKEN;
};

export const createMeeting = async ({ token }: { token: string }) => {
  const res = await fetch(`${API_BASE_URL}/rooms`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });

  const { roomId } = await res.json();
  return roomId;
};

export const initiateCall = async ({ callerInfo, calleeInfo, videoSDKInfo }: any) => {
  await fetch(`${FCM_SERVER_URL}/initiate-call`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callerInfo,
      calleeInfo,
      videoSDKInfo
    })
  })
    .then((response) => {
      console.log(' RESP', response);
    })
    .catch((error) => console.error('error', error));
};

export const updateCallStatus = async ({ callerInfo, type }: any) => {
  await fetch(`${FCM_SERVER_URL}/update-call`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callerInfo,
      type
    })
  })
    .then((response) => {
      console.log('##RESP', response);
    })
    .catch((error) => console.error('error', error));
};
