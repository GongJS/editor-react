import { message } from 'antd';
import { useRecoilValue } from 'recoil';
import useComponentData from '@/hooks/useComponenetData';
import editorData from '@/store/editor';

export type MoveDirection = 'Up' | 'Down' | 'Left' | 'Right'

export const operationText: { [key: string]: {text: string; shortcut: string} } = {
  copy: {
    text: '拷贝图层',
    shortcut: '⌘C / Ctrl+C',
  },
  paste: {
    text: '粘贴图层',
    shortcut: '⌘V / Ctrl+V',
  },
  delete: {
    text: '删除图层',
    shortcut: 'Backspace / Delete',
  },
  cancel: {
    text: '取消选中',
    shortcut: 'ESC',
  },
  undo: {
    text: '撤销',
    shortcut: '⌘Z / Ctrl+Z',
  },
  redo: {
    text: '重做',
    shortcut: '⌘⇧Z / Ctrl+Shift+Z',
  },
  move: {
    text: '上下左右移动一像素',
    shortcut: '↑ ↓ → ←',
  },
  moveTen: {
    text: '上下左右移动十像素',
    shortcut: 'Shift + ↑ ↓ → ←',
  },
};

export default function dataOperations(componentId: string) {
  const editor = useRecoilValue(editorData);
  const {
    copyComponent,
    pasteComponent,
    deleteComponent,
    undoComponent,
    redoComponent,
    moveComponent,
    cancelComponent,
    canRedo,
    canUndo,
  } = useComponentData();
  return {
    copy: () => {
      if (componentId) {
        copyComponent(componentId);
        message.success('已拷贝当前图层', 1);
      }
    },
    paste: () => {
      if (componentId && editor.copiedComponent.id) {
        pasteComponent(componentId);
        message.success('已黏贴当前图层', 1);
      }
    },
    delete: () => {
      if (componentId) {
        deleteComponent(componentId);
        message.success('删除当前图层成功', 1);
      }
    },
    cancel: () => {
      cancelComponent();
    },
    undo: () => {
      if (canUndo) {
        undoComponent();
      }
    },
    redo: () => {
      if (canRedo) {
        redoComponent();
      }
    },
    move: (direction: MoveDirection, amount: number) => {
      if (componentId) {
        moveComponent({ direction, amount });
      }
    },
  };
}
