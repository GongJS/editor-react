import React, { useState } from 'react';
import { Tooltip, Button } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import {
  EyeOutlined, EyeInvisibleOutlined, UnlockOutlined, LockOutlined,
} from '@ant-design/icons';
import { ComponentDataProps } from '@/store/editor';
import useComponentData from '@/hooks/useComponenetData';
import InlineEdit from '@/components/inline-edit';
import './style.less';

interface LayerListProps {
  list: ComponentDataProps[]
  selectedId: string | undefined
}
const LayerList: React.FC<LayerListProps> = ({ list, selectedId }) => {
  const { updateComponent, selectComponent, setComponentsData } = useComponentData();
  const [dragData, setDragData] = useState({
    currentDragging: '',
    currentIndex: -1,
  });
  const handleClick = (id: string) => {
    selectComponent(id);
  };
  const handleChange = (e: React.MouseEvent<HTMLElement>, key: string, value: boolean, id: string) => {
    e.stopPropagation();
    updateComponent(key as any, value, id, true);
  };
  const onDragOver = (e: React.DragEvent<HTMLUListElement>) => {
    e.preventDefault();
  };
  const onDragStart = (id: string, index: number) => {
    setDragData(
      {
        currentDragging: id,
        currentIndex: index,
      },
    );
  };
  const onDragEnter = (index: number) => {
    if (index !== dragData.currentIndex) {
      const newList = arrayMoveImmutable(list, dragData.currentIndex, index);
      setDragData((data) => ({
        ...data,
        currentIndex: index,
      }));
      setComponentsData(newList);
    }
  };
  return (
    <ul
      className="ant-list-items ant-list-bordered"
      onDragOver={onDragOver}
    >
      {
       list.map((item, index) => (
         <li
           className={['ant-list-item', item.id === selectedId
             ? 'active' : null, dragData?.currentDragging === item.id ? 'ghost' : null].filter((v) => !!v).join(' ')}
           key={item.id}
           onClick={() => handleClick(item.id)}
           onDragStart={() => onDragStart(item.id, index)}
           onDragEnter={() => onDragEnter(index)}
           draggable
           data-index={index}
         >
           <Tooltip title={item.isHidden ? '显示' : '隐藏'}>
             <Button shape="circle" onClick={(e) => handleChange(e, 'isHidden', !item.isHidden, item.id)}>
               {
                 item.isHidden ? <EyeOutlined /> : <EyeInvisibleOutlined />
               }
             </Button>
           </Tooltip>
           <Tooltip title={item.isLocked ? '解锁' : '锁定'}>
             <Button shape="circle" onClick={(e) => handleChange(e, 'isLocked', !item.isLocked, item.id)}>
               {
                 item.isLocked ? <UnlockOutlined /> : <LockOutlined />
               }
             </Button>
           </Tooltip>
           <InlineEdit value={item.layerName || ''} id={item.id} />
         </li>
       ))
      }
    </ul>
  );
};

export default LayerList;
