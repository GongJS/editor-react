import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import StyledUploader from '@/components/styled-uploader';
import { ImageComponentType, TextComponentType } from '@/defaultTemplates';
import PlainComponent from '@/components/plain-component';
import { ComponentData } from '@/store/editor';
import { getImageDimensions } from '@/helper';
import useAddComponentData from '@/hooks/useAddComponentData';
import './style.less';

interface ComponentsListProps {
  list: TextComponentType[]
}

const ComponentsList: React.FC<ComponentsListProps> = ({ list }) => {
  const { addComponentData } = useAddComponentData();
  const addTextComponent = (component: TextComponentType) => {
    const newComponent: ComponentData = {
      id: uuidv4(),
      name: 'l-text',
      props: {
        text: component.text,
        ...component.styleProps,
      },
    };
    addComponentData(newComponent);
  };
  const addImageComponent = (data : ImageComponentType) => {
    const { imgSrc, styleProps, name } = data;
    getImageDimensions(imgSrc).then(({ width }) => {
      const maxWidth = 373;
      styleProps.width = `${(width > maxWidth) ? maxWidth : width}px`;
      const newComponent: ComponentData = {
        id: uuidv4(),
        name,
        props: {
          imgSrc,
          ...styleProps,
        },
      };
      addComponentData(newComponent);
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
      <StyledUploader onItemClick={addImageComponent} />
    </div>
  );
};

export default ComponentsList;
