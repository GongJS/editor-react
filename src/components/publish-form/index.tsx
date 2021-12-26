import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useRecoilValue } from 'recoil';
import { Button, Row, Col, Form, Input } from 'antd';
import QRCode from 'react-qr-code';
import { pageData, PageDataNormalProps } from '@/store/editor';
import usePageData from '@/hooks/usePageData';
import { UploadResp } from '@/extraType';
import StyledUploader from '@/components/styled-uploader';
import './style.less';

interface PublishFormProps {
  isSaving: boolean;
  isPublishing?: boolean;
  previewURL: string;
  closePreview: () => void;
  saveWork: (isDrawerVisible: boolean) => void;
  checkAndpublish: () => void;
}

const defaultCoverImgUrl =
  'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f79389d4737571e2e1dc7cb.png';

const PublishForm: React.FC<PublishFormProps> = ({
  isSaving,
  isPublishing,
  closePreview,
  saveWork,
  previewURL,
  checkAndpublish,
}) => {
  const [form] = Form.useForm();
  const { updatePageSettingData, updatePageNormalData } = usePageData();
  const page = useRecoilValue(pageData);

  const updatePage = (type: keyof PageDataNormalProps, value: string) => {
    updatePageNormalData(type, value);
  };
  const updateAvatar = (data: UploadResp) => {
    updatePageSettingData('shareImg', data.data.urls[0]);
  };
  const onFinish = async () => {
    saveWork(false);
    closePreview();
  };
  useEffect(() => {
    ReactDOM.render(
      <QRCode value={previewURL} size={120} />,
      document.getElementById('preview-barcode-container'),
    );
  }, []);
  return (
    <div className="publish-form-container">
      <Row align="middle" style={{ marginBottom: '20px' }}>
        <Col span={6}>扫码预览：</Col>
        <Col span={10}>
          <div id="preview-barcode-container" />
        </Col>
      </Row>
      <Row align="middle" style={{ marginBottom: '20px' }}>
        <Col span={6}>上传封面：</Col>
        <Col span={10}>
          <div className="file-upload-container">
            <StyledUploader
              onSuccess={updateAvatar}
              uploadedImgSrc={page.setting.shareImg || defaultCoverImgUrl}
            />
          </div>
        </Col>
      </Row>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        initialValues={{
          title: page.title,
          desc: page.desc,
        }}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '标题不能为空' }]}
        >
          <Input
            value={page.title || 'dddd'}
            onChange={() => updatePage('title', form.getFieldValue('title'))}
          />
        </Form.Item>
        <Form.Item
          label="副标题"
          name="desc"
          rules={[{ required: true, message: '副标题不能为空' }]}
        >
          <Input
            value={page.desc}
            onChange={() => updatePage('desc', form.getFieldValue('desc'))}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 18, offset: 4 }}>
          <Button
            type="primary"
            onClick={checkAndpublish}
            loading={isPublishing}
            htmlType="submit"
          >
            发布
          </Button>
          <Button style={{ marginLeft: '10px' }} loading={isSaving} htmlType="submit">
            保存
          </Button>
          <Button style={{ marginLeft: '10px' }} onClick={closePreview}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
PublishForm.defaultProps = {
  isPublishing: false,
};
export default PublishForm;
