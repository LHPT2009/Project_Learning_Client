import axiosClient from './axiosClient';

const clientApi = {
  login(data) {
    const url = '/api/user/auth/login';
    return axiosClient.post(url, data);
  },
  register: async (dataRegister) => {
    const url = '/api/user/auth/register';
    try {
      const response = await axiosClient.post(url, dataRegister);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getUserById: async (id) => {
    const url = `/api/user/auth/getInfo`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      console.error('Error fetching user with role:', error.message);
      return [];
    }
  },
  forgot: async (dataForgot) => {
    const url = '/api/user/auth/forgotPassword';
    try {
      const response = await axiosClient.post(url, dataForgot);
      return response;
    } catch (error) {
      // console.error('Error fetching user with role:', error.message);
      return error.response;
    }
  },
  updateNewPass: async (dataNewPassword) => {
    const url = '/api/user/auth/newPassword';
    try {
      const response = await axiosClient.put(url, dataNewPassword);
      return response;
    } catch (error) {
      console.error('Error fetching user with role:', error.message);
      return [];
    }
  },
  changePassword: async (dataChangePassword) => {
    const url = '/api/user/auth/updatePass';
    try {
      const response = await axiosClient.put(url, dataChangePassword);
      return response;
    } catch (error) {
      // console.error('Error fetching user with role:', error.message);
      return error.response;
    }
  },
};

export default clientApi;
