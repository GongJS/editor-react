import React from 'react';
import { FileImageOutlined, LoadingOutlined } from '@ant-design/icons';
import { commonUploadCheck } from '@/helper';
import Uploader from '@/components/uploader';
import { UploadResp } from '@/extraType';
import './style.less';

interface StyledUploaderProps {
  onSuccess: (params: UploadResp) => void
}

const StyledUploader: React.FC<StyledUploaderProps> = ({ onSuccess }) => {
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
        onSuccess={onSuccess}
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
