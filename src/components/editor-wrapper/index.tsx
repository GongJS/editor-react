import React, {
  ReactNode, useEffect, useRef, useMemo,
} from 'react';
import { pick } from 'lodash-es';
import useComponentData from '@/hooks/useComponenetData';
import { ImageComponentProps, TextComponentProps } from '@/defaultProps';
import './style.less';

interface EditorWrapperProps {
  id: string
  active: boolean
  hidden?: boolean
  children: ReactNode
  props: Partial<TextComponentProps> & Partial<ImageComponentProps>;
}
const EditorWrapper: React.FC<EditorWrapperProps> = ({
  id,
  props,
  hidden,
  active,
  children,
}) => {
  const gap = { x: 0, y: 0 };
  let isMoving = false;
  const editWrapper = useRef<null | HTMLDivElement>(null);
  const { updateComponent } = useComponentData();
  const style = useMemo(() => pick(props, ['position', 'top', 'left', 'width', 'height']), [props]);
  const { selectComponent } = useComponentData();
  const caculateMovePosition = (e: MouseEvent) => {
    const container = document.getElementById('canvas-area') as HTMLElement;
    const left = e.clientX - gap.x - container.offsetLeft;
    const top = e.clientY - gap.y - container.offsetTop;
    return {
      left,
      top,
    };
  };
  const startMove = (e: React.MouseEvent<HTMLDivElement>, currentId: string) => {
    selectComponent(currentId);
    const currentElement = editWrapper.current;
    if (currentElement) {
      const { left, top } = currentElement.getBoundingClientRect();
      gap.x = e.clientX - left;
      gap.y = e.clientY - top;
    }
    const handleMove = (moveEvent: MouseEvent) => {
      const { left, top } = caculateMovePosition(moveEvent);
      isMoving = true;
      if (currentElement) {
        currentElement.style.top = `${top}px`;
        currentElement.style.left = `${left}px`;
      }
    };
    const handleMouseUp = (mouseUpEvent: MouseEvent) => {
      document.removeEventListener('mousemove', handleMove);
      if (isMoving) {
        const { left, top } = caculateMovePosition(mouseUpEvent);
        updateComponent({ left, top });
        isMoving = false;
      }
      setTimeout(() => {
        document.removeEventListener('mouseup', handleMouseUp);
      });
    };
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
  }, [hidden]);
  return (
    <div
      ref={editWrapper}
      onClick={() => selectComponent(id)}
      onMouseDown={(e) => startMove(e, id)}
      style={style as React.CSSProperties}
      className={['edit-wrapper', active ? 'active' : null, hidden ? 'hidden' : null].filter((item) => !!item).join(' ')}
    >
      { children }
    </div>
  );
};

EditorWrapper.defaultProps = {
  hidden: false,
};

export default EditorWrapper;
