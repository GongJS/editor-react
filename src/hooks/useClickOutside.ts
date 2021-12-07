import {
  useEffect, useState, RefObject,
} from 'react';

const useClickOutside = (elementRef: RefObject<null | HTMLElement>) => {
  const [isClickOutside, setIsClickOutside] = useState(false);
  const handler = (e: MouseEvent) => {
    if (elementRef.current && e.target) {
      if (elementRef.current.contains(e.target as HTMLElement)) {
        setIsClickOutside(false);
      } else {
        setIsClickOutside(true);
      }
    }
  };
  useEffect(() => {
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  });
  return { isClickOutside, setIsClickOutside };
};

export default useClickOutside;
