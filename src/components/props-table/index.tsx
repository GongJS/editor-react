import React, { useMemo } from 'react';
import { reduce } from 'lodash-es';
import {
  AllComponentProps, mapPropsToForms, PropToForm, componentMap, PropsToForms,
} from '@/defaultProps';
import useComponentData from '@/hooks/useComponenetData';
import usePageData from '@/hooks/usePageData';
import './style.less';

interface PropsTableProps {
  props: Partial<AllComponentProps>
  type?: 'component' | 'page'
}
interface TagProps {
  value: string
  onChange?: (e: any) => void
}

const PropsTable: React.FC<PropsTableProps> = ({ props, type }) => {
  const { updateComponent } = useComponentData();
  const { updatePageData } = usePageData();
  const handleChange = (v: any, k: keyof AllComponentProps, propsValue: PropToForm) => {
    const value = propsValue.afterTransform ? propsValue.afterTransform(v) : v;
    if (type === 'page') {
      updatePageData(k, value);
    } else {
      updateComponent({ [k]: value });
    }
  };
  const finalProps = useMemo(() => reduce(props, (result, value, key) => {
    const newKey = key as keyof AllComponentProps;
    const item = mapPropsToForms[newKey];
    if (item) {
      const newItem: PropToForm = {
        ...item,
        value,
      };
      result[newKey] = newItem;
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
        <div className={['prop-item', !propsValue.text ? 'no-text' : null].join(' ')} key={key} id={`item-${key}`}>
          {
            propsValue.text && <span className="label">{ propsValue.text }</span>
        }
          <div className={`prop-component component-${propsValue.component}`}>
            <Tag
              value={propsValue.initialTransform ? propsValue.initialTransform(propsValue.value) : propsValue.value}
              {...propsValue.extraProps}
              onChange={(value: any) => handleChange(value, key, propsValue)}
            >
              {
              propsValue.options
              && propsValue.options.map((option, index) => <SubTag value={option.value} key={index}>{option.text}</SubTag>)
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

PropsTable.defaultProps = {
  type: 'component',
};
export default PropsTable;
