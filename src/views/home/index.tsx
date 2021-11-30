import React from 'react';
import { Layout } from 'antd';
import {
  useRecoilValue,
} from 'recoil';
import Store from '@/store';
import TemplateList from '@/components/template-list';
import UserProfile from '@/components/user-profile';
import './style.less';

const {
  Header, Footer, Content,
} = Layout;

const Home: React.FC = () => {
  const store = useRecoilValue(Store);
  return (
    <div className="homepage-container">
      <Layout style={{ background: '#fff' }}>
        <Header className="header">
          <div className="page-title">
            乐高
          </div>
          <UserProfile user={store.user} />
        </Header>
        <Content className="home-layout">
          <div className="content-container">
            <TemplateList list={store.templates} />
          </div>
        </Content>
        <Footer>
          JS © Lego
        </Footer>
      </Layout>
    </div>
  );
};

export default Home;
