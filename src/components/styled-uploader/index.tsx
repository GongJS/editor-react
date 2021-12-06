import React from 'react';
import { FileImageOutlined, LoadingOutlined } from '@ant-design/icons';
import { commonUploadCheck } from '@/helper';
import Uploader from '@/components/uploader';
import { ImageComponentType } from '@/defaultTemplates';
import { commonDefaultProps } from '@/defaultProps';
import { UploadResp } from '@/extraType';
import './style.less';

interface StyledUploaderProps {
  onItemClick: (params: ImageComponentType) => void
}

const StyledUploader: React.FC<StyledUploaderProps> = ({ onItemClick }) => {
  const handleUploadSuccess = (data: UploadResp) => {
    onItemClick({
      name: 'l-image',
      imgSrc: data.data.urls[0],
      styleProps: { ...commonDefaultProps },
    });
  };
  const loadingSlot = (
    <div className="uploader-container">
      <LoadingOutlined spin />
      <h4>上传中</h4>
    </div>
  );
  const uploadedSlot = (
    <div className="uploader-container">
      <FileImageOutlined />
      <h4>上传图片</h4>
    </div>
  );
  return (
    <div className="styled-uploader">
      <Uploader
        loadingSlot={loadingSlot}
        uploadedSlot={uploadedSlot}
        beforeUpload={commonUploadCheck}
        onSuccess={handleUploadSuccess}
      >
        <div className="uploader-container">
          <FileImageOutlined />
          <h4>上传图片</h4>
        </div>
      </Uploader>
    </div>
  );
};

export default StyledUploader;
