import React, { ReactNode, useEffect } from 'react';
import useComponentData from '@/hooks/useComponenetData';
import './style.less';

interface EditorWrapperProps {
  id: string
  active: boolean
  hidden?: boolean
  children: ReactNode
}
const EditorWrapper: React.FC<EditorWrapperProps> = ({
  id, hidden, active, children,
}) => {
  const { selectComponent } = useComponentData();
  useEffect(() => {
  }, [hidden]);
  return (
    <div
      onClick={() => selectComponent(id)}
      className={['editor-wrapper', active ? 'active' : null, hidden ? 'hidden' : null].join(' ')}
    >
      { children }
    </div>
  );
};

EditorWrapper.defaultProps = {
  hidden: false,
};

export default EditorWrapper;
