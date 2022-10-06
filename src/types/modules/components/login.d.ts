import { RequestLogin } from '../api';

export interface FormLoginValues extends RequestLogin {
  remember: boolean;
}
