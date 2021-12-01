import React from 'react';
import { TextComponentType } from '@/defaultTemplates';
import PlainComponent from '@/components/plain-component';
import './style.less';

interface ComponentsListProps {
  list: TextComponentType[]
  onItemClick(item: TextComponentType): void
}

const ComponentsList: React.FC<ComponentsListProps> = ({ list, onItemClick }) => (
  <div className="create-component-list">
    {
          list.map((component, index) => (
            <div key={index} onClick={() => onItemClick(component)}>
              <PlainComponent name={component.name} text={component.text} styleProps={component.styleProps} />
            </div>
          ))
      }
  </div>
);

export default ComponentsList;
