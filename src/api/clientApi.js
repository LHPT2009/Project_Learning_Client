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
      const response = await axiosClient.get(url, id);
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
};

export default clientApi;
