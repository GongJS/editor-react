import { message } from 'antd';

interface CheckCondition {
  format?: string[];
  // 使用多少 M 为单位
  size?: number;
}
type ErrorType = 'size' | 'format' | null
export const imageDimensions = (file: File) => new Promise<{ width: number; height: number }>((resolve, reject) => {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  // the following handler will fire after the successful loading of the image
  img.onload = () => {
    const { naturalWidth: width, naturalHeight: height } = img;
    resolve({ width, height });
  };
  // and this handler will fire if there was an error with the image (like if it's not really an image or a corrupted one)
  img.onerror = () => {
    reject(new Error('There was some problem with the image.'));
  };
});

export function beforeUploadCheck(file: File, condition: CheckCondition) {
  const { format, size } = condition;
  const isValidFormat = format ? format.includes(file.type) : true;
  const isValidSize = size ? (file.size / 1024 / 1024 < size) : true;
  let error: ErrorType = null;
  if (!isValidFormat) {
    error = 'format';
  }
  if (!isValidSize) {
    error = 'size';
  }
  return {
    passed: isValidFormat && isValidSize,
    error,
  };
}

export const commonUploadCheck = (file: File) => {
  const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 });
  const { passed, error } = result;
  if (error === 'format') {
    message.error('上传图片只能是 JPG/PNG 格式!');
  }
  if (error === 'size') {
    message.error('上传图片大小不能超过 1Mb');
  }
  return passed;
};

export const getImageDimensions = (url: string | File) => new Promise<{ width: number; height: number }>((resolve, reject) => {
  const img = new Image();
  img.src = typeof url === 'string' ? url : URL.createObjectURL(url);
  img.addEventListener('load', () => {
    const { naturalWidth: width, naturalHeight: height } = img;
    resolve({ width, height });
  });
  img.addEventListener('error', () => {
    reject(new Error('There was some problem with the image.'));
  });
});

export const clickInsideElement = (e: Event, className: string) => {
  let el = e.target as HTMLElement;
  if (el.classList.contains(className)) {
    return el;
  }
  while (el) {
    if (el.classList && el.classList.contains(className)) {
      return el;
    }
    el = el.parentNode as HTMLElement;
  }

  return false;
};
export const isMobile = (mobile: string) => {
  return /^1[3-9]\d{9}$/.test(mobile)
}