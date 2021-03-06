import { useEffect } from 'react';

const useKeyPress = (key: string, cb: () => any) => {
  const trigger = (event: KeyboardEvent) => {
    if (event.key === key) {
      cb();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', trigger);
    return () => {
      document.removeEventListener('keydown', trigger);
    };
  });
};

export default useKeyPress;
