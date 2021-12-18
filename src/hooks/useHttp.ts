import qs from 'qs';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import userData from '@/store/user';

const apiUrl = 'http://182.92.168.192:8081/api';

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  {
    data, token, headers, ...customConfig
  }: Config = {},
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        //  await auth.logout();
        console.log(401)
        window.location.reload();
        return Promise.reject({ message: '请重新登录' });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      return Promise.reject(data);
    });
};

export const useHttp = () => {
  const user = useRecoilValue(userData);
  // utility type 的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token || config?.token }),
    [user?.token],
  );
};
