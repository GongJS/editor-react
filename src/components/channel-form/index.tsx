import React, { useEffect, useRef, useMemo } from 'react';
import { Button, Row, Col, Form, Tabs, Input, message } from 'antd';
import ClipboardJS from 'clipboard';
import { last } from 'lodash-es';
import { useRecoilValue } from 'recoil';
import ReactDOM from 'react-dom';
import QRCode from 'react-qr-code';
import { pageData, ChannelDataProps } from '@/store/editor';
import {
  useFetchCreteChannel,
  useFetchDeleteChannel,
  useFetchPublishTemplate,
} from '@/request/works';
import { baseH5URL } from '@/hooks/useHttp';
import './style.less';

const { TabPane } = Tabs;

interface ChannelFormProps {
  currentWorkId?: string;
  channels: ChannelDataProps[];
  coverImg?: string;
}
const ChannelForm: React.FC<ChannelFormProps> = ({
  currentWorkId,
  channels,
  coverImg,
}) => {
  const [form] = Form.useForm();
  const qrCodeGenerated = useRef(false);
  const { mutateAsync: fetchDeleteChannel, isLoading: deleteLoading } =
    useFetchDeleteChannel();
  const { mutateAsync: fetchCreateChannel, isLoading: createLoading } =
    useFetchCreteChannel();
  const { mutateAsync: fetchPublishTemplate, isLoading: publishLoading } =
    useFetchPublishTemplate();
  const page = useRecoilValue(pageData);
  const oldChannels = useRef(channels);

  const deleteDisabled = useMemo(() => channels?.length === 1, [channels]);

  const generateChannelURL = (id?: number) =>
    id
      ? `${baseH5URL}/${page.id}-${page.uuid}?channel=${id}`
      : `${baseH5URL}/${page.id}-${page.uuid}`;

  const generateQRCode = (id?: number) => {
    const ele = document.getElementById(
      id ? `channel-barcode-${id}` : 'channel-barcode-template',
    );
    if (ele) {
      ReactDOM.unmountComponentAtNode(ele);
      ReactDOM.render(<QRCode value={generateChannelURL(id)} size={80} />, ele);
    }
  };

  const tabChange = (key: string) => {
    if (key === 'template' && !qrCodeGenerated.current) {
      setTimeout(() => {
        generateQRCode();
        qrCodeGenerated.current = true;
      });
    }
  };

  const onFinish = async (values: { channelName: string }) => {
    const payload = {
      name: values.channelName,
      workId: parseInt(currentWorkId!, 10),
    };
    await fetchCreateChannel(payload);
    form.resetFields();
  };
  const handleCopyMessage = (e: ClipboardJS.Event) => {
    message.success('复制成功', 1);
    e.clearSelection();
  };
  useEffect(() => {
    const clipboardArr: ClipboardJS[] = [];
    setTimeout(() => {
      channels.forEach((channel) => {
        generateQRCode(channel.id);
        const clipboard = new ClipboardJS(`.copy-button-${channel.id}`);
        clipboard.on('success', handleCopyMessage);
        clipboardArr.push(clipboard);
      });
    }, 500);
    return () => {
      clipboardArr.forEach((item) => {
        item.destroy();
      });
    };
  }, [channels.length]);
  useEffect(() => {
    const clipboard = new ClipboardJS('.copy-button-template');
    clipboard.on('success', handleCopyMessage);
    return () => {
      clipboard.destroy();
    };
  }, []);
  useEffect(() => {
    if (
      channels.length > oldChannels.current.length &&
      oldChannels.current.length !== 0
    ) {
      const createdChannel = last(channels);
      if (createdChannel) {
        generateQRCode(createdChannel.id);
      }
    }
    return () => {
      oldChannels.current = channels;
    };
  }, [channels]);

  return (
    <div className="publish-channel-container">
      <Row style={{ marginBottom: '20px' }}>
        <Col span={8} className="left-col">
          封面图
          <img src={page.coverImg || coverImg} alt={page.title} />
        </Col>
        <Col span={16} className="right-col">
          <Row>
            <Col span={6}>
              <img
                src={
                  (page.setting && page.setting.shareImg) ||
                  'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f79389d4737571e2e1dc7cb.png'
                }
                alt={page.title}
              />
            </Col>
            <Col span={18} className="left-gap">
              <h4>{page.title}</h4>
              <p>{page.desc}</p>
            </Col>
          </Row>
          <Tabs type="card" style={{ marginTop: '20px' }} onChange={tabChange}>
            <TabPane key="channels" tab="发布为作品">
              {channels.map((channel) => (
                <Row key={channel.id} className="channel-item">
                  <Col span={6}>
                    <div
                      id={`channel-barcode-${channel.id}`}
                      className="barcode-container"
                    />
                  </Col>
                  <Col span={18} className="left-gap">
                    <h4>{channel.name}</h4>
                    <Row>
                      <Col span={18}>
                        <Input
                          value={generateChannelURL(channel.id)}
                          readOnly
                          id={`channel-url-${channel.id}`}
                        />
                      </Col>
                      <Col span={6}>
                        <Button
                          className={`copy-button copy-button-${channel.id}`}
                          data-clipboard-target={`#channel-url-${channel.id}`}
                        >
                          复制
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <div className="delete-area">
                    <Button
                      type="primary"
                      danger
                      size="small"
                      onClick={() => fetchDeleteChannel(channel.id)}
                      disabled={deleteDisabled}
                      loading={deleteLoading}
                    >
                      删除渠道
                    </Button>
                  </div>
                </Row>
              ))}

              <Form
                layout="inline"
                form={form}
                style={{ marginTop: '20px' }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="channelName"
                  rules={[{ required: true, message: '渠道名称不能为空' }]}
                >
                  <Input placeholder="渠道名称" />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" type="primary" loading={createLoading}>
                    创建新渠道
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane key="template" tab="发布为模版">
              <Row className="channel-item">
                <Col span={6}>
                  <div id="channel-barcode-template" className="barcode-container" />
                </Col>
                <Col span={18} className="left-gap">
                  <h4>模版信息</h4>
                  <Row>
                    <Col span={18}>
                      <Input
                        value={generateChannelURL()}
                        readOnly
                        id="channel-url-template"
                      />
                    </Col>
                    <Col span={6}>
                      <Button
                        className="copy-button copy-button-template"
                        data-clipboard-target="#channel-url-template"
                      >
                        复制
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="template-submit">
                <Button
                  type="primary"
                  size="large"
                  onClick={() => fetchPublishTemplate(currentWorkId!)}
                  loading={publishLoading}
                >
                  发布模版
                </Button>
              </div>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

ChannelForm.defaultProps = {
  currentWorkId: '',
  coverImg: '',
};
export default ChannelForm;
