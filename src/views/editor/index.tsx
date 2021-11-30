import React from 'react';
import { Layout } from 'antd';
import { useRecoilValue } from 'recoil';
import editorData from '@/store/editor';
import './style.less';

const {
  Header, Content, Sider,
} = Layout;

const Editor: React.FC = () => {
  const { components } = useRecoilValue(editorData);
  return (
    <div className="editor" id="editor-layout-main">
      <Layout style={{ background: '#fff' }}>
        <Header className="header">
          <div className="page-title" style={{ color: '#fff' }}>
            乐高
          </div>
        </Header>
      </Layout>
      <Layout>
        <Sider width="300" style={{ background: 'yellow' }}>
          <div className="sidebar-container">
            组件列表
          </div>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content className="preview-container">
            <p>画布区域</p>
            <div className="preview-list" id="canvas-area">
              {
              components.map((component) => (
                component.props.text
              ))
            }
            </div>
          </Content>
        </Layout>
        <Sider width="300" style={{ background: 'purple' }} className="settings-panel">
          组件属性
        </Sider>
      </Layout>
    </div>
  );
};

export default Editor;
