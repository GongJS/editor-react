import React, { useRef, useEffect } from 'react';
import { Menu } from 'antd';
import { map, pick } from 'lodash-es';
import dataOperation, { operationText } from '@/plugins/dataOperations';
import { clickInsideElement } from '@/helper';
import './style.less';
import useComponentData from '@/hooks/useComponenetData';

const ContextMenu: React.FC = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const componentId = useRef('');
  const { selectComponent } = useComponentData();
  const operations = pick(dataOperation(componentId.current), ['copy', 'paste', 'delete', 'cancel']);
  const actions = map(operations, (val, key) => ({
    key,
    action: val,
  }));
  const triggerContextMenu = (e: MouseEvent) => {
    const domElement = menuRef.current;
    e.preventDefault();
    const wrapperElement = clickInsideElement(e, 'edit-wrapper');
    if (wrapperElement && domElement) {
      domElement.style.display = 'block';
      domElement.style.top = `${e.pageY}px`;
      domElement.style.left = `${e.pageX}px`;
      const cid = wrapperElement.dataset.componentId;
      if (cid) {
        componentId.current = cid;
        selectComponent(cid);
      }
    }
  };
  const handleClick = () => {
    const domElement = menuRef.current;
    if (domElement) {
      domElement.style.display = 'none';
    }
  };
  useEffect(() => {
    document.addEventListener('contextmenu', triggerContextMenu);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('contextmenu', triggerContextMenu);
      document.removeEventListener('click', handleClick);
    };
  });
  return (
    <div className="context-menu-component menu-container" ref={menuRef}>
      <Menu mode="vertical" style={{ width: '220px', border: '1px solid #ccc' }} selectable={false}>
        {
        actions.map((action) => (
          <Menu.Item onClick={() => action.action()} key={action.key}>
            <span className="item-text">{operationText[action.key].text}</span>
            <span className="item-shortcut">{operationText[action.key].shortcut}</span>
          </Menu.Item>
        ))
      }
      </Menu>
    </div>
  );
};

export default ContextMenu;
