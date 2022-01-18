import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Row, Input, Form, Col, Button, message, Modal } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { isMobile } from '@/helper';
import { useUserLogin, useGetCode } from '@/request/user';
import Logo2 from '@/assets/logo2.png';
import './style.less';

export interface LoginByPhoneNumberProps {
  phoneNumber: string;
  veriCode: string;
}
type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];
const COUNTDOWN_SECONDS = 60;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const timer = useRef<number | null>(null);
  const [timing, setTiming] = useState(false);
  const [second, setSecond] = useState(COUNTDOWN_SECONDS);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState<{
    value: string;
    validateStatus?: ValidateStatus;
    errorMsg?: string | null;
  }>({
    value: '',
  });
  const navigate = useNavigate();
  const { mutateAsync: userLogin, isLoading: loginLoading } = useUserLogin();
  const { mutateAsync: getVericode, isLoading: codeLoading } = useGetCode();

  const validatePhone = (
    value: string,
  ): { validateStatus: ValidateStatus; errorMsg: string | null } => {
    if (isMobile(value?.trim())) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
    return {
      validateStatus: 'error',
      errorMsg: '请输入正确的手机号',
    };
  };

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone({
      ...validatePhone(e.target.value),
      value: e.target.value,
    });
  };

  const codeButtonDisable = useMemo(
    () => !isMobile(form.getFieldValue('phoneNumber')?.trim()) || timing,
    [phone.value, timing],
  );

  const getCode = async () => {
    setTiming(true);
    const res = await getVericode({
      phoneNumber: form.getFieldValue('phoneNumber'),
    });
    setTimeout(() => {
      setCode(res.veriCode);
      setIsModalVisible(true);
    }, 1000);
    message.success('验证码已发送，请注意查收', 5);
  };

  const onFinish = async (values: LoginByPhoneNumberProps) => {
    await userLogin(values);
    message.success('登录成功 2秒后跳转首页');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  useEffect(() => {
    const countdown = () => {
      setSecond((preSecond) => {
        if (preSecond <= 1) {
          setTiming(false);
          clearInterval(timer.current!);
          return COUNTDOWN_SECONDS;
        }
        return preSecond - 1;
      });
    };
    if (timing) {
      timer.current = window.setInterval(countdown, 1000);
    }
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [timing]);

  const copy = () => {
    message.success('验证码复制成功');
    setIsModalVisible(false);
  };

  return (
    <div className="login-page">
      <Modal title="验证码" visible={isModalVisible} closable={false} footer={null}>
        <div className="modal-wrapper">
          <Input readOnly value={code} disabled />
          <CopyToClipboard onCopy={copy} text={code}>
            <Button type="primary">复制</Button>
          </CopyToClipboard>
        </div>
      </Modal>
      <Row>
        <Col span={12}>
          <div className="aside">
            <div className="aside-inner">
              <Link to="/setting">
                <img src={Logo2} className="logo-img" alt="" />
              </Link>
              <h2>这是我用过的最好的建站工具</h2>
              <span className="text-white-70">王铁锤, Google</span>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="login-area">
            <h2>欢迎回来</h2>
            <p className="subTitle">使用手机号码和验证码登录到慕课乐高</p>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="phoneNumber"
                validateStatus={phone.validateStatus}
                help={phone.errorMsg}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="手机号码"
                  value={phone.value}
                  onChange={onPhoneChange}
                />
              </Form.Item>
              <Form.Item
                name="veriCode"
                rules={[
                  { required: true, message: '验证码不能为空' },
                  { max: 4, message: '验证码不能超过4位数' },
                ]}
              >
                <Input prefix={<LockOutlined />} placeholder="四位验证码" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loginLoading}>
                  登录
                </Button>
                <Button
                  htmlType="button"
                  onClick={getCode}
                  disabled={codeButtonDisable}
                  loading={codeLoading}
                >
                  {second === 60 ? '获取验证码' : `${second}秒后重发`}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
