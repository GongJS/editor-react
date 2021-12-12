import React, { useMemo } from 'react';
import {
  Slider,
} from 'antd';
import ColorPicker from '@/components/color-picker';
import './style.less';

interface ShadowPickerProps {
  value: string,
  onChange: (value: string) => void
}
const ShadowPicker: React.FC<ShadowPickerProps> = ({ value, onChange }) => {
  const values = useMemo(() => value.split(' '), [value]);
  const updateValue = (newValue: number | [number, number], index: number | number[]) => {
    const newValues = values.map((item, i) => {
      if (typeof index === 'number' && i === index) {
        return typeof newValue === 'number' ? `${newValue}px` : newValue;
      } if (Array.isArray(index) && index.includes(i)) {
        return typeof newValue === 'number' ? `${newValue}px` : newValue;
      }
      return item;
    });
    onChange(newValues.join(' '));
  };
  return (
    <div className="component-shadow-picker">
      <div className="shadow-item">
        <span>阴影颜色:</span>
        <div className="shadow-component">
          <ColorPicker value={values[3]} onChange={(v) => { updateValue(v, 3); }} />
        </div>
      </div>
      <div className="shadow-item">
        <span>阴影大小:</span>
        <div className="shadow-component">
          <Slider
            value={parseInt(values[0], 10)}
            min={0}
            max={20}
            onChange={(v) => { updateValue(v, [0, 1]); }}
          />
        </div>
      </div>
      <div className="shadow-item">
        <span>阴影模糊:</span>
        <div className="shadow-component">
          <Slider
            value={parseInt(values[2], 10)}
            min={0}
            max={20}
            onChange={(v) => { updateValue(v, [0, 2]); }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShadowPicker;
