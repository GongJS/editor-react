import React from 'react';
import './style.less';

interface ColorPickerProps {
  value: string,
  onChange: (v: string) => any
}
const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  const defaultColors = ['#ffffff', '#f5222d', '#fa541c', '#fadb14', '#52c41a', '#1890ff', '#722ed1', '#8c8c8c', '#000000', ''];
  const updateColor = (v: string) => {
    onChange(v);
  };
  const handleClick = (e: React.MouseEvent<HTMLLIElement>, item: string) => {
    e.preventDefault();
    onChange(item);
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
