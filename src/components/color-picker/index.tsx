import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import editorData, { ComponentData, getCurrentElement } from '@/store/editor';
import './style.less';

const ColorPicker: React.FC<{value: string}> = ({ value }) => {
  const defaultColors = ['#ffffff', '#f5222d', '#fa541c', '#fadb14', '#52c41a', '#1890ff', '#722ed1', '#8c8c8c', '#000000', ''];
  const [editor, setEditor] = useRecoilState(editorData);
  const currentElement = JSON.parse(JSON.stringify(useRecoilValue(getCurrentElement)));
  const copyComponents = JSON.parse(JSON.stringify(editor.components));
  const updateColor = (color: string) => {
    copyComponents.map((component: ComponentData) => {
      if (component.id === currentElement.id) {
        component.props.color = color;
      }
      return component;
    });
    setEditor((oldEditor) => ({
      ...oldEditor,
      components: copyComponents,
    }));
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
