import { Canceler } from 'axios';
import List from './modules/list.api';
import User from './modules/user.api';

export type AxiosCanceler = Canceler;

export default {
  ...List,
  ...User,
};
