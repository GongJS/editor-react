import React, { ReactNode, useEffect, useRef, useMemo } from 'react';
import { pick } from 'lodash-es';
import useComponentData from '@/hooks/useComponenetData';
import useDebounce from '@/hooks/useDebounce';
import { ImageComponentProps, TextComponentProps } from '@/defaultProps';
import useInitHotKeys from '@/plugins/useInitHotKeys';
import './style.less';

interface EditorWrapperProps {
  id: string;
  active: boolean;
  hidden?: boolean;
  children: ReactNode;
  props: Partial<TextComponentProps> & Partial<ImageComponentProps>;
}
type ResizeDirection = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
interface OriginalPositions {
  left: number;
  right: number;
  top: number;
  bottom: number;
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
  useInitHotKeys();
  const editWrapper = useRef<null | HTMLDivElement>(null);
  const moveWrapper = useRef<null | HTMLDivElement>(null);
  const { updateComponent } = useComponentData();
  const updateComponentSize = useDebounce(updateComponent, 1);
  const style = useMemo(
    () => pick(props, ['position', 'top', 'left', 'width', 'height']),
    [props],
  );
  const { selectComponent } = useComponentData();
  const caculateMovePosition = (e: MouseEvent) => {
    const container = document.getElementById('canvas-area') as HTMLElement;
    const left = e.clientX - gap.x - container.offsetLeft;
    const top = e.clientY - gap.y - container.offsetTop + container.scrollTop;
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
  const caculateSize = (
    direction: ResizeDirection,
    e: MouseEvent,
    positions: OriginalPositions,
  ) => {
    const { clientX, clientY } = e;
    const { left, right, top, bottom } = positions;
    const container = document.getElementById('canvas-area') as HTMLElement;
    const rightWidth = clientX - left;
    const leftWidth = right - clientX;
    const bottomHeight = clientY - top;
    const topHeight = bottom - clientY;
    const topOffset = clientY - container.offsetTop + container.scrollTop;
    const leftOffset = clientX - container.offsetLeft;
    switch (direction) {
      case 'top-left':
        return {
          width: leftWidth,
          height: topHeight,
          top: topOffset,
          left: leftOffset,
        };
      case 'top-right':
        return {
          width: rightWidth,
          height: topHeight,
          top: topOffset,
        };
      case 'bottom-left':
        return {
          width: leftWidth,
          height: bottomHeight,
          left: leftOffset,
        };
      case 'bottom-right':
        return {
          width: rightWidth,
          height: bottomHeight,
        };
      default:
        break;
    }
  };
  const startResize = (
    e: React.MouseEvent<HTMLDivElement>,
    currentId: string,
    direction: ResizeDirection,
  ) => {
    e.stopPropagation();
    selectComponent(currentId);
    const currentElement = editWrapper.current;
    const moveElement = moveWrapper.current;
    const resizeElements = [currentElement, moveElement];
    if (currentElement && moveElement) {
      const { left, right, top, bottom } = currentElement.getBoundingClientRect();
      const handleMove = (event: MouseEvent) => {
        const size = caculateSize(direction, event, {
          left,
          right,
          top,
          bottom,
        });
        updateComponentSize({ ...size });
        resizeElements.forEach((element) => {
          const { style } = element!;
          if (size) {
            if (size.left) {
              style.left = `${size.left}px`;
            }
            if (size.top) {
              style.top = `${size.top}px`;
            }
            style.width = `${size.width}px`;
            style.height = `${size.height}px`;
          }
        });
      };
      const handleMouseUp = (event: MouseEvent) => {
        document.removeEventListener('mousemove', handleMove);
        setTimeout(() => {
          document.removeEventListener('mouseup', handleMouseUp);
        });
      };
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };
  useEffect(() => {}, [hidden]);
  return (
    <div
      ref={editWrapper}
      data-component-id={id}
      onClick={() => selectComponent(id)}
      style={style as React.CSSProperties}
      className={['edit-wrapper', active ? 'active' : null, hidden ? 'hidden' : null]
        .filter((item) => !!item)
        .join(' ')}
    >
      <div
        className="move-wrapper"
        ref={moveWrapper}
        onMouseDown={(e) => startMove(e, id)}
      >
        {children}
      </div>
      <div className="resizers">
        <div
          className="resizer top-left"
          onMouseDown={(e) => startResize(e, id, 'top-left')}
        />
        <div
          className="resizer top-right"
          onMouseDown={(e) => startResize(e, id, 'top-right')}
        />
        <div
          className="resizer bottom-left"
          onMouseDown={(e) => startResize(e, id, 'bottom-left')}
        />
        <div
          className="resizer bottom-right"
          onMouseDown={(e) => startResize(e, id, 'bottom-right')}
        />
      </div>
    </div>
  );
};

EditorWrapper.defaultProps = {
  hidden: false,
};

export default EditorWrapper;
