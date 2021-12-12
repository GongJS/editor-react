import {
  useEffect, useCallback, useRef,
} from 'react';

const useDebounce = (fn: Function, delay: number, dep = []) => {
  const { current } = useRef<{fn: Function, timer: null | number}>({ fn, timer: null });
  useEffect(() => {
    current.fn = fn;
  }, [fn]);

  return useCallback((...args) => {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current!.timer = window.setTimeout(() => {
      current.fn.call(null, ...args);
    }, delay);
  }, dep);
};

export default useDebounce;
