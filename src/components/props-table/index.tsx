import React, { useMemo } from 'react';
import { reduce } from 'lodash-es';
import {
  Button, Input, Switch, InputNumber, Slider, Select, Radio,
} from 'antd';
import { TextComponentProps } from '@/defaultProps';
import './style.less';

export interface PropToForm {
  component: string;
  subComponent?: string;
  value?: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string; value: any }[];
  initialTransform?: (v: any) => any;
}
export type PropsToForms = {
  [P in keyof TextComponentProps]?: PropToForm
}

export const mapPropsToForms: PropsToForms = {
  text: {
    component: 'input',
  },
  fontSize: {
    text: '字号',
    component: 'input-number',
    initialTransform: (v: string) => parseInt(v, 10),
  },
  lineHeight: {
    text: '行高',
    component: 'slider',
    extraProps: { min: 0, max: 3, step: 0.1 },
    initialTransform: (v: string) => parseInt(v, 10),
  },
  textAlign: {
    component: 'radio-group',
    subComponent: 'radio-button',
    text: '对齐',
    options: [
      { value: 'left', text: '左' },
      { value: 'center', text: '中' },
      { value: 'right', text: '右' },
    ],
  },
  fontFamily: {
    component: 'select',
    subComponent: 'select-option',
    text: '字体',
    options: [
      { value: '', text: '无' },
      { text: '宋体', value: '"SimSun","STSong"' },
      { text: '黑体', value: '"SimHei","STHeiti"' },
      { text: '楷体', value: '"KaiTi","STKaiti"' },
      { text: '仿宋', value: '"FangSong","STFangsong"' },
    ],
  },
};

interface PropsTableProps {
  props: Partial<TextComponentProps>
}
const componentMap = {
  button: Button,
  switch: Switch,
  input: Input,
  'input-number': InputNumber,
  slider: Slider,
  'radio-group': Radio.Group,
  'radio-button': Radio.Button,
  select: Select,
  'select-option': Select.Option,
};

const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  const finalProps = useMemo(() => reduce(props, (result, value, key) => {
    const newKey = key as keyof TextComponentProps;
    const item = mapPropsToForms[newKey];
    if (item) {
      item.value = value;
      result[newKey] = item;
    }
    return result;
  }, {} as PropsToForms), [props]);
  return (
    <div className="props-table">
      {
    Object.entries(finalProps).map((item) => {
      const value = item[1];
      const Tag = componentMap[value.component as keyof typeof componentMap] as any;
      const SubTag = componentMap[value.subComponent as keyof typeof componentMap] as any;
      return (
        <div className="prop-item" key={item[0]}>
          {
            value.text && <span className="label">{ value.text }</span>
        }
          <Tag value={value.value} {...value.extraProps}>
            {
              value.options && value.options.map((option, index) => <SubTag value={option.value} key={index}>{option.text}</SubTag>)
            }
          </Tag>
        </div>
      );
    })
  }
    </div>
  );
};

export default PropsTable;
