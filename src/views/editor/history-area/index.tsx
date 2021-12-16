import React, { useState } from 'react';
import { Tooltip, Button, Modal } from 'antd';
import { QuestionOutlined, UndoOutlined, RedoOutlined } from '@ant-design/icons';
import useComponentData from '@/hooks/useComponenetData';
import { operationText } from '@/plugins/dataOperations';
import './style.less';

const HistoryArea: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    canRedo, canUndo, redoComponent, undoComponent,
  } = useComponentData();
  return (
    <div className="history-area">
      <Modal
        title="快捷键操作"
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
        width="400px"
      >
        <ul className="shortcut-list">
          {
           Object.keys(operationText).map((key) => (
             <li key={key} className="shortcut-list-item">
               <span className="text">{operationText[key].text}</span>
               <span className="bold">{operationText[key].shortcut}</span>
             </li>
           ))
        }
        </ul>
      </Modal>
      <div className="operation-list">
        <Tooltip title="快捷键操作提示">
          <Button shape="circle" onClick={() => setModalVisible(true)} icon={<QuestionOutlined />} />
        </Tooltip>
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
