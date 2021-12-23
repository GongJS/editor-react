import React from 'react';
import { FileImageOutlined, LoadingOutlined } from '@ant-design/icons';
import { commonUploadCheck } from '@/helper';
import Uploader from '@/components/uploader';
import { UploadResp } from '@/extraType';
import './style.less';

interface StyledUploaderProps {
  onSuccess: (params: UploadResp) => void;
  uploadedImgSrc?: string;
}

const StyledUploader: React.FC<StyledUploaderProps> = ({ onSuccess, uploadedImgSrc }) => {
  const loadingSlot = (
    <div className="uploader-container">
      <LoadingOutlined spin />
      <h4>上传中</h4>
    </div>
  );
  const uploadedSlot = !uploadedImgSrc ? (
    <div className="uploader-container">
      <FileImageOutlined />
      <h4>上传图片</h4>
    </div>
  ) : (
    <div className="uploader-container">
      <img src={uploadedImgSrc} alt="" />
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
        { uploadedSlot }
      </Uploader>
    </div>
  );
};

StyledUploader.defaultProps = {
  uploadedImgSrc: '',
};
export default StyledUploader;
