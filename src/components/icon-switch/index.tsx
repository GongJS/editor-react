import React from 'react';
import { BoldOutlined, ItalicOutlined, UnderlineOutlined } from '@ant-design/icons';
import { Tooltip, Button } from 'antd';
import './style.less';

const iconMap = {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
};
interface IconSwitchProps {
  value: string
  iconName: string,
  tip: string,
  valueTransform: (v: string) => boolean
  onChange: (v: string) => void
}
const IconSwitch: React.FC<IconSwitchProps> = ({
  valueTransform, value, iconName, tip, onChange,
}) => {
  const Icon = iconMap[iconName as keyof typeof iconMap] as React.FC;
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onChange(value);
  };
  return (
    <div className="icon-template" onClick={handleClick}>
      <Tooltip title={tip}>
        <Button shape="circle" type={valueTransform && valueTransform(value) ? 'primary' : 'default'} icon={<Icon />} />
      </Tooltip>
    </div>
  );
};

export default IconSwitch;
