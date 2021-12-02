import React, { useMemo } from 'react';
import { reduce } from 'lodash-es';
import {
  Button, Input, Switch, InputNumber, Slider, Select, Radio,
} from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { TextComponentProps } from '@/defaultProps';
import './style.less';
import editorData, { ComponentData, getCurrentElement } from '@/store/editor';

export interface PropToForm {
  component: string;
  subComponent?: string;
  value?: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string; value: any }[];
  afterTransform?: (e: any) => any;
  initialTransform?: (v: any) => any;
}
export type PropsToForms = {
  [P in keyof TextComponentProps]?: PropToForm
}

export const mapPropsToForms: PropsToForms = {
  text: {
    text: '文本',
    component: 'textarea',
    extraProps: { rows: 3 },
    afterTransform: (e: any) => e.target.value,
  },
  fontSize: {
    text: '字号',
    component: 'input-number',
    initialTransform: (e: any) => parseInt(e, 10),
    afterTransform: (e: number) => (e ? `${e}px` : ''),
  },
  lineHeight: {
    text: '行高',
    component: 'slider',
    extraProps: { min: 0, max: 3, step: 1 },
    afterTransform: (e: number) => e.toString(),
    initialTransform: (e: any) => parseInt(e, 10),
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
    afterTransform: (e: any) => e.target.value,
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
interface TagProps {
  value: string
  onChange?: (e: any) => void
}
const componentMap = {
  button: Button,
  switch: Switch,
  input: Input,
  textarea: Input.TextArea,
  slider: Slider,
  select: Select,
  'radio-group': Radio.Group,
  'input-number': InputNumber,
  'radio-button': Radio.Button,
  'select-option': Select.Option,
};

const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  const [editor, setEditor] = useRecoilState(editorData);
  const currentElement = JSON.parse(JSON.stringify(useRecoilValue(getCurrentElement)));
  const copyComponents = JSON.parse(JSON.stringify(editor.components));
  const handleChange = (e: any, k: string, v: PropToForm) => {
    if (!currentElement) return;
    const value = v.afterTransform ? v.afterTransform(e) : e;
    currentElement!.props[k as keyof TextComponentProps] = value;
    copyComponents.map((component: ComponentData) => {
      if (component.id === currentElement.id) {
        component.props[k as keyof TextComponentProps] = value;
      }
      return component;
    });
    setEditor((oldEditor) => ({
      ...oldEditor,
      components: copyComponents,
    }));
  };
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
      const key = item[0];
      const Tag = componentMap[value.component as keyof typeof componentMap] as React.FC<TagProps>;
      const SubTag = componentMap[value.subComponent as keyof typeof componentMap] as React.FC<TagProps>;
      return (
        <div className="prop-item" key={key}>
          {
            value.text && <span className="label">{ value.text }</span>
        }
          <Tag
            value={value.initialTransform ? value.initialTransform(value.value) : value.value}
            {...value.extraProps}
            onChange={(e: any) => handleChange(e, key, value)}
          >
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
