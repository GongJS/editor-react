import React from 'react';
import { shapeStylePropsNames } from '@/defaultProps';
import { CreateComponentType } from '@/defaultTemplates';
import useComponentCommon from '@/hooks/useComponentCommon';
import './style.less';

interface LShapeProps extends CreateComponentType {
  style?: {[p: string]: any}
  className?: string
}

const LShape: React.FC<LShapeProps> = ({ props, style, className }) => {
  const { styleProps, handleClick } = useComponentCommon(props, shapeStylePropsNames);
  const onClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    handleClick();
  };
  return (
    <img
      className={className ? `l-shape-component ${className}` : 'l-shape-component'}
      style={{ ...styleProps, ...style }}
      onClick={onClick}
      src={props.src}
      alt=""
    />
  );
};

LShape.defaultProps = {
  style: {},
  className: '',
};
export default LShape;
