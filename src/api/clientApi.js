import axiosClient from './axiosClient';

const clientApi = {
  login(data) {
    const url = '/api/user/login';
    return axiosClient.post(url, data);
  },
  register: async (dataRegister) => {
    const url = '/api/user/register';
    try {
      const response = await axiosClient.post(url, dataRegister);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getUserById: async (id) => {
    const url = `/api/user/${id}`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      console.error('Error fetching user with role:', error.message);
      return [];
    }
  },
  forgot: async (dataForgot) => {
    const url = '/api/user/forgotPassword';
    try {
      const response = await axiosClient.post(url, dataForgot);
      return response;
    } catch (error) {
      console.error('Error fetching user with role:', error.message);
      return [];
    }
  },
  updateNewPass: async (dataNewPassword) => {
    const url = '/api/user/newPassword';
    try {
      const response = await axiosClient.put(url, dataNewPassword);
      return response;
    } catch (error) {
      console.error('Error fetching user with role:', error.message);
      return [];
    }
  },
  changePassword: async (dataChangePassword) => {
    const url = '/api/user/updatePass';
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
