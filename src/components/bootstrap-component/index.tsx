import React from 'react';
import LText from '@/components/l-text';

interface componentProps extends React.HTMLAttributes<Element> {
  name: string
  props: object
}

const componentMap = {
  'l-text': LText,
};

const BootstrapComponent: React.FC<componentProps> = (props) => {
  const { name, ...restProps } = props;
  const Tag = componentMap[name as keyof typeof componentMap] as React.ComponentType;
  if (!Tag) throw new Error('该组件不存在');
  return <Tag {...restProps} />;
};

export default BootstrapComponent;
