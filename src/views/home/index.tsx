import React from 'react';
import { Layout } from 'antd';
import TemplateList from '@/components/templateList';
import './style.less';

const {
  Header, Footer, Content,
} = Layout;

const testData = [
  { id: 1, coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-889755.png', title: '前端架构师直播海报' },
  { id: 2, coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-677311.png', title: '前端架构师直播海报' },
  { id: 3, coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-682056.png', title: '前端架构师直播海报' },
  { id: 4, coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-677311.png', title: '前端架构师直播海报' },
];

const Home: React.FC = () => (
  <div className="homepage-container">
    <Layout style={{ background: '#fff' }}>
      <Header className="header">
        <div className="page-title">
          乐高
        </div>
      </Header>
      <Content className="home-layout">
        <div className="content-container">
          <TemplateList list={testData} />
        </div>
      </Content>
      <Footer>
        JS © Lego
      </Footer>
    </Layout>
  </div>
);

export default Home;
