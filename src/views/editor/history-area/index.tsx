import React from 'react';
import { Tooltip, Button } from 'antd';
import { UndoOutlined, RedoOutlined } from '@ant-design/icons';
import useComponentData from '@/hooks/useComponenetData';
import './style.less';

const HistoryArea: React.FC = () => {
  const {
    canRedo, canUndo, redoComponent, undoComponent,
  } = useComponentData();
  return (
    <div className="history-area">
      <div className="operation-list">
        <Tooltip title="撤销">
          <Button shape="circle" onClick={undoComponent} disabled={!canUndo} icon={<UndoOutlined />} />
        </Tooltip>
        <Tooltip title="重做">
          <Button shape="circle" onClick={redoComponent} disabled={!canRedo} icon={<RedoOutlined />} />
        </Tooltip>
      </div>
    </div>
  );
};

export default HistoryArea;
