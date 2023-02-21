import React, { useEffect, useState, FC } from 'react';
import { Button, Checkbox, Form, Input, message, Modal } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector, StoreState } from '@/store';
import { actionModal } from '@/store/modules/modal.store';
import { actionLogin } from '@/store/modules/user.store';
import { FormLoginValues } from '@/types';
import ConfigForm from '@/components/common/config-form';
import './index.less';

const Login: FC = () => {
  /** DisplayName */
  Login.displayName = 'Login';

  /** Data */
  const { modal } = useStoreSelector((state: StoreState) => state.modal); // 从 store 中获取 userName token
  const dispatch = useStoreDispatch(); // 调用 store 方法
  const [visible, setVisible] = useState(false); // modal 打开/关闭
  const [loginLoading, setLoginLoading] = useState(false); // 登录按钮 loading
  const [form] = Form.useForm(); // 表单 Ref
  const navigate = useNavigate(); // 路由跳转

  /** Effect */
  useEffect(() => {
    setVisible(modal);
    return () => setVisible(false);
  }, [modal]);

  /** Method */
  // 表单完成
  const onFinish = () => {
    try {
      setLoginLoading(true);
      form
        .validateFields()
        .then(async (values: FormLoginValues) => {
          const res = await dispatch(actionLogin(values));
          if (res) return Promise.reject(res);
          setLoginLoading(false);
          dispatch(actionModal({ modal: false }));
        })
        .catch((error) => {
          setLoginLoading(false);
          message.error(error);
        });
    } catch (e) {
      console.error(e);
    }
  };

  /** ReactDOM */
  return (
    <Modal
      title="登录"
      getContainer={false}
      maskClosable={false}
      footer={null}
      open={visible}
      onCancel={() => dispatch(actionModal({ modal: false }))}
    >
      <ConfigForm
        formConfig={{
          form,
          name: 'login-form',
          className: 'login-form',
          initialValues: { remember: true },
          onFinish,
          onFinishFailed: () => message.error('请正确填写用户名和密码！'),
        }}
        formItemConfigs={[
          {
            name: 'userName',
            rules: [{ required: true, message: '请输入用户名' }],
            children: <Input prefix={<UserOutlined />} placeholder="用户名" />,
          },
          {
            name: 'password',
            rules: [{ required: true, message: '请输入密码' }],
            children: <Input.Password prefix={<LockOutlined />} type="password" placeholder="密码" />,
          },
          {
            name: 'remember',
            valuePropName: 'checked',
            children: <Checkbox>自动登录</Checkbox>,
          },
          {
            children: (
              <>
                <Button className="login-form__button" type="primary" htmlType="submit" loading={loginLoading}>
                  登 录
                </Button>
                <p className="login-form__text">没有账号？试试注册吧～</p>
                <Button
                  className="login-form__button"
                  onClick={() => {
                    navigate('/register');
                  }}
                >
                  注 册
                </Button>
              </>
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default Login;
