import React, { FunctionComponent, useState } from 'react';
import { Button, Form, Input, message, FormInstance } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { checkPassword, checkUserName } from '@/utils';
import api from '@/api';
import { FormLoginValues } from '@/types';
import ConfigForm from '@/components/common/config-form';
import './index.less';

const Register: FunctionComponent = () => {
  /** DisplayName */
  Register.displayName = 'Register';

  /** Data */
  const [registerLoading, setRegisterLoading] = useState(false); // 注册按钮 loading
  const [form] = Form.useForm(); // 表单 Ref
  const navigate = useNavigate(); // 路由跳转

  /** Method */
  // 表单完成
  const onFinish = () => {
    try {
      setRegisterLoading(true);
      form
        .validateFields()
        .then(async (values: FormLoginValues) => {
          const {
            data: { result },
          } = await api.Register({ userName: values.userName, password: values.password });
          if (!result) return Promise.reject(result);
          setRegisterLoading(false);
          navigate('/');
        })
        .catch((error) => {
          setRegisterLoading(false);
          message.error(error);
        });
    } catch (e) {
      console.error(e);
    }
  };
  // 用户名变化时进行校验
  const validUserName = async (_: unknown, value: string) => {
    if (value) {
      if (!checkUserName(value)) return Promise.reject(new Error('请输入中文、英文、数字'));
      const {
        data: { msg, result },
      } = await api.CheckUserName({ userName: value });
      // TODO 后端修复校验正确时 result 的值
      if (!result) return Promise.resolve();
      return Promise.reject(new Error(msg));
    }
    return Promise.resolve();
  };
  // 密码变化时进行校验
  const validPassword = (_: unknown, value: string) => {
    if (value) {
      if (value.length < 4) return Promise.reject(new Error('最短需要 4 位'));
      if (!checkPassword(value)) return Promise.reject(new Error('请输入英文、数字、常用符号~!@#$%^&*()_+={}|<>,.?;:'));
      return Promise.resolve();
    }
    return Promise.resolve();
  };
  // 再次确认密码
  const validPassword2 = ({ getFieldValue }: FormInstance) => ({
    validator(_: unknown, value: string) {
      if (!value || getFieldValue('password') === value) return Promise.resolve();
      return Promise.reject(new Error('输入的两次密码不一致'));
    },
  });

  return (
    <div className="register">
      <div className="register-box">
        <ConfigForm
          formConfig={{
            form,
            name: 'register-form',
            className: 'register-form',
            onFinish,
            onFinishFailed: () => message.error('请正确填写用户名和密码！'),
          }}
          formItemConfigs={[
            {
              name: 'userName',
              rules: [{ required: true, message: '请输入用户名' }, { validator: validUserName }],
              children: <Input prefix={<UserOutlined />} maxLength={32} placeholder="用户名" />,
            },
            {
              name: 'password',
              rules: [{ required: true, message: '请输入密码' }, { validator: validPassword }],
              children: <Input.Password prefix={<LockOutlined />} maxLength={32} type="password" placeholder="密码" />,
            },
            {
              name: 'password2',
              dependencies: ['password'],
              hasFeedback: true,
              rules: [{ required: true, message: '请再次输入密码' }, validPassword2],
              children: (
                <Input.Password prefix={<LockOutlined />} maxLength={32} type="password" placeholder="重复密码" />
              ),
            },
            {
              children: (
                <>
                  <Button className="register-form__button" type="primary" htmlType="submit" loading={registerLoading}>
                    注 册
                  </Button>
                  <p className="register-form__text">已有账号？返回首页登录吧～</p>
                  <Button
                    className="register-form__button"
                    onClick={() => {
                      navigate('/');
                    }}
                  >
                    首 页
                  </Button>
                </>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Register;
