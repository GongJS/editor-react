import { useEffect } from 'react';
import hotkeys, { KeyHandler } from 'hotkeys-js';

const useHotKey = (keys: string, callback: KeyHandler) => {
  useEffect(() => {
    hotkeys(keys, callback);
    return () => {
      hotkeys.unbind(keys, callback);
    };
  });
};

export default useHotKey;
