import React from 'react';
import {
  Layout, Row, Col, Avatar, Button,
} from 'antd';
import './style.less';

const {
  Header, Footer, Content,
} = Layout;

const TemplateEditor: React.FC = () => (
  <div className="template-detail-container">
    <Layout style={{ background: '#fff' }}>
      <Header className="header">
        <div className="page-title">
          慕课乐高
        </div>
      </Header>
      <Content className="home-layout">
        <div className="work-detail-container">
          <Row justify="center">
            <Col span={8} className="cover-img">
              <img src="https://static.imooc-lego.com/upload-files/screenshot-889755.png" alt="" />
            </Col>
            <Col span={8}>
              <h2>前端架构师直播海报</h2>
              <p>如何突破前端成长瓶颈？</p>
              <div className="author">
                <Avatar>V</Avatar>
                该模版由
                {' '}
                <b>Viking</b>
                {' '}
                创作
              </div>
              <div className="bar-code-area">
                <span>扫一扫，手机预览</span>
                <div />
              </div>
              <div className="use-button">
                <Button
                  type="primary"
                  size="large"
                >
                  使用模版
                </Button>
                <Button
                  size="large"
                >
                  下载图片海报
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer>
        Js © Lego
      </Footer>
    </Layout>
  </div>
);

export default TemplateEditor;
