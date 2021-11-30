import React, { useMemo } from 'react';
import { pick } from 'lodash-es';
import { textStylePropNames, textDefaultPropsType } from '@/defaultProps';
import './style.less';

interface LTextProps extends React.HTMLAttributes<HTMLDivElement> {
  props: Partial<textDefaultPropsType>
}

const LText: React.FC<LTextProps> = (props) => {
  const styleProps = useMemo(() => pick(props.props, textStylePropNames), [props.props]) as React.CSSProperties;
  return (
    <div className="l-text-component" style={styleProps}>
      {props.props.text}
    </div>
  );
};

export default LText;
