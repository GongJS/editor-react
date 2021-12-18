import {
  atom,
} from 'recoil';

export interface UserDataProps {
  username?: string;
  id?: string;
  phoneNumber?: string;
  nickName?: string;
  description?: string;
  updatedAt?: string;
  createdAt?: string;
  iat?: number;
  exp?: number;
  picture?: string;
  gender?: string;
}

export interface UserProps {
  isLogin: boolean;
  token: string;
  data: UserDataProps;
}

const userData = atom({
  key: 'userData',
  default: {
    isLogin: false,
    token: localStorage.getItem('token'),
    data: {} as UserDataProps,
  } as UserProps,
});

export default userData;
