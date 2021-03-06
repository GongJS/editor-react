import qs from 'qs';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { message } from 'antd';
import userData from '@/store/user';

export const apiUrl = 'https://editor-server.ooaaoo.top/api';

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {},
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
    if (data) {
      endpoint += `?${qs.stringify(data)}`;
    }
  } else {
    config.body = JSON.stringify(data || {});
  }
  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      // 请求正常
      if (data.errno === 0) {
        return data.data;
      }
      // 未登录
      if (data.errno === 12001) {
        localStorage.removeItem('token');
        message.error(data.message);
        window.location.reload();
        return Promise.reject(data);
      }
      // response code 错误
      message.error(data.message);
      return Promise.reject(data);
    }
    // http code 错误
    message.error(response.statusText);
    return Promise.reject(data);
  });
};

export const useHttp = () => {
  const user = useRecoilValue(userData);
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token || config?.token }),
    [user?.token],
  );
};
