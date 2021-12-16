import React from 'react';
import { imageStylePropsNames } from '@/defaultProps';
import { CreateComponentType } from '@/defaultTemplates';
import useComponentCommon from '@/hooks/useComponentCommon';
import './style.less';

interface LImageProps extends CreateComponentType {
  style?: {[p: string]: any}
  className?: string
}

const LImage: React.FC<LImageProps> = ({ props, style, className }) => {
  const { styleProps, handleClick } = useComponentCommon(props, imageStylePropsNames);
  const onClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    handleClick();
  };
  return (
    <img
      className={className ? `l-image-component ${className}` : 'l-image-component'}
      style={{ ...styleProps, ...style }}
      onClick={onClick}
      src={props.src}
      alt=""
    />
  );
};

LImage.defaultProps = {
  style: {},
  className: '',
};
export default LImage;