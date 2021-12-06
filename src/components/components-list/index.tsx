import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import StyledUploader from '@/components/styled-uploader';
import { TextComponentType } from '@/defaultTemplates';
import PlainComponent from '@/components/plain-component';
import { ComponentData } from '@/store/editor';
import { getImageDimensions } from '@/helper';
import { commonDefaultProps } from '@/defaultProps';
import { UploadResp } from '@/extraType';
import useComponentData from '@/hooks/useComponenetData';
import './style.less';

interface ComponentsListProps {
  list: TextComponentType[]
}

const ComponentsList: React.FC<ComponentsListProps> = ({ list }) => {
  const { addComponent } = useComponentData();
  const addTextComponent = (component: TextComponentType) => {
    const newComponent: ComponentData = {
      id: uuidv4(),
      name: 'l-text',
      props: {
        text: component.text,
        ...component.styleProps,
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
  return (
    <div className="create-component-list">
      {
          list.map((component, index) => (
            <div key={index} onClick={() => addTextComponent(component)}>
              <PlainComponent name={component.name} text={component.text} styleProps={component.styleProps} />
            </div>
          ))
      }
      <StyledUploader onSuccess={addImageComponent} />
    </div>
  );
};

export default ComponentsList;
