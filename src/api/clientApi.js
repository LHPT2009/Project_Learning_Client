import axiosClient from './axiosClient';

const clientApi = {
  login: async (data) => {
    const url = '/user/auth/login';
    return await axiosClient.post(url, data);
  },
  logout: async () => {
    const url = '/user/logOut';
    return await axiosClient.delete(url);
  },
  register: async (dataRegister) => {
    const url = '/user/auth/register';
    return await axiosClient.post(url, dataRegister);
  },
  getUserById: async () => {
    const url = `/user/getInfo`;
    return await axiosClient.get(url);
  },
  forgot: async (dataForgot) => {
    const url = '/user/auth/forgotPassword';
    return await axiosClient.post(url, dataForgot);
  },
  updateNewPass: async (dataNewPassword) => {
    const url = '/user/auth/newPassword';
    return await axiosClient.put(url, dataNewPassword);
  },
  changePassword: async (dataChangePassword) => {
    const url = '/user/auth/updatePass';
    return await axiosClient.put(url, dataChangePassword);
  },
};

export default clientApi;
