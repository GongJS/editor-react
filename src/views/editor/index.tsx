import React from 'react';
import { Layout, Tabs, Empty } from 'antd';
import { useRecoilValue } from 'recoil';
import editorData, { getCurrentElement } from '@/store/editor';
import BootstrapComponent from '@/components/bootstrap-component';
import ComponentsList from '@/components/components-list';
import EditorWrapper from '@/components/editor-wrapper';
import PropsTable from '@/components/props-table';
import LayerList from '@/components/layer-list';
import EditGroup from '@/components/edit-group';
import './style.less';

const {
  Header, Content, Sider,
} = Layout;
const { TabPane } = Tabs;

const Editor: React.FC = () => {
  const editor = useRecoilValue(editorData);
  const currentElement = useRecoilValue(getCurrentElement);
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
        <Sider width="300" style={{ background: '#fff' }}>
          <div className="sidebar-container">
            <ComponentsList />
          </div>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content className="preview-container">
            <p>画布区域</p>
            <div className="preview-list" id="canvas-area">
              <div className="body-container" style={{ ...editor.pageData }}>
                {
                  editor.components.map((component) => (
                    <EditorWrapper
                      key={component.id}
                      id={component.id}
                      active={currentElement?.id === component.id}
                      hidden={component.isHidden}
                    >
                      <BootstrapComponent
                        {...component}
                      />
                    </EditorWrapper>
                  ))
                }
              </div>
            </div>
          </Content>
        </Layout>
        <Sider width="300" style={{ background: 'white' }} className="settings-panel">
          <Tabs defaultActiveKey="1">
            <TabPane tab="属性设置" key="1">
              {
                currentElement && !currentElement.isLocked ? <EditGroup props={currentElement.props} /> : (
                  <Empty
                    description={<p>该元素被锁定，无法编辑</p>}
                  />
                )
              }
            </TabPane>
            <TabPane tab="图层设置" key="2">
              <LayerList list={editor.components} selectedId={currentElement && currentElement.id} />
            </TabPane>
            <TabPane tab="页面设置设置" key="3">
              <PropsTable props={editor.pageData} type="page" />
            </TabPane>
          </Tabs>
        </Sider>
      </Layout>
    </div>
  );
};

export default Editor;
