import { KeyHandler, HotkeysEvent } from 'hotkeys-js';
import useHotKey from '@/hooks/useHotKey';
import useComponentData from '@/hooks/useComponenetData';

const wrap = (callback: KeyHandler) => {
  const wrapperFn = (e: KeyboardEvent, event: HotkeysEvent) => {
    e.preventDefault();
    callback(e, event);
  };
  return wrapperFn;
};

export default function useInitHotKeys() {
  const {
    copyComponent,
    pasteComponent,
    deleteComponent,
    selectComponent,
    moveComponent,
  } = useComponentData();
  useHotKey(
    'ctrl+c, command+c',
    wrap(() => {
      copyComponent();
    }),
  );
  useHotKey(
    'ctrl+v, command+v',
    wrap(() => {
      pasteComponent();
    }),
  );
  useHotKey(
    'backspace, delete',
    wrap(() => {
      deleteComponent();
    }),
  );
  useHotKey(
    'esc',
    wrap(() => {
      selectComponent('');
    }),
  );
  useHotKey(
    'up',
    wrap(() => {
      moveComponent({ direction: 'Up', amount: 1 });
    }),
  );
  useHotKey(
    'down',
    wrap(() => {
      moveComponent({ direction: 'Down', amount: 1 });
    }),
  );
  useHotKey(
    'left',
    wrap(() => {
      moveComponent({ direction: 'Left', amount: 1 });
    }),
  );
  useHotKey(
    'right',
    wrap(() => {
      moveComponent({ direction: 'Right', amount: 1 });
    }),
  );
  useHotKey(
    'shift+up',
    wrap(() => {
      moveComponent({ direction: 'Up', amount: 10 });
    }),
  );
  useHotKey(
    'shift+down',
    wrap(() => {
      moveComponent({ direction: 'Down', amount: 10 });
    }),
  );
  useHotKey(
    'shift+left',
    wrap(() => {
      moveComponent({ direction: 'Left', amount: 10 });
    }),
  );
  useHotKey(
    'shift+right',
    wrap(() => {
      moveComponent({ direction: 'Right', amount: 10 });
    }),
  );
}
