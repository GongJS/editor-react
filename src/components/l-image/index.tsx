import React from 'react';
import { imageStylePropsNames, ImageComponentProps } from '@/defaultProps';
import useComponentCommon from '@/hooks/useComponentCommon';
import './style.less';

interface LImageProps extends React.HTMLAttributes<HTMLImageElement> {
  props: Partial<ImageComponentProps>
}

const LImage: React.FC<LImageProps> = (props) => {
  const { styleProps, handleClick } = useComponentCommon(props.props, imageStylePropsNames);
  const onClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    handleClick();
  };
  return (
    <img className="l-image-component" style={styleProps} onClick={onClick} src={props.props.src} alt="" />
  );
};

export default LImage;
