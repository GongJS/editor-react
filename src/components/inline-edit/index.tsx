import React, {
  useEffect, useState, useRef, useMemo,
} from 'react';
import useKeyPress from '@/hooks/useKeyPress';
import useComponentData from '@/hooks/useComponenetData';
import useClickOutside from '@/hooks/useClickOutside';
import './style.less';

interface InlineEditProps {
  value: string
  id: string
}
const InlineEdit: React.FC<InlineEditProps> = ({ value, id }) => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const wrapper = useRef<null | HTMLDivElement>(null);
  const { updateComponent } = useComponentData();
  const { isClickOutside, setIsClickOutside } = useClickOutside(wrapper);
  const [isEditing, setIsEditing] = useState(false);
  const [innerValue, setInnerValue] = useState(value);
  const cachedOldValue = useRef('');
  const handleClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInnerValue(e.target.value);
  };
  const validateCheck = useMemo(() => innerValue.trim() !== '', [innerValue]);
  useEffect(() => {
    if (!validateCheck) {
      return;
    }
    if (isClickOutside && isEditing) {
      setIsEditing(false);
      updateComponent('layerName', innerValue, id, true);
    }
    setIsClickOutside(false);
  }, [isClickOutside]);
  useEffect(() => {
    if (isEditing) {
      cachedOldValue.current = innerValue;
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      });
    }
  }, [isEditing]);
  useKeyPress('Escape', () => {
    if (isEditing) {
      setIsEditing(false);
      setInnerValue(cachedOldValue.current);
    }
  });
  useKeyPress('Enter', () => {
    if (isEditing) {
      setIsEditing(false);
      updateComponent('layerName', innerValue, id, true);
    }
  });
  return (
    <div className="inline-edit" onClick={handleClick} ref={wrapper}>
      {
      isEditing ? (
        <input
          value={innerValue}
          onChange={handleChange}
          ref={inputRef}
          className={!validateCheck ? 'ant-input input-error' : 'ant-input'}
        />
      ) : <span>{innerValue}</span>
      }
    </div>
  );
};

export default InlineEdit;
