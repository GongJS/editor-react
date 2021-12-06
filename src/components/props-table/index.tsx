import React, { useMemo } from 'react';
import { reduce } from 'lodash-es';
import {
  AllComponentProps, mapPropsToForms, PropToForm, componentMap, PropsToForms,
} from '@/defaultProps';
import useComponentData from '@/hooks/useComponenetData';
import './style.less';

interface PropsTableProps {
  props: Partial<AllComponentProps>
}
interface TagProps {
  value: string
  onChange?: (e: any) => void
}

const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  const { updateComponent } = useComponentData();
  const handleChange = (v: any, k: keyof AllComponentProps, propsValue: PropToForm) => {
    const value = propsValue.afterTransform ? propsValue.afterTransform(v) : v;
    updateComponent(k, value);
  };
  const finalProps = useMemo(() => reduce(props, (result, value, key) => {
    const newKey = key as keyof AllComponentProps;
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
      const propsValue = item[1];
      const key = item[0] as keyof AllComponentProps;
      const Tag = componentMap[propsValue.component as keyof typeof componentMap] as React.FC<TagProps>;
      const SubTag = componentMap[propsValue.subComponent as keyof typeof componentMap] as React.FC<TagProps>;
      return (
        <div className="prop-item" key={key}>
          {
            propsValue.text && <span className="label">{ propsValue.text }</span>
        }
          <div className="prop-component">
            <Tag
              value={propsValue.initialTransform ? propsValue.initialTransform(propsValue.value) : propsValue.value}
              {...propsValue.extraProps}
              onChange={(value: any) => handleChange(value, key, propsValue)}
            >
              {
              propsValue.options && propsValue.options.map((option, index) => <SubTag value={option.value} key={index}>{option.text}</SubTag>)
            }
            </Tag>
          </div>
        </div>
      );
    })
  }
    </div>
  );
};

export default PropsTable;
