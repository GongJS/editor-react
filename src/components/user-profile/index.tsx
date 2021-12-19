import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button, Dropdown, Menu,
} from 'antd';

import { useRecoilValue } from 'recoil';
import useUser from '@/hooks/useUser';
import userData from '@/store/user';
import './style.less';

const UserProfile: React.FC = () => {
  const user = useRecoilValue(userData);
  const { logout } = useUser();
  const navigate = useNavigate();
  const createDesign = () => {
    if (user.isLogin) {
      const payload = {
        title: '未命名作品',
        desc: '未命名作品',
        coverImg: 'http://typescript-vue.oss-cn-beijing.aliyuncs.com/vue-marker/5f81cca3f3bf7a0e1ebaf885.png',
      };
    } else {
      navigate('/login');
    }
  };
  const menu = (
    <Menu>
      <Menu.Item onClick={logout}>
        登出
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="user-profile">
      {
        !user.isLogin && (
        <Button
          type="primary"
          onClick={() => navigate('/login')}
        >
          登录
        </Button>
        )
      }
      <div className="user-operation">
        <Button type="primary" shape="round" onClick={createDesign}>
          创建设计
        </Button>
        <Button type="primary" shape="round">
          <Link to="/mywork">我的作品</Link>
        </Button>
        <Dropdown.Button overlay={menu}>
          <Link to="/setting">{user.data.nickName}</Link>
        </Dropdown.Button>
      </div>
    </div>
  );
};

export default UserProfile;
