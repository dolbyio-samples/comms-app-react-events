import getProxyUrl from '@src/utils/getProxyUrl';
import { useMemo, useState, useEffect, useCallback } from 'react';

import fetch from '../utils/fetch';

const useToken = () => {
  const accessToken = useMemo(() => {
    return encodeURIComponent(import.meta.env.VITE_CLIENT_ACCESS_TOKEN || '');
  }, []);

  const [YOUR_TOKEN, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>();

  const getToken = useCallback(async () => {
    if (accessToken && accessToken.length) {
      return accessToken;
    }
    try {
      const res = await fetch(`${getProxyUrl()}/client-access-token`, {
        method: 'GET',
      });

      if (!res.data.access_token) {
        setError(`Invalid Dolby.io token, please refer to Readme to set it correctly`);
      }
      setError(undefined);
      return res.data.access_token;
    } catch (e) {
      setError(`Invalid Dolby.io token, please refer to Readme to set it correctly`);

      return null;
    }
  }, [accessToken]);

  useEffect(() => {
    (async () => {
      setToken(await getToken());
    })();
  }, [getToken]);

  return { YOUR_TOKEN, getToken, error };
};

export default useToken;
