import React from 'react';
import {
  Row, Input, Form, Col, Button,
} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { isMobile } from '@/helper';
import Logo2 from '@/assets/logo2.png';
import './style.less';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };
  const checkPhone = () => {
    const phone = form.getFieldValue('userName');
    if (phone && !isMobile(phone)) {
      return Promise.reject('手机号码格式错误');
    }
    return Promise.resolve();
  };
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
            <div className="form-wrapper">
              <Form form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                  name="userName"
                  rules={[
                    { required: true, message: '手机号码不能为空' },
                    { validator: checkPhone, message: '手机号码格式有误' },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="手机号码" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: '验证码不能为空' },
                    { max: 4, message: '验证码不能超过4位数' },
                  ]}
                >
                  <Input prefix={<LockOutlined />} placeholder="四位验证码" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    登录
                  </Button>
                  <Button htmlType="button" onClick={onReset}>
                    获取验证码
                  </Button>
                </Form.Item>
              </Form>
            </div>

          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
