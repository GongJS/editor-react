import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'antd';

import { useRecoilValue } from 'recoil';
import useUser from '@/hooks/useUser';
import userData from '@/store/user';
import { useFetchCreateWork } from '@/request/works';
import './style.less';

const UserProfile: React.FC = () => {
  const user = useRecoilValue(userData);
  const { mutateAsync: createWorks, isLoading } = useFetchCreateWork();
  const { logout } = useUser();
  const navigate = useNavigate();
  const createDesign = async () => {
    if (user.isLogin) {
      const payload = {
        title: '未命名作品',
        desc: '未命名作品',
        coverImg: '',
      };
      const workInfo = await createWorks(payload);
      navigate(`/editor/${workInfo.id}`);
    } else {
      navigate('/login');
    }
  };
  const menu = (
    <Menu>
      <Menu.Item onClick={() => logout()} key={1}>
        登出
      </Menu.Item>
      <Menu.Item
        onClick={() => window.open('https://github.com/GongJS/editor-react')}
        key={2}
      >
        Github
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="user-profile">
      {!user.isLogin && (
        <Button type="primary" onClick={() => navigate('/login')}>
          登录
        </Button>
      )}
      <div className="user-operation">
        <Button type="primary" shape="round" onClick={createDesign} loading={isLoading}>
          创建设计
        </Button>
        {/* <Button type="primary" shape="round"> */}
        {/*  <Link to="/mywork">我的作品</Link> */}
        {/* </Button> */}
        {user.isLogin && (
          <Dropdown.Button overlay={menu}>
            <Link to="/setting">{user.data.nickName}</Link>
          </Dropdown.Button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
