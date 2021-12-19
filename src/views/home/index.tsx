import React from 'react';
import { Layout } from 'antd';
import {
  useRecoilValue,
} from 'recoil';
import { Link } from 'react-router-dom';
import Store from '@/store';

import TemplateList from '@/components/template-list';
import UserProfile from '@/components/user-profile';

import './style.less';
import logo from '@/assets/logo-simple.png';
import userData from '@/store/user';

const {
  Header, Footer, Content,
} = Layout;

const Home: React.FC = () => {
  const store = useRecoilValue(Store);
  const user = useRecoilValue(userData);
  return (
    <div className="homepage-container">
      <Layout style={{ background: '#fff' }}>
        <Header className="header">
          <div className="page-title">
            <Link to="/">
              <img alt="logo" src={logo} className="logo-img" />
            </Link>
            乐高
          </div>
          <UserProfile />
        </Header>
        <Content className="home-layout">
          <div className="content-container">
            <div className="hot-title">
              <h2 className="hot-template">热门海报</h2>
              <p>只需替换文字和图片，一键自动生成H5</p>
            </div>
            <TemplateList list={store.templates} />
          </div>
          {
            user.isLogin && (
            <div className="my-works">
              <div className="content-title">
                <h2>我的作品</h2>
                <Link to="/mywork">查看我的所有作品</Link>
              </div>
              <TemplateList list={store.templates} />
            </div>
            )
          }
        </Content>
        <Footer>
          JS © Lego
        </Footer>
      </Layout>
    </div>
  );
};

export default Home;
