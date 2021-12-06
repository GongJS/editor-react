import React, {
  ReactNode, useMemo, useRef, useState,
} from 'react';
import axios from 'axios';
import { DeleteOutlined, LoadingOutlined, FileOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { last } from 'lodash-es';
import { UploadResp } from '@/extraType';
import './style.less';

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type FileListType = 'picture' | 'text'
interface UploaderProps {
  action?: string
  loadingSlot?: ReactNode
  uploadedSlot?: ReactNode
  beforeUpload?: (file: File) => any
  onSuccess: (data: UploadResp) => any
  onError?: (data: any) => any
  drag?: boolean
  showUploadList?: boolean
  listType?: FileListType
}
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStatus;
  raw: File;
  resp?: any;
  url?: string;
}

const Uploader: React.FC<UploaderProps> = ({
  onSuccess,
  onError,
  listType,
  showUploadList,
  drag,
  beforeUpload,
  action,
  loadingSlot, uploadedSlot, children,
}) => {
  const fileInput = useRef<null | HTMLInputElement>(null);
  const [filesList, setFileSList] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const isUploading = useMemo(() => filesList.some((file) => file.status === 'loading'), [filesList]);
  const lastFileData = useMemo(() => {
    const lastFile = last(filesList);
    if (lastFile) {
      return {
        loaded: lastFile.status === 'success',
        data: lastFile.resp,
      };
    }
    return false;
  }, [filesList]);

  const triggerUpload = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const [events, setEvents] = useState< { [key: string]:(e: any) => void }>({ onClick: triggerUpload });
  const postFile = (readyFile: UploadFile) => {
    const formData = new FormData();
    const copyFilesList = JSON.parse(JSON.stringify(filesList));
    formData.append(readyFile.name, readyFile.raw);
    readyFile.status = 'loading';
    axios.post(action!, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((resp) => {
      readyFile.status = 'success';
      readyFile.resp = resp.data;
      readyFile.status = 'success';
      onSuccess(resp.data);
    }).catch((e: any) => {
      readyFile.status = 'error';
      onError?.(e);
    }).finally(() => {
      if (fileInput.current) {
        fileInput.current.value = '';
      }
      copyFilesList.push(readyFile);
      setFileSList(copyFilesList);
    });
  };
  const addFileToList = (uploadedFile: File) => {
    const fileObj: UploadFile = {
      uid: uuidv4(),
      size: uploadedFile.size,
      name: uploadedFile.name,
      status: 'ready',
      raw: uploadedFile,
    };
    if (listType === 'picture') {
      try {
        fileObj.url = URL.createObjectURL(uploadedFile);
      } catch (err) {
        console.error('upload File error', err);
      }
    }
    postFile(fileObj);
  };
  const beforeUploadCheck = (files: null | FileList) => {
    if (files) {
      const uploadedFile = files[0];
      if (beforeUpload) {
        const result = beforeUpload(uploadedFile);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            if (processedFile instanceof File) {
              addFileToList(processedFile);
            } else {
              throw new Error('beforeUpload Promise should return File object');
            }
          }).catch((e) => {
            console.error(e);
          });
        } else if (result === true) {
          addFileToList(uploadedFile);
        }
      } else {
        addFileToList(uploadedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    beforeUploadCheck(e.target.files);
  };
  const handleDrag = (e: DragEvent, over: boolean) => {
    e.preventDefault();
    setIsDragOver(over);
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer) {
      beforeUploadCheck(e.dataTransfer.files);
    }
  };
  if (drag) {
    const newEvents = {
      ...events,
      onDragover: (e: DragEvent) => { handleDrag(e, true); },
      onDragleave: (e: DragEvent) => { handleDrag(e, false); },
      onDrop: handleDrop,
    };
    setEvents(newEvents);
  }
  const removeFile = (id: string) => {
    const copyFilesList = JSON.parse(JSON.stringify(filesList.filter((file) => file.uid !== id)));
    setFileSList(copyFilesList);
  };
  return (
    <div className="file-upload">
      <div className={`upload-area ${drag && isDragOver ? 'is-dragover' : null}`} {...events}>
        {
          isUploading
            ? (loadingSlot || <button type="button" className="btn btn-primary" disabled>正在上传...</button>)
            : lastFileData && lastFileData.loaded
              ? (uploadedSlot || <button type="button" className="btn btn-primary" disabled>点击上传</button>)
              : (children || <button type="button" className="btn btn-primary">点击上传</button>)
        }
      </div>
      <input
        type="file"
        className="file-input"
        ref={fileInput}
        onChange={handleFileChange}
      />
      {
        showUploadList && (
          <ul className={`upload-list upload-list-${listType}`}>
            {
              filesList.map((file) => (
                <li key={file.uid}>
                  {
                    file.url && listType === 'picture'
                    && <img className="upload-list-thumbnail" src={file.url} alt={file.name} />
                  }
                  {
                    file.status === 'loading'
                      ? <span className="file-icon"><LoadingOutlined /></span>
                      : <span className="file-icon"><FileOutlined /></span>
                  }
                  <span className="filename">{file.name}</span>
                  <span className="delete-icon" onClick={() => removeFile(file.uid)}><DeleteOutlined /></span>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  );
};
Uploader.defaultProps = {
  action: 'http://1.116.156.44:8081/api/utils/upload-img',
  loadingSlot: null,
  uploadedSlot: null,
  beforeUpload: (file: File) => {},
  onError: (e: any) => {},
  drag: false,
  showUploadList: false,
  listType: 'text',
};
export default Uploader;
