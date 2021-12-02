import React, { useCallback } from 'react';
import { Layout } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import editorData, { ComponentData, getCurrentElement } from '@/store/editor';
import BootstrapComponent from '@/components/bootstrap-component';
import ComponentsList from '@/components/components-list';
import EditorWrapper from '@/components/editor-wrapper';
import PropsTable from '@/components/props-table';
import { textList, TextComponentType } from '@/defaultTemplates';
import './style.less';

const {
  Header, Content, Sider,
} = Layout;

const Editor: React.FC = () => {
  const [editor, setEditor] = useRecoilState(editorData);
  const currentElement = useRecoilValue(getCurrentElement);
  const addItem = useCallback(({ text, styleProps } :TextComponentType): void => {
    const newComponent: ComponentData = {
      id: uuidv4(),
      name: 'l-text',
      props: {
        text,
        ...styleProps,
      },
    };
    const newComponents = [...editor.components, newComponent];
    setEditor((oldEditor) => ({
      ...oldEditor,
      components: newComponents,
    }));
  }, [editor.components]);
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
            <ComponentsList list={textList} onItemClick={addItem} />
          </div>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content className="preview-container">
            <p>画布区域</p>
            <div className="preview-list" id="canvas-area">
              {
              editor.components.map((component) => (
                <EditorWrapper
                  key={component.id}
                  id={component.id}
                  active={currentElement?.id === component.id}
                >
                  <BootstrapComponent
                    name={component.name}
                    props={component.props}
                  />
                </EditorWrapper>
              ))
            }
            </div>
          </Content>
        </Layout>
        <Sider width="300" style={{ background: 'purple' }} className="settings-panel">
          组件属性
          {
            currentElement && <PropsTable props={currentElement.props} />
          }
        </Sider>
      </Layout>
    </div>
  );
};

export default Editor;
