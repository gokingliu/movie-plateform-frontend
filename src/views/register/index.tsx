import React, { FunctionComponent, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useStoreDispatch } from 'src/store';
import { actionLogin } from 'src/store/modules/user.store';
import { actionModal } from 'src/store/modules/modal.store';
import { checkPassword, checkUserName } from 'src/utils';
import api from 'src/api';
import { FormLoginValues } from 'src/types';
import ConfigForm from 'src/components/common/config-form';
import './index.less';

const Register: FunctionComponent = () => {
  /** DisplayName */
  Register.displayName = 'Register';

  /** Data */
  const dispatch = useStoreDispatch(); // 调用 store 方法
  const [registerLoading, setRegisterLoading] = useState(false); // 注册按钮 loading
  const [form] = Form.useForm(); // 表单 Ref
  const navigate = useNavigate(); // 路由跳转

  /** Method */
  // 表单完成
  const onFinish = () => {
    setRegisterLoading(true);
    try {
      form
        .validateFields()
        .then(async (values: FormLoginValues) => {
          const res = await dispatch(actionLogin(values));
          if (res) return Promise.reject(res);
          setRegisterLoading(false);
          dispatch(actionModal({ modal: false }));
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
      if (result) return Promise.resolve();
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
