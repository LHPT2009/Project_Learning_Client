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
      console.error('Error fetching user with role:', error.message);
      return [];
    }
  },
};

export default clientApi;
