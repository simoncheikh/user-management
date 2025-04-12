import { generateToken, generateResponse } from '../mock/mock.util';


export const loginApi = (email: string, password: string) => {
  if (email === 'academy@gmail.com' && password === 'academy123') {
    const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365;
    const accessToken = generateToken({ email, password, expiresIn });
    return generateResponse({ expiresIn, accessToken });
  }

  return generateResponse({}, 401, 'Invalid Credentials!');
};
