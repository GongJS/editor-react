import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button, Dropdown, Menu, message,
} from 'antd';

import {
  useRecoilState,
} from 'recoil';
import Store, { UserProps } from '@/store';
import './style.less';

interface UserProfileProps {
  user: UserProps
}
const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [store, setStore] = useRecoilState(Store);
  const navigate = useNavigate();
  const oldUserName = store.user.userName;
  const login = () => {
    const newStore = {
      ...store,
      user: {
        isLogin: true,
        userName: oldUserName,
      },
    };
    setStore(newStore);
  };
  const logOut = () => {
    const newStore = {
      ...store,
      user: {
        isLogin: false,
        userName: oldUserName,
      },
    };
    setStore(newStore);
    message.success('退出登录成功，2秒后跳转到首页', 2);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  const menu = (
    <Menu>
      <Menu.Item onClick={logOut}>
        登出
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="user-profile">
      {
        store.user.isLogin
          ? (
            <div>
              <Dropdown overlay={menu} className="user-profile-component">
                <Link to="/setting">{user.userName}</Link>
              </Dropdown>
            </div>
          )
          : (
            <Button
              type="primary"
              className="user-profile-component"
              onClick={login}
            >
              登录
            </Button>
          )
      }

    </div>
  );
};

export default UserProfile;
