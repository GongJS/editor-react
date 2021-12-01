import React from 'react';
import { TextComponentType } from '@/defaultTemplates';

const componentMap = {
  h2: (props: React.HTMLAttributes<Element>) => (<h2 {...props} />),
  p: (props: React.HTMLAttributes<Element>) => (<p {...props} />),
  button: (props: React.HTMLAttributes<Element>) => (<button type="button" {...props} />),
};

const PlainComponent: React.FC<TextComponentType> = ({ name, text, styleProps }) => {
  const Tag = componentMap[name as keyof typeof componentMap];
  if (!Tag) throw new Error('该组件不存在');
  return <Tag style={{ ...styleProps }}>{text}</Tag>;
};

export default PlainComponent;
