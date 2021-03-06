import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BuildOutlined, FieldStringOutlined, FileImageOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { LImage, LText, LShape } from 'lego-bricks-react';
import StyledUploader from '@/components/styled-uploader';
import { textList, CreateComponentType, imageList, shapeList } from '@/defaultData';
import { ComponentDataProps } from '@/store/editor';
import { getImageDimensions } from '@/helper';
import { commonComponentDefaultData } from '@/defaultProps';
import { UploadResp } from '@/extraType';
import useComponentData from '@/hooks/useComponenetData';
import './style.less';

const { TabPane } = Tabs;
const ComponentsList: React.FC = () => {
  const { addComponent } = useComponentData();
  const addTextComponent = (component: CreateComponentType) => {
    const newComponent: ComponentDataProps = {
      id: uuidv4(),
      name: component.name,
      props: {
        ...component.props,
      },
    };
    addComponent(newComponent);
  };
  const addShapeComponent = (component: CreateComponentType) => {
    const newComponent: ComponentDataProps = {
      id: uuidv4(),
      name: component.name,
      props: {
        ...component.props,
      },
    };
    addComponent(newComponent);
  };
  const addImageComponent = (data: UploadResp) => {
    const src = data.data.urls[0];
    const styleProps = { ...commonComponentDefaultData };
    getImageDimensions(src).then(({ width }) => {
      const maxWidth = 373;
      styleProps.width = `${width > maxWidth ? maxWidth : width}px`;
      const newComponent: ComponentDataProps = {
        id: uuidv4(),
        name: 'l-image',
        props: {
          src,
          ...commonComponentDefaultData,
        },
      };
      addComponent(newComponent);
    });
  };
  const generateResetCss = (name: string) => ({
    position: 'static',
    ...(name !== 'l-shape' && { height: '' }),
  });
  return (
    <div className="create-component-list">
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <FieldStringOutlined />
              ??????
            </span>
          }
          key="1"
        >
          {textList.map((component, index) => (
            <div className="component-item" key={index}>
              <div
                className="component-wrapper"
                onClick={() => addTextComponent(component)}
              >
                <LText
                  {...component}
                  style={generateResetCss('l-text')}
                  className="inside-component"
                />
              </div>
            </div>
          ))}
        </TabPane>
        <TabPane
          tab={
            <span>
              <FileImageOutlined />
              ??????
            </span>
          }
          key="2"
        >
          <StyledUploader onSuccess={addImageComponent} />
          <div className="image-list">
            {imageList.map((component, index) => (
              <div
                key={index}
                onClick={() => addTextComponent(component)}
                className="component-item item-image"
              >
                <div className="component-wrapper">
                  <LImage
                    {...component}
                    style={generateResetCss('l-image')}
                    className="inside-component"
                  />
                </div>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <BuildOutlined />
              ??????
            </span>
          }
          key="3"
        >
          {shapeList.map((component, index) => (
            <div
              key={index}
              onClick={() => addShapeComponent(component)}
              className="component-item item-image"
            >
              <div className="component-wrapper">
                <LShape
                  {...component}
                  style={generateResetCss('l-shape')}
                  className="inside-component"
                />
              </div>
            </div>
          ))}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ComponentsList;
