import React, {
  useEffect, useMemo, useState, useRef,
} from 'react';
import {
  Layout, Tabs, Empty, Button, Dropdown, Menu, Spin, Drawer,
} from 'antd';
import { useRecoilValue } from 'recoil';
import { Link, useParams } from 'react-router-dom';
import componentData, { getCurrentElement, pageData } from '@/store/editor';
import userData from '@/store/user';
import useUser from '@/hooks/useUser';
import usePageData from '@/hooks/usePageData';
import useComponentData from '@/hooks/useComponenetData';
import useWork from '@/hooks/useWork';
import { useFetchWorkById, useFetchSaveWork } from '@/utils/works';
import BootstrapComponent from '@/components/bootstrap-component';
import ComponentsList from '@/components/components-list';
import EditorWrapper from '@/components/editor-wrapper';
import PropsTable from '@/components/props-table';
import LayerList from '@/components/layer-list';
import EditGroup from '@/components/edit-group';
import ContextMenu from '@/components/context-menu';
import PublishFormProps from '@/components/publish-form';
import { AllComponentProps } from '@/defaultProps';
import { baseH5URL } from '@/hooks/useHttp';
import { takeScreenshotAndUpload } from '@/helper';
import logo from '@/assets/logo-simple.png';
import HistoryArea from './history-area';
import './style.less';

const {
  Header, Content, Sider,
} = Layout;
const { TabPane } = Tabs;

const Editor: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [canvasFix, setCanvasFix] = useState(false);
  const editor = useRecoilValue(componentData);
  const page = useRecoilValue(pageData);
  const coverImg = useRef(page.coverImg);
  const currentElement = useRecoilValue(getCurrentElement);
  const user = useRecoilValue(userData);
  const { getWork } = useWork();
  const { logout } = useUser();
  const { updatePageNormalData } = usePageData();
  const { cancelComponent } = useComponentData();
  const { workId } = useParams();
  const { data, isLoading } = useFetchWorkById(workId);
  const { mutateAsync: fetchSaveWork, isLoading: isSaving } = useFetchSaveWork(workId);
  const previewURL = useMemo(() => `${baseH5URL}/p/preview/${page.id}-${page.uuid}`, [page.id, page.uuid]);
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
  const saveWork = async () => {
    const payload = {
      content: {
        components: editor.components,
        props: page.props,
        setting: page.setting,
      },
      coverImg: coverImg.current,
      desc: page.desc,
      title: page.title,
    };
    const res = await fetchSaveWork(payload);
    return res;
  };
  const previewWork = async (drawerVisible = true) => {
    const res = await saveWork();
    if (res.errno === 0) {
      setIsDrawerVisible(drawerVisible);
      setIsPreviewVisible(true);
    }
  };
  const closePreview = () => {
    setIsDrawerVisible(false);
    setIsPreviewVisible(false);
  };
  const takeScreenUpdate = async (checkSave = false) => new Promise((resolve, reject): void => {
    setTimeout(async () => {
      try {
        const rawData = await takeScreenshotAndUpload('canvas-area');
        if (rawData) {
          const url = rawData.data.urls[0];
          updatePageNormalData('coverImg', url);
          coverImg.current = url;
        }
        resolve(null);
      } catch (e) {
        console.error(e);
        reject(e);
      } finally {
        setCanvasFix(false);
        if (checkSave) {
          saveWork();
        }
      }
    });
  });
  const checkAndpublish = async () => {
    setIsPublishing(true);
    try {
      setCanvasFix(true);
      await takeScreenUpdate();
      await saveWork();
    } catch (e) {
      console.error(e);
    } finally {
      setIsPublishing(false);
      closePreview();
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
      <Drawer title="设置面板" placement="right" onClose={closePreview} visible={isDrawerVisible}>
        <PublishFormProps
          closePreview={closePreview}
          saveWork={previewWork}
          checkAndpublish={checkAndpublish}
          isSaving={isSaving}
          previewURL={previewURL}
          isPublishing={isPublishing}
        />
      </Drawer>
      {
        isPreviewVisible && (
        <div className="final-preview">
          <div className="final-preview-inner">
            <div className="preview-title">
              {page.title}
            </div>
            <div className="iframe-container">
              <iframe
                src={previewURL}
                width="375"
                className="iframe-placeholder"
                height={page.props.height ? parseInt(page.props.height, 10) + 5 : '560'}
                frameBorder="0"
              />
            </div>
          </div>
        </div>
        )
      }
      <Layout style={{ background: '#fff' }}>
        <Header className="header">
          <div className="page-title" style={{ color: '#fff' }}>
            <Link to="/">
              <img alt="logo" src={logo} className="logo-img" />
            </Link>
            乐高
          </div>
          <div className="user-operation">
            <Button type="primary" shape="round" onClick={() => previewWork()}>
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
                <div className={['preview-list', canvasFix ? 'canvas-fix' : null].filter((item) => !!item).join(' ')} id="canvas-area">
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
