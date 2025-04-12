import { MockMethod } from 'vite-plugin-mock';
import { loginApi } from '../api/loginApi';

const mock: MockMethod[] = [
  {
    url: '/api/login',
    method: 'post',
    timeout: 2000,
    response: ({ body: { body } }: { body: { body: { email: string; password: string } } }) => {
      const { email, password } = body;
      return loginApi(email, password);
    },
  },
];

export default mock;
