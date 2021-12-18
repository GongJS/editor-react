import React, { useState, useEffect, useRef } from 'react';
import {
  Row, Input, Form, Col, Button, message,
} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { isMobile } from '@/helper';
import { useHttp, http } from '@/hooks/useHttp';
import useUser from '@/hooks/useUser';
import { useUserLogin, getUserInfo } from '@/utils/user';
import Logo2 from '@/assets/logo2.png';
import './style.less';

export interface LoginByPhoneNumberProps {
  phoneNumber: string
  veriCode: string,
}
const useGetCode = () => {
  const client = useHttp();
  return useMutation((params: {phoneNumber: string}) => client('users/genVeriCode', {
    data: params,
    method: 'POST',
  }));
};
const COUNTDOWN_SECONDS = 60;
const Login: React.FC = () => {
  const [form] = Form.useForm();
  const timer = useRef<number | null>(null);
  const [timing, setTiming] = useState(false);
  const [second, setSecond] = useState(COUNTDOWN_SECONDS);
  const navigate = useNavigate();
  const { setUserData } = useUser();
  const { mutateAsync: userLogin, isLoading: loginLoading } = useUserLogin();
  const { mutateAsync: getVericode, isLoading: codeLoading } = useGetCode();

  const getCode = async () => {
    setTiming(true);
    await getVericode({
      phoneNumber: form.getFieldValue('phoneNumber'),
    });
    message.success('验证码已发送，请注意查收', 5);
  };

  const onFinish = async (values: LoginByPhoneNumberProps) => {
    const res = await userLogin(values);
    if (res.errno === 0) {
      const userInfo = await getUserInfo(res.data.token);
      setUserData({
        token: res.data.token,
        isLogin: true,
        data: {
          ...userInfo,
        },
      });
      message.success('登录成功 2秒后跳转首页');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      message.error(res.message);
    }
  };

  const checkPhone = () => {
    const phone = form.getFieldValue('phoneNumber');
    if (phone && !isMobile(phone)) {
      return Promise.reject('手机号码格式错误');
    }
    return Promise.resolve();
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
    return () => timer.current && clearInterval(timer.current);
  }, [timing]);
  return (
    <div className="login-page">
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
                rules={[
                  { required: true, message: '手机号码不能为空' },
                  { validator: checkPhone, message: '手机号码格式有误' },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="手机号码" />
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
                <Button htmlType="button" onClick={getCode} disabled={timing} loading={codeLoading}>
                  { second === 60 ? '获取验证码' : `${second}秒后重发` }
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
