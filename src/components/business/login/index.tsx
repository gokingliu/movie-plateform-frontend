import React, { useEffect, useState, FC } from 'react';
import { Modal } from 'antd';
import { useStoreDispatch, useStoreSelector, StoreState } from 'src/store';
import { actionModal } from '../../../store/modules/modal.store';

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

  /** ReactDOM */
  return (
    <Modal
      title="Title"
      getContainer={false}
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <p>{modalText}</p>
    </Modal>
  );
};

export default Login;
