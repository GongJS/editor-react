import React from 'react';
import { textStylePropNames, TextComponentProps } from '@/defaultProps';
import useComponentCommon from '@/hooks/useComponentCommon';
import './style.less';

interface LTextProps extends React.HTMLAttributes<HTMLDivElement> {
  props: Partial<TextComponentProps>
}

const LText: React.FC<LTextProps> = (props) => {
  const { styleProps, handleClick } = useComponentCommon(props.props, textStylePropNames);
  return (
    <div className="l-text-component" style={styleProps} onClick={handleClick}>
      {props.props?.text}
    </div>
  );
};

export default LText;
