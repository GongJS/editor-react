import React from 'react';
import useComponentDataField from '@/hooks/useComponentDataField';
import './style.less';

const ColorPicker: React.FC<{value: string}> = ({ value }) => {
  const defaultColors = ['#ffffff', '#f5222d', '#fa541c', '#fadb14', '#52c41a', '#1890ff', '#722ed1', '#8c8c8c', '#000000', ''];
  const { updateComponentField } = useComponentDataField();
  const updateColor = (color: string) => {
    updateComponentField('color', color);
  };
  const handleClick = (e: React.MouseEvent<HTMLLIElement>, item: string) => {
    e.preventDefault();
    updateColor(item);
  };
  return (
    <div className="lego-color-picker">
      <div className="native-color-container">
        <input type="color" value={value} onInput={(e) => updateColor((e.target as any).value)} />
      </div>
      <ul className="picked-color-list">
        {
          defaultColors.map((item, index) => (

            <li key={index} className={`item-${index}`} onClick={(e) => handleClick(e, item)}>
              {
                item.startsWith('#') ? <div style={{ backgroundColor: item }} className="color-item" />
                  : <div className="color-item transparent-back" />
              }
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default ColorPicker;
