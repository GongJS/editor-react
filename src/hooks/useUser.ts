import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import userData, { UserProps } from '@/store/user';

const useUser = () => {
  const setUser = useSetRecoilState(userData);
  const navigate = useNavigate();
  const setUserData = (data: UserProps) => {
    setUser((oldUser) => ({
      ...oldUser,
      ...data,
    }));
    localStorage.setItem('token', data.token);
  };

  const logout = (msg?: string) => {
    setUser({
      isLogin: false,
      token: '',
      data: {},
    });
    localStorage.removeItem('token');
    message.success(msg || '退出登录成功，2秒后跳转到首页', 2);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return {
    logout,
    setUserData,
  };
};

export default useUser;
