import React from 'react';
import { Spin } from 'antd';
import './style.less';

const FullPageLoading: React.FC = () => (
  <div className="full-page-loading">
    <Spin size="large" />
  </div>
);

export default FullPageLoading;
