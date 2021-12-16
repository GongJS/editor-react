import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BuildOutlined, FieldStringOutlined, FileImageOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import StyledUploader from '@/components/styled-uploader';
import {
  textList, CreateComponentType, imageList, shapeList,
} from '@/defaultTemplates';
import { ComponentData } from '@/store/editor';
import { getImageDimensions } from '@/helper';
import { commonDefaultProps } from '@/defaultProps';
import { UploadResp } from '@/extraType';
import useComponentData from '@/hooks/useComponenetData';
import LText from '@/components/l-text';
import LImage from '@/components/l-image';
import LShape from '@/components/l-shape';
import './style.less';

const { TabPane } = Tabs;
const ComponentsList: React.FC = () => {
  const { addComponent } = useComponentData();
  const addTextComponent = (component: CreateComponentType) => {
    const newComponent: ComponentData = {
      id: uuidv4(),
      name: component.name,
      props: {
        ...component.props,
      },
    };
    addComponent(newComponent);
  };
  const addShapeComponent = (component: CreateComponentType) => {
    const newComponent: ComponentData = {
      id: uuidv4(),
      name: component.name,
      props: {
        ...component.props,
      },
    };
    addComponent(newComponent);
  };
  const addImageComponent = (data : UploadResp) => {
    const src = data.data.urls[0];
    const styleProps = { ...commonDefaultProps };
    getImageDimensions(src).then(({ width }) => {
      const maxWidth = 373;
      styleProps.width = `${(width > maxWidth) ? maxWidth : width}px`;
      const newComponent: ComponentData = {
        id: uuidv4(),
        name: 'l-image',
        props: {
          src,
          ...commonDefaultProps,
        },
      };
      addComponent(newComponent);
    });
  };
  const generateResetCss = (name: string) => ({
    position: 'static',
    ...((name !== 'l-shape') && { height: '' }),
  });
  return (
    <div className="create-component-list">
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={(
            <span>
              <FieldStringOutlined />
              文字
            </span>
          )}
          key="1"
        >
          {
            textList.map((component, index) => (
              <div className="component-item" key={index}>
                <div className="component-wrapper" onClick={() => addTextComponent(component)}>
                  <LText {...component} style={generateResetCss('l-text')} className="inside-component" />
                </div>
              </div>
            ))
          }
        </TabPane>
        <TabPane
          tab={(
            <span>
              <FileImageOutlined />
              图片
            </span>
          )}
          key="2"
        >
          <StyledUploader onSuccess={addImageComponent} />
          <div className="image-list">
            {
              imageList.map((component, index) => (
                <div key={index} onClick={() => addTextComponent(component)} className="component-item item-image">
                  <div className="component-wrapper">
                    <LImage {...component} style={generateResetCss('l-image')} className="inside-component" />
                  </div>
                </div>
              ))
            }
          </div>
        </TabPane>
        <TabPane
          tab={(
            <span>
              <BuildOutlined />
              图形
            </span>
          )}
          key="3"
        >
          {
            shapeList.map((component, index) => (
              <div key={index} onClick={() => addShapeComponent(component)} className="component-item item-image">
                <div className="component-wrapper">
                  <LShape {...component} style={generateResetCss('l-shape')} className="inside-component" />
                </div>
              </div>
            ))
          }
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ComponentsList;
