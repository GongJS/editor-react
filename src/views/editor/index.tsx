import React, { useEffect } from 'react';
import {
  Layout, Tabs, Empty, Button, Dropdown, Menu, Spin,
} from 'antd';
import { useRecoilValue } from 'recoil';
import { Link, useParams } from 'react-router-dom';
import componentData, { getCurrentElement, pageData } from '@/store/editor';
import userData from '@/store/user';
import useUser from '@/hooks/useUser';
import useComponentData from '@/hooks/useComponenetData';
import useWork from '@/hooks/useWork';
import { useFetchWorkById } from '@/utils/works';
import BootstrapComponent from '@/components/bootstrap-component';
import ComponentsList from '@/components/components-list';
import EditorWrapper from '@/components/editor-wrapper';
import PropsTable from '@/components/props-table';
import LayerList from '@/components/layer-list';
import EditGroup from '@/components/edit-group';
import ContextMenu from '@/components/context-menu';
import { AllComponentProps } from '@/defaultProps';
import logo from '@/assets/logo-simple.png';
import HistoryArea from './history-area';
import './style.less';

const {
  Header, Content, Sider,
} = Layout;
const { TabPane } = Tabs;

const Editor: React.FC = () => {
  const editor = useRecoilValue(componentData);
  const page = useRecoilValue(pageData);
  const currentElement = useRecoilValue(getCurrentElement);
  const user = useRecoilValue(userData);
  const { getWork } = useWork();
  const { logout } = useUser();
  const { cancelComponent } = useComponentData();
  const { workId } = useParams();
  const { data, isLoading } = useFetchWorkById(workId);
  useEffect(() => {
    if (data?.errno === 0) {
      getWork(data.data);
    }
  }, [data]);
  const clearSelection = (e: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = e.target as HTMLElement;
    if (currentTarget.classList.contains('preview-container')) {
      cancelComponent();
    }
  };
  const menu = (
    <Menu>
      <Menu.Item onClick={() => logout()}>
        <Link to="/mywork">我的作品</Link>
      </Menu.Item>
      <Menu.Item onClick={() => logout()}>
        登出
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="editor" id="editor-layout-main">
      <ContextMenu />
      <Layout style={{ background: '#fff' }}>
        <Header className="header">
          <div className="page-title" style={{ color: '#fff' }}>
            <Link to="/">
              <img alt="logo" src={logo} className="logo-img" />
            </Link>
            乐高
          </div>
          <div className="user-operation">
            <Button type="primary" shape="round">
              预览和设置
            </Button>
            <Button type="primary" shape="round">
              保存
            </Button>
            <Button type="primary" shape="round">
              发布
            </Button>
            <Dropdown.Button overlay={menu}>
              {user.data.nickName}
            </Dropdown.Button>
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
          {
            isLoading ? <Spin /> : (
              <Content className="preview-container" onMouseDown={clearSelection}>
                <p>画布区域</p>
                <HistoryArea />
                <div className="preview-list" id="canvas-area">
                  <div className="body-container" style={{ ...page.props }}>
                    {
                    editor.components.map((component) => (
                      <EditorWrapper
                        key={component.id}
                        id={component.id}
                        active={currentElement?.id === component.id}
                        hidden={component.isHidden}
                        props={component.props}
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
            )
          }
        </Layout>
        <Sider width="300" style={{ background: 'white' }} className="settings-panel">
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="属性设置" key="1">
              {
                currentElement?.id && !currentElement.isLocked ? <EditGroup props={currentElement.props as AllComponentProps} /> : (
                  <Empty
                    description={<p>该元素被锁定，无法编辑</p>}
                  />
                )
              }
            </TabPane>
            <TabPane tab="图层设置" key="2">
              <LayerList list={editor.components} selectedId={currentElement && currentElement.id} />
            </TabPane>
            <TabPane tab="页面设置" key="3">
              <PropsTable props={page.props} type="page" />
            </TabPane>
          </Tabs>
        </Sider>
      </Layout>
    </div>
  );
};

export default Editor;
