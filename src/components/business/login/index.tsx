import React, { useEffect, useState, FC } from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useStoreDispatch, useStoreSelector, StoreState } from 'src/store';
import { actionModal } from 'src/store/modules/modal.store';
import './index.less';

const Login: FC = () => {
  /** DisplayName */
  Login.displayName = 'Login';

  /** Data */
  // 从 store 中获取 username token
  const { modal } = useStoreSelector((state: StoreState) => state.modal);
  // 调用 store 方法
  const dispatch = useStoreDispatch();
  // modal 打开/关闭
  const [open, setOpen] = useState(false);
  // model 内容
  const [modalText, setModalText] = useState('Content of the modal');
  // modal loading
  const [confirmLoading, setConfirmLoading] = useState(false);

  /** Effect */
  useEffect(() => {
    setOpen(modal);

    return () => {
      setOpen(false);
    };
  }, [modal]);

  /** Method */
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(actionModal({ modal: false }));
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    dispatch(actionModal({ modal: false }));
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  /** ReactDOM */
  return (
    <Modal
      title="登录"
      getContainer={false}
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        name="login-form"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住账号密码</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登 录
          </Button>
          或 <a href="">注册</a>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Login;
