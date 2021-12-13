import React from 'react';
import StyledUploader from '@/components/styled-uploader';
import ImageProcessor from '@/components/image-processor';
import { UploadResp } from '@/extraType';
import './style.less';

interface BackgroundProcessorProps {
  value: string
  onChange: (value: string) => any
}

const BackgroundProcessor: React.FC<BackgroundProcessorProps> = ({ value, onChange }) => {
  const handleFileUploaded = (data: UploadResp) => {
    onChange(data.data.urls[0]);
  };
  const handleImgUrlChange = (v: string) => {
    onChange(v);
  };
  return (
    <div className="background-processor">
      {
        value ? <ImageProcessor onChange={handleImgUrlChange} value={value} /> : <StyledUploader onSuccess={handleFileUploaded} />
      }
    </div>
  );
};
export default BackgroundProcessor;
