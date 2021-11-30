import React, { useMemo } from 'react';
import { pick } from 'lodash-es';

const useComponentCommon = <T extends { [key: string]: any }>(props: T, picks: string[]) => {
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
