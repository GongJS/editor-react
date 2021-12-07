import React from 'react';
import { Tooltip, Button } from 'antd';
import {
  EyeOutlined, EyeInvisibleOutlined, UnlockOutlined, LockOutlined,
} from '@ant-design/icons';
import { ComponentData } from '@/store/editor';
import useComponentData from '@/hooks/useComponenetData';
import './style.less';

interface LayerListProps {
  list: ComponentData[]
  selectedId: string | undefined
}
const LayerList: React.FC<LayerListProps> = ({ list, selectedId }) => {
  const { updateComponent, selectComponent } = useComponentData();
  const handleClick = (id: string) => {
    selectComponent(id);
  };
  const handleChange = (e: React.MouseEvent<HTMLElement>, key: string, value: boolean, id: string) => {
    e.stopPropagation();
    updateComponent(key as any, value, id, true);
  };
  return (
    <ul
      className="ant-list-items ant-list-bordered"
    >
      {
       list.map((item) => (
         <li
           className={item.id === selectedId ? 'ant-list-item active' : 'ant-list-item'}
           key={item.id}
           onClick={() => handleClick(item.id)}
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
           <span>{item.layerName}</span>
         </li>
       ))
      }
    </ul>
  );
};

export default LayerList;
