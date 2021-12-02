import React, { useMemo } from 'react';
import { reduce } from 'lodash-es';
import { Button, Input, Switch } from 'antd';
import { TextComponentProps } from '@/defaultProps';
import './style.less';

export interface PropToForm {
  component: string;
  value?: string;
}
export type PropsToForms = {
  [P in keyof TextComponentProps]?: PropToForm
}

export const mapPropsToForms: PropsToForms = {
  text: {
    component: 'input',
  },
};

interface PropsTableProps {
  props: Partial<TextComponentProps>
}
const componentMap = {
  button: Button,
  switch: Switch,
  input: Input,
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
    <div>
      {
    Object.entries(finalProps).map((item) => {
      const Tag = componentMap[item[1].component as keyof typeof componentMap];
      return <Tag value={item[1].value} key={item[0]} />;
    })
  }
    </div>
  );
};

export default PropsTable;
