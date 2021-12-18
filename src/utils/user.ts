import { useMutation } from 'react-query';
import {http, useHttp} from '@/hooks/useHttp';
import { LoginByPhoneNumberProps } from '@/views/login';

export const useUserLogin = () => {
  const client = useHttp();
  return useMutation((params: LoginByPhoneNumberProps) => client('users/loginByPhoneNumber', {
    data: params,
    method: 'POST',
  }));
};

export const getUserInfo = async (token: string) => {
  const userInfo = await http('users/getUserInfo', { token });
  return userInfo.data
};