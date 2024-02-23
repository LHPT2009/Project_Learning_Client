import Cookies from 'js-cookie';
import axiosClient from './axiosClient';

const jwtApi = {
  checkAccessToken: async () => {
    const url = `/user/validateToken`;
    return await axiosClient.get(url);
  },
  refreshToken: async () => {
    const refresh = Cookies.get('refreshToken');
    const url = `/user/auth/refreshToken`;
    return await axiosClient.post(url, { refreshToken: refresh });
  },
};

export default jwtApi;
