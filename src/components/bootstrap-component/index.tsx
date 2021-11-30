import { Button, Switch, Input } from 'antd';
import React from 'react';
import LText from '@/components/l-text';

interface componentProps extends React.HTMLAttributes<Element> {
  name: string;
  children: React.ReactNode
  props: object
}

const componentMap = {
  button: Button,
  switch: Switch,
  input: Input,
  'l-text': LText,
};

const BootstrapComponent: React.FC<componentProps> = (props) => {
  const { name, children, ...restProps } = props;
  const Tag = componentMap[name as keyof typeof componentMap] as React.ComponentType;
  if (!Tag) throw new Error('该组件不存在');
  return <Tag {...restProps}>{children}</Tag>;
};

export default BootstrapComponent;
