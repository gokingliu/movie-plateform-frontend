import React, { FC } from 'react';
import { Form } from 'antd';
import { ConfigFormProps } from 'src/types';

const ConfigForm: FC<ConfigFormProps> = (props) => {
  /** DisplayName */
  ConfigForm.displayName = 'ConfigForm';

  /** ReactDOM */
  return (
    <Form name="config-form" {...props.formConfig}>
      {props.formItemConfigs.map((config, index) => (
        <Form.Item key={index} {...config}>
          {config.children}
        </Form.Item>
      ))}
    </Form>
  );
};

export default ConfigForm;
