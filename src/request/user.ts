import { useMutation } from 'react-query';
import { http, useHttp } from '@/hooks/useHttp';
import { LoginByPhoneNumberProps } from '@/views/login';
import useUser from '@/hooks/useUser';

export const getUserInfo = async (token: string) =>
  await http('users/getUserInfo', { token });

export const useUserLogin = () => {
  const client = useHttp();
  const { setUserData } = useUser();
  return useMutation(
    (params: LoginByPhoneNumberProps) =>
      client('users/loginByPhoneNumber', {
        data: params,
        method: 'POST',
      }),
    {
      onSuccess: async (data) => {
        const userInfo = await getUserInfo(data.token);
        setUserData({
          token: data.token,
          isLogin: true,
          data: {
            ...userInfo,
          },
        });
      },
    },
  );
};

export const useGetCode = () => {
  const client = useHttp();
  return useMutation((params: { phoneNumber: string }) =>
    client('users/genVeriCode', {
      data: params,
      method: 'POST',
    }),
  );
};
