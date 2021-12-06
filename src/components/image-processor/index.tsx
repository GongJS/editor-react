import React from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import StyledUploader from '@/components/styled-uploader';
import { UploadResp } from '@/extraType';
import useComponentData from '@/hooks/useComponenetData';
import './style.less';

interface ImageProcessorProps {
  value: string
  showDelete?: boolean
}
const ImageProcessor: React.FC<ImageProcessorProps> = ({ value, showDelete }) => {
  const { updateComponent } = useComponentData();
  const handleDelete = () => {
    updateComponent('src', '');
  };
  const handleFileUploaded = (data: UploadResp) => {
    updateComponent('src', data.data.urls[0]);
  };
  return (
    <div className="image-processor">
      <div style={{ backgroundImage: `url(${value})` }} className={showDelete ? 'image-preview extraHeight' : 'image-preview'} />
      <div className="image-process">
        <StyledUploader onSuccess={handleFileUploaded} />
        { showDelete && (
        <Button type="primary" danger onClick={handleDelete}>
          <DeleteOutlined />
          删除图片
        </Button>
        )}
      </div>
    </div>
  );
};
ImageProcessor.defaultProps = {
  showDelete: true,
};
export default ImageProcessor;
