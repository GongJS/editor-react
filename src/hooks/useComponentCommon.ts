import React, { useMemo } from 'react';
import { pick } from 'lodash-es';
import { TextComponentProps } from '@/defaultProps';

const useComponentCommon = (props: Readonly<Partial<TextComponentProps>>, picks: string[]) => {
  const styleProps = useMemo(() => pick(props, picks), [props]) as React.CSSProperties;
  const handleClick = () => {
    if (props.actionType === 'url' && props.url) {
      window.location.href = props.url;
    }
  };
  return {
    styleProps,
    handleClick,
  };
};

export default useComponentCommon;
