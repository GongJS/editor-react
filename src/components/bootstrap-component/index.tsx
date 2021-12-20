import React from 'react';
import { LImage, LText, LShape } from 'lego-bricks-react';

interface componentProps extends React.HTMLAttributes<Element> {
  name: string
  props: object
}

const componentMap = {
  'l-text': LText,
  'l-image': LImage,
  'l-shape': LShape,
};

const BootstrapComponent: React.FC<componentProps> = (props) => {
  const { name } = props;
  const Tag = componentMap[name as keyof typeof componentMap] as React.ComponentType;
  if (!Tag) throw new Error('该组件不存在');
  return <Tag {...props} />;
};

export default BootstrapComponent;
