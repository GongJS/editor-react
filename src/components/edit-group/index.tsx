import React, { useMemo, useState } from 'react';
import { Collapse } from 'antd';
import { difference } from 'lodash-es';
import PropsTable from '@/components/props-table';
import { AllComponentProps } from '@/defaultProps';
import './style.less';

type AllComponentPropsKeyType = keyof AllComponentProps
export interface GroupProps {
  text: string;
  items: AllComponentPropsKeyType[];
}

const { Panel } = Collapse;
const defaultEditGroups: GroupProps[] = [
  {
    text: '尺寸',
    items: ['height', 'width', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'],
  },
  {
    text: '边框',
    items: ['borderStyle', 'borderColor', 'borderWidth', 'borderRadius'],
  },
  {
    text: '阴影与透明度',
    items: ['opacity', 'boxShadow'],
  },
  {
    text: '位置',
    items: ['left', 'top'],
  },
  {
    text: '事件功能',
    items: ['actionType', 'url'],
  },
];

interface EditGroupProps {
  props: AllComponentProps,
}
const EditGroup: React.FC<EditGroupProps> = ({ props }) => {
  const [key, setKey] = useState<string | string[]>('0');
  const newGroups = useMemo(() => {
    const allNormalProps = defaultEditGroups.reduce((prev, current) => [...prev, ...current.items], [] as string[]);
    const specialProps = difference(Object.keys(props), allNormalProps);
    return [
      {
        text: '基本属性',
        items: specialProps,
      },
      ...defaultEditGroups,
    ];
  }, [defaultEditGroups, props]);
  const editGroups = useMemo(() => newGroups.map((group) => {
    const propsMap = {} as { [key: string]: any };
    (group.items as AllComponentPropsKeyType[]).forEach((item) => {
      propsMap[item] = props[item];
    });
    return {
      ...group,
      props: propsMap,
    };
  }), [newGroups]);
  const callback = (v: string | string[]) => {
    setKey(v);
  };
  return (
    <div className="edit-groups">
      <Collapse defaultActiveKey={key} onChange={callback}>
        {
          editGroups.map((item, index) => (
            <Panel key={`${index}`} header={item.text}>
              <PropsTable props={item.props} />
            </Panel>
          ))
        }
      </Collapse>
      ,
    </div>
  );
};

export default EditGroup;
