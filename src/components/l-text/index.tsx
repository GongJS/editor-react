import React from 'react';
import { textStylePropNames } from '@/defaultProps';
import useComponentCommon from '@/hooks/useComponentCommon';
import { CreateComponentType } from '@/defaultTemplates';
import './style.less';

interface LTextProps extends CreateComponentType {
  style?: {[p: string]: any}
  className?: string
}
const componentMap = {
  h2: (props: React.HTMLAttributes<Element>) => (<h2 {...props} />),
  p: (props: React.HTMLAttributes<Element>) => (<p {...props} />),
  button: (props: React.HTMLAttributes<Element>) => (<button type="button" {...props} />),
};

const LText: React.FC<LTextProps> = ({ props, style, className }) => {
  const Tag = componentMap[props.tag as keyof typeof componentMap];
  const { styleProps, handleClick } = useComponentCommon(props, textStylePropNames);
  if (!Tag) return <div />;
  return (
    <Tag
      className={className ? `l-text-component ${className}` : 'l-text-component'}
      style={{ ...styleProps, ...style }}
      onClick={handleClick}
    >
      {props.text}
    </Tag>
  );
};

LText.defaultProps = {
  style: {},
  className: '',
};
export default LText;
