import React, { useEffect, useState, FC } from 'react';
import { Button, Checkbox, Form, Input, message, Modal } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useStoreDispatch, useStoreSelector, StoreState } from 'src/store';
import { actionModal } from 'src/store/modules/modal.store';
import { FormLoginValues } from 'src/types';
import api from 'src/api';
import ConfigForm from 'src/components/common/config-form';
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
  const [visible, setVisible] = useState(false);
  // 登录按钮 loading
  const [loginLoading, setLoginLoading] = useState(false);
  // 表单 Ref
  const [form] = Form.useForm();

  /** Effect */
  useEffect(() => {
    setVisible(modal);
    return () => {
      setVisible(false);
    };
  }, [modal]);

  /** Method */
  // 关闭 modal
  const handleCancel = () => {
    dispatch(actionModal({ modal: false }));
  };
  // 表单完成
  const onFinish = () => {
    setLoginLoading(true);
    try {
      form
        .validateFields()
        .then(async (values: FormLoginValues) => {
          const {
            data: { code, result },
          } = await api.Login({ username: values.username, password: values.password });
          console.log(code, result);
          setLoginLoading(false);
          dispatch(actionModal({ modal: false }));
        })
        .catch(() => {
          setLoginLoading(false);
          message.error('登录失败，请重试！');
        });
    } catch (e) {
      console.error(e);
    }
  };
  // 表单失败
  const onFinishFailed = () => {
    message.error('请正确填写用户名和密码！');
  };

  /** ReactDOM */
  return (
    <Modal title="登录" getContainer={false} maskClosable={false} open={visible} onCancel={handleCancel} footer={null}>
      <ConfigForm
        formConfig={{
          form,
          name: 'login-form',
          className: 'login-form',
          initialValues: { remember: true },
          onFinish,
          onFinishFailed,
        }}
        formItemConfigs={[
          {
            name: 'username',
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
                <Button className="login-form-button" type="primary" htmlType="submit" loading={loginLoading}>
                  登 录
                </Button>
                或 <a href="">注册</a>
              </>
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default Login;
