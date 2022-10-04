import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import 'antd/dist/antd.less';
import 'src/assets/css/common.less';

createRoot(document.getElementById('root') as Element).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
