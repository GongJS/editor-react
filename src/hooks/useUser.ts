import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import userData, { UserProps } from '@/store/user';

const useUser = () => {
  const [user, setUser] = useRecoilState(userData);
  const navigate = useNavigate();
  const setUserData = (data: UserProps) => {
    setUser((oldUser) => ({
      ...oldUser,
      ...data,
    }));
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setUser({
      isLogin: false,
      token: '',
      data: {},
    });
    localStorage.removeItem('token', '');
    message.success('退出登录成功，2秒后跳转到首页', 2);
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
