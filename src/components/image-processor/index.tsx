import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined, ScissorOutlined } from '@ant-design/icons';
import Cropper from 'cropperjs';
import StyledUploader from '@/components/styled-uploader';
import { UploadResp } from '@/extraType';
import useComponentData from '@/hooks/useComponenetData';
import './style.less';

interface ImageProcessorProps {
  value: string
  showDelete?: boolean
}
interface CropDataProps {
  x: number;
  y: number;
  width: number;
  height: number;
}
const ImageProcessor: React.FC<ImageProcessorProps> = ({ value, showDelete }) => {
  const { updateComponent } = useComponentData();
  const [showModal, setShowModal] = useState(false);
  const cropperImg = useRef<HTMLImageElement | null>(null);
  let cropper: Cropper;
  let cropData: CropDataProps | null = null;
  const handleDelete = () => {
    updateComponent('src', '');
  };
  const handleFileUploaded = (data: UploadResp) => {
    updateComponent('src', data.data.urls[0]);
  };
  const handleOk = () => {
    if (cropData) {
      const {
        x, y, width, height,
      } = cropData;
      const cropperURL = `${value}?x-oss-process=image/crop,x_${x},y_${y},w_${width},h_${height}`;
      updateComponent('src', cropperURL);
    }
    setShowModal(false);
  };
  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        if (cropperImg.current) {
          cropper = new Cropper(cropperImg.current, {
            crop(event) {
              const {
                x, y, width, height,
              } = event.detail;
              cropData = {
                x: Math.floor(x),
                y: Math.floor(y),
                width: Math.floor(width),
                height: Math.floor(height),
              };
            },
          });
        }
      }, 0);
    } else if (cropper) {
      cropper.destroy();
    }
  }, [showModal]);
  return (
    <div className="image-processor">
      <Modal
        title="裁剪图片"
        visible={showModal}
        onOk={handleOk}
        onCancel={() => setShowModal(false)}
        okText="确认"
        cancelText="取消"
      >
        <div className="image-cropper">
          <img src={value?.split('?')[0]} id="processed-image" ref={cropperImg} alt="" />
        </div>
      </Modal>
      <div style={{ backgroundImage: `url(${value})` }} className={showDelete ? 'image-preview extraHeight' : 'image-preview'} />
      <div className="image-process">
        <StyledUploader onSuccess={handleFileUploaded} />
        <Button onClick={() => setShowModal(true)}>
          <ScissorOutlined />
          裁剪图片
        </Button>
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
