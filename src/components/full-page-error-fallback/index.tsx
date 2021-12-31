import React from 'react';
import { Typography, Button } from 'antd';
import './style.less';

interface FullPageErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type="danger">{error?.message}</Typography.Text>;
  }
  return null;
};

const FullPageErrorFallback: React.FC<FullPageErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <div className="full-page-error-fallback">
    <ErrorBox error={error} />
    <Button style={{ marginTop: '50px' }} type="primary" onClick={resetErrorBoundary}>
      Reset
    </Button>
  </div>
);

export default FullPageErrorFallback;
